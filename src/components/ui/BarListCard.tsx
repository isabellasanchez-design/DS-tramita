import type { ReactNode } from "react";
import { ProgressBar } from "@/components/ui/ProgressBar";

export type BarListItem = { label: string; value: number };

export type BarListCardProps = {
  title: string;
  /** Dato de contexto junto al título, p. ej. "156 inscripciones este mes". */
  subtitle?: ReactNode;
  items: BarListItem[];
  /** Conclusión al pie, p. ej. "Actividad con mayor crecimiento: …". */
  summary?: ReactNode;
  /** Total al pie, p. ej. "Total: 156". */
  total?: ReactNode;
  /** Encabezados de la tabla para lectores de pantalla. */
  columns?: [string, string];
  className?: string;
};

// Bar List Card del D.S. Tramita (03_Indicators and graph). Es una tabla:
// categoría y valor son celdas reales y la barra es decorativa, así que la
// tabla misma es la vista accesible de los datos. A diferencia de Figma (que
// usa variantes fijas de Progress bar), la barra es proporcional al valor más alto.
export function BarListCard({
  title,
  subtitle,
  items,
  summary,
  total,
  columns = ["Categoría", "Valor"],
  className = "",
}: BarListCardProps) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <section className={`flex flex-col gap-4 rounded-[16px] border border-[#d8d9de] bg-white p-6 ${className}`}>
      <table className="w-full border-separate border-spacing-y-4">
        <caption className="mb-0 text-left">
          <span className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-sm font-bold leading-4 text-[#1c2057]">{title}</span>
            {subtitle ? <span className="text-xs leading-[14px] text-[#5c5d70]">{subtitle}</span> : null}
          </span>
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">{columns[0]}</th>
            <th scope="col">{columns[1]}</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.label}>
              <th scope="row" className="w-[170px] pr-2.5 text-left text-xs font-bold leading-4 text-[#484956]">
                {item.label}
              </th>
              <td className="text-right text-xs font-bold leading-4 text-[#5c5d70]">
                <span className="flex items-center gap-2.5">
                  <ProgressBar value={(item.value / max) * 100} className="flex-1" />
                  <span className="w-[50px] shrink-0">{item.value}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {summary || total ? (
        <footer className="flex flex-wrap items-baseline justify-between gap-2 border-t border-[#73748c] pt-4">
          {summary ? <p className="text-sm font-bold leading-4 text-[#1c2057]">{summary}</p> : <span />}
          {total ? <p className="text-xs leading-[14px] text-[#5c5d70]">{total}</p> : null}
        </footer>
      ) : null}
    </section>
  );
}
