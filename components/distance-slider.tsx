"use client";

import { useState } from "react";

export function DistanceSlider() {
  const [km, setKm] = useState(25);

  return (
    <div className="mb-6 font-[Arial,Helvetica,sans-serif]">
      <h2 className="mb-1 text-[16px] font-semibold text-[#1f2f46]">
        Afstand vanaf postcode
      </h2>
      <p className="mb-3 text-[13px] text-[#163a6b]">{km} km</p>
      <input
        type="range"
        min={1}
        max={100}
        value={km}
        onChange={(event) => setKm(Number(event.target.value))}
        aria-label="Afstand vanaf postcode"
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#d8dde4] accent-[#1d5fd1] [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#1d5fd1]"
      />
      <div className="mt-1 flex justify-between text-[11px] text-[#8a93a0]">
        <span>1 km</span>
        <span>100 km</span>
      </div>
    </div>
  );
}
