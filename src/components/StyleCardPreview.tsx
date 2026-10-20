import type { ReactNode } from "react";
import {
  CalendarBlankIcon,
  FileTextIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  UserIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { colorScales } from "@/data/colors";

// Miniaturas estáticas para las tarjetas de /estilos, como las de componentes.
// Son decorativas: la tarjeta completa ya es un enlace con su título.

const primary = colorScales[0].steps;

const previews: Record<string, () => ReactNode> = {
  colores: () => (
    <div className="flex w-full max-w-[240px] flex-col gap-2">
      <div className="flex gap-2">
        <span className="h-10 flex-1 rounded-[8px] bg-[#2a32a2]" />
        <span className="h-10 flex-1 rounded-[8px] bg-[#30cf5d]" />
        <span className="h-10 flex-1 rounded-[8px] bg-[#202025]" />
      </div>
      <div className="flex overflow-hidden rounded-[6px]">
        {primary.map((step) => (
          <span key={step.step} className="h-5 flex-1" style={{ backgroundColor: step.hex }} />
        ))}
      </div>
    </div>
  ),
  tipografia: () => (
    <div className="flex items-end gap-4">
      <span className="text-5xl font-bold leading-none text-[#23297b]" style={{ fontFamily: "var(--font-sora)" }}>
        Aa
      </span>
      <span className="flex flex-col gap-1 pb-1 text-left">
        <span className="text-xs font-semibold text-[#202025]" style={{ fontFamily: "var(--font-sora)" }}>
          Sora · Títulos
        </span>
        <span className="text-xs text-[#5c5d70]" style={{ fontFamily: "var(--font-roboto)" }}>
          Roboto · Cuerpo
        </span>
      </span>
    </div>
  ),
  iconografia: () => (
    <div className="grid grid-cols-3 gap-3 text-[#2a32a2] [&>svg]:size-7">
      <HouseIcon />
      <FileTextIcon />
      <CalendarBlankIcon />
      <UserIcon />
      <MagnifyingGlassIcon />
      <WarningCircleIcon />
    </div>
  ),
  espaciado: () => (
    <div className="flex h-24 w-full max-w-[220px] gap-1.5 rounded-[6px] bg-[#e4e5f4] p-1.5">
      <span className="w-6 rounded-[4px] bg-[#23297b]" />
      <span className="flex flex-1 flex-col gap-1.5 rounded-[4px] border-2 border-dashed border-[#007d00] bg-white p-1.5">
        <span className="h-4 rounded-[3px] bg-[#c9ccee]" />
        <span className="flex-1 rounded-[3px] bg-[#f3f4f9]" />
      </span>
    </div>
  ),
  bordes: () => (
    <div className="flex items-center gap-3">
      {[4, 8, 16, 9999].map((radius) => (
        <span key={radius} className="size-12 border-2 border-[#2a32a2] bg-white" style={{ borderRadius: radius }} />
      ))}
    </div>
  ),
  sombras: () => (
    <div className="flex items-center gap-5">
      {["4px 4px 4px rgba(0,0,0,0.04)", "0 4px 10px rgba(0,0,0,0.08)", "0 8px 32px rgba(0,0,0,0.2)"].map((shadow) => (
        <span key={shadow} className="size-14 rounded-[8px] bg-white" style={{ boxShadow: shadow }} />
      ))}
    </div>
  ),
  grid: () => (
    <div className="grid h-20 w-full max-w-[220px] grid-cols-12 gap-1">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className="rounded-[2px] bg-[#ffd6d6]" />
      ))}
    </div>
  ),
  elevacion: () => (
    <div className="relative h-24 w-36">
      <span className="absolute left-0 top-6 h-16 w-24 rounded-[8px] bg-[#e4e5f4]" />
      <span className="absolute left-5 top-3 h-16 w-24 rounded-[8px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.08)]" />
      <span className="absolute left-10 top-0 h-16 w-24 rounded-[8px] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.2)]" />
    </div>
  ),
  "tokens-de-diseno": () => (
    <div className="flex flex-col gap-1.5 font-mono text-[11px] text-[#202025]">
      {[
        ["#2a32a2", "text/brand"],
        ["#d8d9de", "border/default"],
        ["#f6f6f7", "surface/page"],
      ].map(([hex, name]) => (
        <span key={name} className="flex items-center gap-2 rounded-[6px] bg-white px-2 py-1">
          <span className="size-3.5 rounded-[3px] border border-[#d8d9de]" style={{ backgroundColor: hex }} />
          {name}
        </span>
      ))}
    </div>
  ),
};

export function styleCardPreview(slug: string): ReactNode {
  return previews[slug]?.();
}
