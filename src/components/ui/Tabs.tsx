"use client";

import {
  Children,
  isValidElement,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
} from "react";

export type TabProps = {
  /** Texto de la pestaña (Tap text en Figma). */
  label: ReactNode;
  /** Contenido del panel. */
  children?: ReactNode;
};

/** Una pestaña. Solo se usa dentro de Tabs, que lee sus props. */
export function Tab(props: TabProps) {
  void props;
  return null;
}

export type TabsProps = {
  children: ReactNode;
  /** Pestaña seleccionada al inicio (sin control externo). */
  defaultIndex?: number;
  /** Pestaña seleccionada (con control externo). */
  index?: number;
  onChange?: (index: number) => void;
  /** Nombre del grupo de pestañas, si no hay un título visible que lo describa. */
  "aria-label"?: string;
};

// Taps del D.S. Tramita (02_Taps en Figma) con el patrón de pestañas de
// WAI-ARIA: flechas izquierda/derecha para moverse, Inicio y Fin, y Tab para
// entrar al panel. Las pestañas se reparten el ancho disponible.
export function Tabs({ children, defaultIndex = 0, index, onChange, "aria-label": ariaLabel }: TabsProps) {
  const id = useId();
  const tabs = Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> => isValidElement(child) && child.type === Tab
  );
  const [internal, setInternal] = useState(defaultIndex);
  const selected = index ?? internal;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  function select(next: number) {
    if (index === undefined) setInternal(next);
    onChange?.(next);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = tabs.length - 1;
    const next =
      event.key === "ArrowRight"
        ? (selected + 1) % tabs.length
        : event.key === "ArrowLeft"
          ? (selected - 1 + tabs.length) % tabs.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    select(next);
    refs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label={ariaLabel} className="flex w-full">
        {tabs.map((tab, i) => {
          const active = i === selected;
          return (
            <button
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={active}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={active ? 0 : -1}
              onClick={() => select(i)}
              onKeyDown={onKeyDown}
              // La línea inferior es un trazo interior en Figma (alto fijo de 51px):
              // se dibuja con sombra para que la pestaña no cambie de alto. Figma no
              // define estado de foco; se usa el indicador del navegador.
              className={`flex min-w-0 flex-1 cursor-pointer items-center justify-center px-2 py-4 text-base leading-[19px] ${
                active
                  ? "font-bold text-[#2a32a2] shadow-[inset_0_-4px_0_#2a32a2]"
                  : "font-normal text-[#5c5d70] shadow-[inset_0_-1px_0_#d8d9de]"
              }`}
            >
              {tab.props.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={i !== selected}
          tabIndex={0}
          className="pt-4"
        >
          {tab.props.children}
        </div>
      ))}
    </div>
  );
}
