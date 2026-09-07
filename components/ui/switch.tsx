"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default" | "lg" | "xs"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent p-px transition-all outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-[size=default]:h-5 data-[size=default]:w-9 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[size=xs]:h-3.5 data-[size=xs]:w-6 data-[size=lg]:h-6 data-[size=lg]:w-11 data-checked:bg-primary data-unchecked:bg-input",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none flex items-center justify-center rounded-full bg-white ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 group-data-[size=xs]/switch:size-2 group-data-[size=lg]/switch:size-5 group-data-[size=default]/switch:data-checked:translate-x-[16px] group-data-[size=sm]/switch:data-checked:translate-x-[10px] group-data-[size=xs]/switch:data-checked:translate-x-[14px] group-data-[size=lg]/switch:data-checked:translate-x-[20px] group-data-[size=default]/switch:data-unchecked:translate-x-0 group-data-[size=sm]/switch:data-unchecked:translate-x-0 group-data-[size=xs]/switch:data-unchecked:translate-x-0 group-data-[size=lg]/switch:data-unchecked:translate-x-0"
      >
        <Check
          className="hidden size-2.5 text-[#2bbbad] group-data-checked/switch:block"
          strokeWidth={2.5}
        />
        <X
          className="hidden size-2.5 text-[#6b7c86] group-data-unchecked/switch:block"
          strokeWidth={2.5}
        />
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
