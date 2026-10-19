const PADDING_TINT = "rgba(0,125,0,0.22)";
const GAP_TINT = "rgba(197,70,0,0.3)";

function Chip({ value, className = "", color = "#007d00" }: { value: string; className?: string; color?: string }) {
  return (
    <span
      className={`absolute whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] font-bold leading-none text-white ${className}`}
      style={{ backgroundColor: color }}
    >
      {value}
    </span>
  );
}

// Esquema a escala (1:4) de la pantalla de Figma: sidebar + área de contenido
// con dos tarjetas. Verde = padding, naranja = separación entre bloques.
export function SpacingLayoutDiagram({ sidebar, content }: { sidebar: number; content: number }) {
  const s = 0.25;
  return (
    <div
      role="img"
      aria-label={`Pantalla de 1440 por 1024 con sidebar de ${sidebar}px: padding de 32px, separación de 32px entre tarjetas y padding interno de 32px.`}
      className="flex overflow-hidden rounded-lg border border-zinc-200 bg-[#f6f7fb]"
      style={{ width: 1440 * s, height: 1024 * s }}
    >
      <div className="shrink-0 bg-gradient-to-b from-[#1a1f6b] to-[#2830a6]" style={{ width: sidebar * s }} />
      <div className="relative flex flex-col" style={{ width: content * s, padding: 32 * s, background: PADDING_TINT }}>
        <Chip value="32" className="right-0.5 top-[70%] z-10 -translate-y-1/2" />
        <div className="relative rounded bg-white" style={{ height: 216 * s, boxShadow: `inset 0 0 0 ${32 * s}px ${PADDING_TINT}` }}>
          <Chip value="32" className="left-1/2 top-0.5 -translate-x-1/2" />
        </div>
        <div className="relative" style={{ height: 32 * s, background: GAP_TINT }}>
          <Chip value="32" color="#c54600" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative flex-1 rounded bg-white" style={{ boxShadow: `inset 0 0 0 ${32 * s}px ${PADDING_TINT}` }}>
          <Chip value="32" className="left-1/2 top-0.5 -translate-x-1/2" />
        </div>
      </div>
    </div>
  );
}
