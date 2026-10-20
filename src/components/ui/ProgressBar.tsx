export type ProgressBarProps = {
  /** Porcentaje de 0 a 100. */
  value: number;
  /** S = 8px de alto, XS = 4px (Size en Figma). */
  size?: "S" | "XS";
  /** Nombre accesible, p. ej. "Avance del trámite". Sin él la barra es decorativa. */
  label?: string;
  className?: string;
};

// Progress bar del D.S. Tramita (03_Indicators and graph): pista #e4e5f4 y
// relleno #2a32a2, extremos redondeados.
export function ProgressBar({ value, size = "S", label, className = "" }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <span
      role={label ? "progressbar" : undefined}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      aria-valuemin={label ? 0 : undefined}
      aria-valuemax={label ? 100 : undefined}
      aria-valuenow={label ? Math.round(pct) : undefined}
      className={`block w-full overflow-hidden rounded-full bg-[#e4e5f4] ${size === "S" ? "h-2" : "h-1"} ${className}`}
    >
      <span className="block h-full rounded-full bg-[#2a32a2]" style={{ width: `${pct}%` }} />
    </span>
  );
}
