import type { ReactNode } from "react";
import { Tag } from "@/components/ui/Tag";
import type { TagCase } from "@/data/tags";

export type KpiStatus = "Neutral" | "Success" | "Warning" | "Critical";

// Colores de la barra superior por Status (03_Indicators and graph › KPI Card).
const statusBar: Record<KpiStatus, string> = {
  Neutral: "#3140a6",
  Success: "#17974c",
  Warning: "#b06a08",
  Critical: "#d6303f",
};
// El badge es un Tag Filled XS; Badge en Figma → caso del Tag.
const badgeCase: Record<KpiStatus, TagCase> = {
  Neutral: "Pending Info",
  Success: "Success",
  Warning: "Warning",
  Critical: "Error",
};

export type KpiCardProps = {
  value: ReactNode;
  title: string;
  description?: ReactNode;
  /** Color de la barra superior. */
  status?: KpiStatus;
  /** Badge junto al valor; el texto dice el estado (no solo el color). */
  badge?: { status: KpiStatus; label: string };
  className?: string;
};

// KPI Card del D.S. Tramita: un número principal con su título, descripción
// y estado. Es un <article> cuyo nombre es el título.
export function KpiCard({ value, title, description, status = "Neutral", badge, className = "" }: KpiCardProps) {
  return (
    <article
      aria-label={title}
      className={`overflow-hidden rounded-[14px] border border-[#e1e3f3] bg-white shadow-[0_8px_24px_rgba(27,33,89,0.12),0_1px_2px_rgba(27,33,89,0.06)] ${className}`}
    >
      <span aria-hidden className="block h-1" style={{ backgroundColor: statusBar[status] }} />
      <div className="flex flex-col gap-3 px-5 py-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[32px] font-bold leading-10 text-[#1c2057]">{value}</p>
          {badge ? (
            <Tag tagCase={badgeCase[badge.status]} type="Filled" size="XS">
              {badge.label}
            </Tag>
          ) : null}
        </div>
        <h3 className="text-sm font-bold leading-4 text-[#1c2057]">{title}</h3>
        {description ? <p className="text-xs leading-[14px] text-[#5c5d70]">{description}</p> : null}
      </div>
    </article>
  );
}
