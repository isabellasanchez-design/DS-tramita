import type { ReactNode } from "react";

/** Status en Figma: énfasis del punto, de mayor (L) a ninguno. */
export type TimelineEmphasis = "L" | "M" | "S" | "none";

// Punto de 12px de Figma (03_Activity Timeline): #5c5d70 con un anillo blanco
// interior de 0 (L), 1px (M) o 3px (S); None es un punto blanco.
const dots: Record<TimelineEmphasis, string> = {
  L: "bg-[#5c5d70]",
  M: "bg-[#5c5d70] shadow-[inset_0_0_0_1px_#ffffff]",
  S: "bg-[#5c5d70] shadow-[inset_0_0_0_3px_#ffffff]",
  none: "bg-white",
};

export type ActivityTimelineProps = {
  /** Nombre de la lista, p. ej. "Historial del trámite". */
  "aria-label": string;
  className?: string;
  children: ReactNode;
};

// Activity Timeline del D.S. Tramita: lista de eventos, del más reciente al
// más antiguo. La línea que une los puntos se oculta en el último evento.
export function ActivityTimeline({ "aria-label": ariaLabel, className = "", children }: ActivityTimelineProps) {
  return (
    <ol aria-label={ariaLabel} className={`flex flex-col ${className}`}>
      {children}
    </ol>
  );
}

export type ActivityTimelineItemProps = {
  title: ReactNode;
  /** Hora y responsable (Time and person in charge). */
  meta?: ReactNode;
  emphasis?: TimelineEmphasis;
  /** Descripción (Slot en Figma). */
  children?: ReactNode;
};

export function ActivityTimelineItem({ title, meta, emphasis = "none", children }: ActivityTimelineItemProps) {
  return (
    <li className="group flex gap-2">
      <div aria-hidden className="flex w-5 shrink-0 flex-col items-center">
        <span className={`mt-0.5 size-3 shrink-0 rounded-full ${dots[emphasis]}`} />
        <span className="w-0.5 flex-1 bg-[#ebebed] group-last:hidden" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 pb-6">
        <p className="text-sm font-bold leading-4 text-[#1c2057]">{title}</p>
        {meta ? <p className="text-xs leading-[14px] text-[#9496a8]">{meta}</p> : null}
        {children ? <div className="text-xs leading-[14px] text-[#9496a8]">{children}</div> : null}
      </div>
    </li>
  );
}
