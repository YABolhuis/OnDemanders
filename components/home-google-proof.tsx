import { GoogleMark } from "@/components/google-mark";

export function HomeGoogleProof() {
  return (
    <div className="mt-10 flex max-w-xl flex-col gap-4 sm:mt-12 sm:flex-row sm:items-start sm:gap-8">
      <div className="flex shrink-0 items-start gap-2.5">
        <GoogleMark className="mt-0.5 size-8" />
        <div>
          <p className="text-[14px] font-semibold tracking-tight text-[#e8e8e6]">
            4.9/5 Google reviews
          </p>
          <p className="mt-0.5 text-[12px] leading-4 text-[#9b9b97]">
            Gebaseerd op 2K+ reviews
          </p>
        </div>
      </div>
      <p className="max-w-[280px] text-[13px] leading-5 text-[#9b9b97]">
        Meer dan 2.000 tevreden klanten achter ons, leveren we met trots
        professionele oplossingen van topkwaliteit.
      </p>
    </div>
  );
}
