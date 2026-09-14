import { GoogleMark } from "@/components/google-mark";

export function HomeGoogleProof() {
  return (
    <div className="mt-10 flex max-w-xl flex-col gap-4 sm:mt-12 sm:flex-row sm:items-start sm:gap-8">
      <div className="grid shrink-0 grid-cols-[auto_auto] items-stretch gap-x-2">
        <span className="col-start-1 row-span-2 -my-px aspect-square">
          <GoogleMark className="block size-full" />
        </span>
        <p className="col-start-2 whitespace-nowrap text-[13px] font-semibold leading-[1.2] tracking-tight text-[#e8e8e6]">
          4.9/5 Google reviews
        </p>
        <p className="col-start-2 text-justify text-[11px] leading-[1.35] text-[#9b9b97] [text-align-last:justify]">
          Gebaseerd op 2K+ reviews
        </p>
      </div>
      <p className="text-[12px] leading-[1.45] text-[#9b9b97]">
        <span className="block whitespace-nowrap">
          Meer dan 2.000 tevreden klanten achter ons, leveren we
        </span>
        <span className="block whitespace-nowrap">
          met trots professionele oplossingen van topkwaliteit.
        </span>
      </p>
    </div>
  );
}
