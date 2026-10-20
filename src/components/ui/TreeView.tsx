"use client";

import { useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CaretUpIcon, FilesIcon, FlagIcon, SignpostIcon, TargetIcon } from "@phosphor-icons/react/dist/ssr";

export type TreeItem = {
  id: string;
  /** Código corto, p. ej. "AP-01". */
  code?: string;
  title: string;
  description?: string;
  /** Ícono propio; por defecto el de su nivel en Figma. */
  icon?: ReactNode;
  children?: TreeItem[];
};

export type TreeViewProps = {
  items: TreeItem[];
  /** ids abiertos al inicio. */
  defaultExpanded?: string[];
  "aria-label": string;
  className?: string;
};

// Figma (03_Expandable tree item) nombra los niveles 00, 02, 03 y 04: no hay
// 01. La profundidad 0 es el Nivel 00, la 1 el Nivel 02, la 2 el 03 y la 3 el 04.
const levelIcons = [TargetIcon, SignpostIcon, FilesIcon, FlagIcon];

/** Sangría de Figma: 16px (Nivel 00), 56px (02), 80px (03), 104px (04). */
const indent = (depth: number) => (depth === 0 ? 16 : 32 + 24 * depth);

type Flat = { item: TreeItem; level: number; parent?: string };

// Expandable tree item del D.S. Tramita con el patrón de árbol de WAI-ARIA:
// una sola fila enfocable a la vez (roving tabindex), flechas para moverse,
// derecha/izquierda para abrir, cerrar o ir al padre, Inicio, Fin y Enter.
export function TreeView({ items, defaultExpanded = [], "aria-label": ariaLabel, className = "" }: TreeViewProps) {
  const [expanded, setExpanded] = useState(() => new Set(defaultExpanded));
  const [focusId, setFocusId] = useState(items[0]?.id);
  const refs = useRef(new Map<string, HTMLLIElement>());

  // Filas visibles en orden, para la navegación con teclado.
  const visible = useMemo(() => {
    const out: Flat[] = [];
    const walk = (list: TreeItem[], level: number, parent?: string) => {
      for (const item of list) {
        out.push({ item, level, parent });
        if (item.children?.length && expanded.has(item.id)) walk(item.children, level + 1, item.id);
      }
    };
    walk(items, 0);
    return out;
  }, [items, expanded]);

  function focus(id: string | undefined) {
    if (!id) return;
    setFocusId(id);
    refs.current.get(id)?.focus();
  }

  function toggle(id: string, open?: boolean) {
    setExpanded((prev) => {
      const next = new Set(prev);
      const shouldOpen = open ?? !next.has(id);
      if (shouldOpen) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLLIElement>, row: Flat) {
    // Solo la fila enfocada responde; las teclas no se repiten en sus ancestros.
    if (event.target !== event.currentTarget) return;
    const index = visible.findIndex((v) => v.item.id === row.item.id);
    const hasChildren = Boolean(row.item.children?.length);
    const isOpen = expanded.has(row.item.id);
    const keys: Record<string, () => void> = {
      ArrowDown: () => focus(visible[index + 1]?.item.id),
      ArrowUp: () => focus(visible[index - 1]?.item.id),
      Home: () => focus(visible[0]?.item.id),
      End: () => focus(visible[visible.length - 1]?.item.id),
      ArrowRight: () => {
        if (!hasChildren) return;
        if (!isOpen) toggle(row.item.id, true);
        else focus(row.item.children![0].id);
      },
      ArrowLeft: () => {
        if (hasChildren && isOpen) toggle(row.item.id, false);
        else focus(row.parent);
      },
      Enter: () => hasChildren && toggle(row.item.id),
      " ": () => hasChildren && toggle(row.item.id),
    };
    if (keys[event.key]) {
      event.preventDefault();
      keys[event.key]();
    }
  }

  function renderItems(list: TreeItem[], level: number, parent?: string): ReactNode {
    return list.map((item) => {
      const hasChildren = Boolean(item.children?.length);
      const isOpen = expanded.has(item.id);
      const LevelIcon = levelIcons[Math.min(level, levelIcons.length - 1)];
      const row: Flat = { item, level, parent };
      return (
        <li
          key={item.id}
          ref={(el) => {
            if (el) refs.current.set(item.id, el);
            else refs.current.delete(item.id);
          }}
          role="treeitem"
          aria-level={level + 1}
          aria-expanded={hasChildren ? isOpen : undefined}
          // La selección sigue al foco: la fila activa es la seleccionada.
          aria-selected={item.id === focusId}
          tabIndex={item.id === focusId ? 0 : -1}
          onKeyDown={(event) => onKeyDown(event, row)}
          onFocus={(event) => {
            if (event.target === event.currentTarget) setFocusId(item.id);
          }}
        >
          <div
            onClick={() => {
              focus(item.id);
              if (hasChildren) toggle(item.id);
            }}
            className={`flex cursor-pointer items-center gap-2 py-2 pr-4 ${level === 0 ? (isOpen ? "bg-white" : "rounded-[8px] bg-white") : "bg-[#f6f6f7]"}`}
            style={{ paddingLeft: indent(level) }}
          >
            {/* Figma usa CaretUp tanto abierto como cerrado. */}
            <CaretUpIcon aria-hidden className={`size-4 shrink-0 text-[#333dcc] ${hasChildren ? "" : "invisible"}`} />
            <span aria-hidden className="inline-flex size-4 shrink-0 text-[#333dcc] [&>svg]:size-full">
              {item.icon ?? <LevelIcon />}
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="flex gap-1 text-sm leading-4">
                {item.code ? <span className="shrink-0 text-[#484956]">{item.code}</span> : null}
                <span className="text-[#202025]">{item.title}</span>
              </span>
              {item.description ? <span className="text-xs leading-[14px] text-[#424242]">{item.description}</span> : null}
            </span>
          </div>
          {hasChildren && isOpen ? (
            <ul role="group">{renderItems(item.children!, level + 1, item.id)}</ul>
          ) : null}
        </li>
      );
    });
  }

  return (
    <ul role="tree" aria-label={ariaLabel} className={`flex flex-col ${className}`}>
      {renderItems(items, 0)}
    </ul>
  );
}
