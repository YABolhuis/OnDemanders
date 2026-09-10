import { NextRequest, NextResponse } from "next/server";

type PhotonFeature = {
  properties?: {
    name?: string;
    city?: string;
    county?: string;
    state?: string;
    country?: string;
  };
};

function plaatsLabel(properties: PhotonFeature["properties"]) {
  if (!properties) {
    return "";
  }
  const delen = [
    properties.name,
    properties.city && properties.city !== properties.name
      ? properties.city
      : properties.county,
    properties.country,
  ].filter((deel, index, lijst) => deel && lijst.indexOf(deel) === index);
  return delen.join(", ");
}

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() ?? "";
  if (q.length < 2) {
    return NextResponse.json({ plaatsen: [] as string[] });
  }

  try {
    const url = new URL("https://photon.komoot.io/api/");
    url.searchParams.set("q", q);
    url.searchParams.set("limit", "8");
    url.searchParams.set("lang", "nl");

    const photon = await fetch(url, {
      headers: { "User-Agent": "Optisend/1.0 (locatiezoek)" },
      cache: "no-store",
    });

    if (photon.ok) {
      const data = (await photon.json()) as { features?: PhotonFeature[] };
      const plaatsen = Array.from(
        new Set(
          (data.features ?? [])
            .map((feature) => plaatsLabel(feature.properties))
            .filter(Boolean)
        )
      );
      return NextResponse.json({ plaatsen });
    }

    const nominatimUrl = new URL("https://nominatim.openstreetmap.org/search");
    nominatimUrl.searchParams.set("q", q);
    nominatimUrl.searchParams.set("format", "jsonv2");
    nominatimUrl.searchParams.set("addressdetails", "1");
    nominatimUrl.searchParams.set("limit", "8");

    const nominatim = await fetch(nominatimUrl, {
      headers: { "User-Agent": "Optisend/1.0 (locatiezoek)" },
      cache: "no-store",
    });
    if (!nominatim.ok) {
      return NextResponse.json({ plaatsen: [] as string[] });
    }
    const rijen = (await nominatim.json()) as {
      display_name?: string;
      name?: string;
    }[];
    const plaatsen = Array.from(
      new Set(
        rijen
          .map((rij) => rij.display_name || rij.name || "")
          .filter(Boolean)
      )
    );
    return NextResponse.json({ plaatsen });
  } catch {
    return NextResponse.json({ plaatsen: [] as string[] });
  }
}
