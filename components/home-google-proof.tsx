import { GoogleMark } from "@/components/google-mark";

export function HomeGoogleProof() {
  return (
    <div className="mt-10 w-fit sm:mt-12">
      <div className="flex flex-col items-stretch gap-4 border-t border-white/15 pt-4 sm:flex-row sm:gap-6">
        <div className="flex shrink-0 items-center gap-2">
          <GoogleMark className="size-7" />
          <div className="grid w-max grid-cols-1">
            <p className="whitespace-nowrap text-[13px] font-semibold leading-[1.2] tracking-tight text-[#e8e8e6]">
              4.9/5 Google reviews
            </p>
            <p className="w-full whitespace-nowrap text-justify text-[11px] leading-[1.35] text-[#9b9b97] [text-align-last:justify]">
              Gebaseerd op 2K+ reviews
            </p>
          </div>
        </div>
        <span
          aria-hidden
          className="hidden w-px shrink-0 self-stretch bg-white/15 sm:block"
        />
        <p className="text-[12px] leading-[1.45] text-[#9b9b97]">
          <span className="block whitespace-nowrap">
            Meer dan 2.000 tevreden klanten achter ons, leveren we
          </span>
          <span className="block whitespace-nowrap">
            met trots professionele oplossingen van topkwaliteit.
          </span>
        </p>
      </div>
    </div>
  );
}
