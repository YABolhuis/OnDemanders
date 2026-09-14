import { GoogleMark } from "@/components/google-mark";

export function HomeGoogleProof() {
  return (
    <div className="mt-10 flex max-w-xl flex-col gap-4 sm:mt-12 sm:flex-row sm:items-start sm:gap-8">
      <div className="flex shrink-0 items-start gap-2">
        <GoogleMark className="mt-0.5 size-6" />
        <div className="w-fit">
          <p className="whitespace-nowrap text-[13px] font-semibold tracking-tight text-[#e8e8e6]">
            4.9/5 Google reviews
          </p>
          <p className="text-justify text-[11px] leading-4 text-[#9b9b97] [text-align-last:justify]">
            Gebaseerd op 2K+ reviews
          </p>
        </div>
      </div>
      <p className="text-[12px] leading-[1.45] text-[#9b9b97]">
        Meer dan 2.000 tevreden klanten achter ons, leveren we
        <br />
        met trots professionele oplossingen van topkwaliteit.
      </p>
    </div>
  );
}
