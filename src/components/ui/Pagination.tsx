"use client";

import { useEffect, useRef } from "react";
import { CaretCircleLeftIcon, CaretCircleRightIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";

export type PaginationProps = {
  /** Página actual, empezando en 1. */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Cuántos números se muestran a la vez. Figma muestra 3. */
  visiblePages?: number;
  /** Nombre del <nav>; cambiarlo si hay más de una paginación en la página. */
  "aria-label"?: string;
};

/** Ventana de números alrededor de la página actual, sin salirse del rango. */
function pageWindow(page: number, total: number, size: number) {
  const count = Math.min(size, total);
  const start = Math.min(Math.max(page - Math.floor(count / 2), 1), total - count + 1);
  return Array.from({ length: count }, (_, i) => start + i);
}

// Pagination del D.S. Tramita (02_Pagination en Figma), hecha con Button:
// la página actual es Outline y las demás Tertiary. "Anterior" no aparece en la
// primera página y "Siguiente" no aparece en la última, como en Figma.
export function Pagination({
  page,
  totalPages,
  onPageChange,
  visiblePages = 3,
  "aria-label": ariaLabel = "Paginación",
}: PaginationProps) {
  const navRef = useRef<HTMLElement>(null);
  const restoreFocus = useRef(false);

  // Anterior y Siguiente desaparecen en la primera y la última página. Si el
  // foco estaba en ese botón, se pasa al número de la página actual para que
  // quien usa teclado no lo pierda.
  useEffect(() => {
    if (!restoreFocus.current) return;
    restoreFocus.current = false;
    navRef.current?.querySelector<HTMLButtonElement>('[aria-current="page"]')?.focus();
  }, [page]);

  function goTo(next: number) {
    restoreFocus.current = next === 1 || next === totalPages;
    onPageChange(next);
  }

  if (totalPages <= 1) return null;
  const pages = pageWindow(page, totalPages, visiblePages);

  return (
    <nav ref={navRef} aria-label={ariaLabel}>
      <ul className="flex flex-wrap items-center gap-1">
        {page > 1 ? (
          <li>
            <Button
              variant="Outline"
              iconLeft={<CaretCircleLeftIcon weight="regular" />}
              onClick={() => goTo(page - 1)}
            >
              Anterior
            </Button>
          </li>
        ) : null}
        {pages.map((number) => {
          const current = number === page;
          return (
            <li key={number}>
              <Button
                variant={current ? "Outline" : "Tertiary"}
                aria-current={current ? "page" : undefined}
                aria-label={`Página ${number}`}
                onClick={() => {
                  if (!current) onPageChange(number);
                }}
              >
                {number}
              </Button>
            </li>
          );
        })}
        {page < totalPages ? (
          <li>
            <Button
              variant="Outline"
              iconRight={<CaretCircleRightIcon weight="regular" />}
              onClick={() => goTo(page + 1)}
            >
              Siguiente
            </Button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
