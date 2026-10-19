"use client";

import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

/** Posición de la flecha (tip-position en Figma). El tooltip queda del lado contrario. */
export type TipPosition =
  | "left"
  | "right"
  | "leftTop"
  | "centerTop"
  | "rightTop"
  | "leftBottom"
  | "centerBottom"
  | "rightBottom";

// Medidas de Figma (03_Tooltip): flecha de 12×6px a 20px del borde de la burbuja
// en las posiciones arriba/abajo, y a 8px del borde superior en left/right.
const ARROW_INSET = 20;
const ARROW_HALF = 6;

const arrowStyle: Record<TipPosition, CSSProperties> = {
  leftBottom: { top: "100%", left: ARROW_INSET, borderWidth: "6px 6px 0", borderTopColor: "#1c2057" },
  centerBottom: { top: "100%", left: "50%", marginLeft: -ARROW_HALF, borderWidth: "6px 6px 0", borderTopColor: "#1c2057" },
  rightBottom: { top: "100%", right: ARROW_INSET, borderWidth: "6px 6px 0", borderTopColor: "#1c2057" },
  leftTop: { bottom: "100%", left: ARROW_INSET, borderWidth: "0 6px 6px", borderBottomColor: "#1c2057" },
  centerTop: { bottom: "100%", left: "50%", marginLeft: -ARROW_HALF, borderWidth: "0 6px 6px", borderBottomColor: "#1c2057" },
  rightTop: { bottom: "100%", right: ARROW_INSET, borderWidth: "0 6px 6px", borderBottomColor: "#1c2057" },
  left: { right: "100%", top: 8, borderWidth: "6px 6px 6px 0", borderRightColor: "#1c2057" },
  right: { left: "100%", top: 8, borderWidth: "6px 0 6px 6px", borderLeftColor: "#1c2057" },
};

/** Burbuja del tooltip, sin comportamiento. La usa Tooltip y la documentación. */
export function TooltipBubble({
  tipPosition = "centerBottom",
  id,
  style,
  children,
}: {
  tipPosition?: TipPosition;
  id?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <span
      id={id}
      role="tooltip"
      className="relative block w-max max-w-[290px] rounded-[8px] bg-[#1c2057] px-3 py-2 text-left text-xs leading-[14px] font-normal whitespace-normal text-white shadow-[0_6px_6px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.25)]"
      style={style}
    >
      {children}
      <span aria-hidden className="absolute size-0 border-solid border-transparent" style={arrowStyle[tipPosition]} />
    </span>
  );
}

// Posición de la burbuja respecto al elemento: la flecha apunta a su centro. La
// separación de 6px es padding (no margen) para que el cursor pueda pasar del
// elemento a la burbuja sin cerrarla.
const bubblePosition: Record<TipPosition, CSSProperties> = {
  leftBottom: { bottom: "100%", paddingBottom: 6, left: `calc(50% - ${ARROW_INSET + ARROW_HALF}px)` },
  centerBottom: { bottom: "100%", paddingBottom: 6, left: "50%", transform: "translateX(-50%)" },
  rightBottom: { bottom: "100%", paddingBottom: 6, right: `calc(50% - ${ARROW_INSET + ARROW_HALF}px)` },
  leftTop: { top: "100%", paddingTop: 6, left: `calc(50% - ${ARROW_INSET + ARROW_HALF}px)` },
  centerTop: { top: "100%", paddingTop: 6, left: "50%", transform: "translateX(-50%)" },
  rightTop: { top: "100%", paddingTop: 6, right: `calc(50% - ${ARROW_INSET + ARROW_HALF}px)` },
  left: { left: "100%", paddingLeft: 6, top: `calc(50% - ${8 + ARROW_HALF}px)` },
  right: { right: "100%", paddingRight: 6, top: `calc(50% - ${8 + ARROW_HALF}px)` },
};

export type TooltipProps = {
  /** Texto del tooltip; máximo dos líneas. Solo texto: nada interactivo adentro. */
  content: ReactNode;
  tipPosition?: TipPosition;
  /** Elemento que lo activa; debe poder recibir foco (botón, enlace, campo). */
  children: ReactElement<{ "aria-describedby"?: string }>;
};

// Tooltip del D.S. Tramita. Cumple WCAG 1.4.13: aparece con hover y con foco,
// se cierra con Escape sin mover el foco y no desaparece al pasar el cursor
// sobre él (la burbuja está dentro del contenedor que escucha el hover).
export function Tooltip({ content, tipPosition = "centerBottom", children }: TooltipProps) {
  const id = useId();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const open = (hovered || focused) && !dismissed;

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setDismissed(true);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        "aria-describedby": [children.props["aria-describedby"], id].filter(Boolean).join(" "),
      })
    : children;

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setDismissed(false);
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => {
        setFocused(false);
        setDismissed(false);
      }}
    >
      {trigger}
      {/* Siempre en el DOM para que aria-describedby funcione; oculto cuando está cerrado. */}
      <span className={`absolute z-50 ${open ? "" : "hidden"}`} style={bubblePosition[tipPosition]}>
        <TooltipBubble id={id} tipPosition={tipPosition}>
          {content}
        </TooltipBubble>
      </span>
    </span>
  );
}
