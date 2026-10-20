"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ArrowsDownUpIcon } from "@phosphor-icons/react/dist/ssr";

export type DataTableColumn<Row> = {
  key: string;
  header: string;
  /** Contenido de la celda; por defecto row[key]. */
  render?: (row: Row) => ReactNode;
  /** Muestra el botón de ordenar (ArrowsDownUp en Figma). */
  sortable?: boolean;
  /** Valor para ordenar; por defecto row[key]. */
  sortValue?: (row: Row) => string | number;
  /** Ancho fijo, p. ej. 70 para la columna de acción. */
  width?: number;
  /** Oculta el texto del encabezado (p. ej. columna de acciones); sigue para lectores. */
  hideHeader?: boolean;
};

export type DataTableProps<Row> = {
  /** Título de la tabla (caption). */
  caption: string;
  /** Muestra el caption; si no, solo lo oyen los lectores de pantalla. */
  showCaption?: boolean;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  /** Texto cuando no hay filas. */
  empty?: ReactNode;
  className?: string;
};

type Sort = { key: string; direction: "ascending" | "descending" } | null;

// Tabla del D.S. Tramita (03_Tabla en Figma): encabezado #e4e5f4, celdas
// blancas con borde inferior #d8d9de, fila en hover #c9ccee y esquinas de 24px.
// Es una <table> real: caption, th con scope y aria-sort en la columna ordenada.
export function DataTable<Row extends Record<string, unknown>>({
  caption,
  showCaption = false,
  columns,
  rows,
  rowKey,
  empty = "No hay resultados.",
  className = "",
}: DataTableProps<Row>) {
  const [sort, setSort] = useState<Sort>(null);

  const sorted = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((c) => c.key === sort.key);
    const value = (row: Row) => column?.sortValue?.(row) ?? (row[sort.key] as string | number);
    const factor = sort.direction === "ascending" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = value(a);
      const vb = value(b);
      return (typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb), "es")) * factor;
    });
  }, [rows, columns, sort]);

  function toggleSort(key: string) {
    setSort((prev) =>
      prev?.key === key ? { key, direction: prev.direction === "ascending" ? "descending" : "ascending" } : { key, direction: "ascending" }
    );
  }

  return (
    <div className={`overflow-x-auto rounded-[24px] ${className}`}>
      {/* table-fixed: las columnas sin ancho se reparten igual, como en Figma (252px c/u). */}
      <table className="w-full min-w-[720px] table-fixed border-separate border-spacing-0 text-left">
        <caption className={showCaption ? "mb-3 text-left text-sm font-bold text-[#1c2057]" : "sr-only"}>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column, i) => {
              const sortedHere = sort?.key === column.key;
              return (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={sortedHere ? sort.direction : undefined}
                  style={{ width: column.width }}
                  className={`border-b border-[#d8d9de] bg-[#e4e5f4] p-4 text-xs font-bold leading-[14px] text-[#484956] ${
                    i === 0 ? "rounded-tl-[24px]" : ""
                  } ${i === columns.length - 1 ? "rounded-tr-[24px]" : ""}`}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(column.key)}
                      className="inline-flex cursor-pointer items-center gap-3 text-left"
                    >
                      {column.header}
                      <ArrowsDownUpIcon aria-hidden className="size-4 shrink-0" />
                      <span className="sr-only">, ordenar</span>
                    </button>
                  ) : (
                    <span className={column.hideHeader ? "sr-only" : ""}>{column.header}</span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="rounded-b-[24px] border-b border-[#d8d9de] bg-white px-6 py-4 text-sm text-[#5c5d70]">
                {empty}
              </td>
            </tr>
          ) : (
            sorted.map((row, r) => {
              const last = r === sorted.length - 1;
              return (
                <tr key={rowKey(row)} className="group">
                  {columns.map((column, i) => (
                    <td
                      key={column.key}
                      className={`border-b border-[#d8d9de] bg-white px-6 py-4 text-sm leading-4 text-[#202025] group-hover:bg-[#c9ccee] ${
                        i > 0 && i < columns.length - 1 ? "group-hover:border-[#e4e5f4]" : ""
                      } ${last && i === 0 ? "rounded-bl-[24px]" : ""} ${last && i === columns.length - 1 ? "rounded-br-[24px]" : ""}`}
                    >
                      {column.render ? column.render(row) : (row[column.key] as ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

/** Filtros de tabla (Figma): buscador arriba y filtros en fila debajo. */
export function TableFilters({ search, children }: { search?: ReactNode; children?: ReactNode }) {
  return (
    <div role="search" className="flex flex-col gap-6">
      {search ? <div className="max-w-[548px]">{search}</div> : null}
      {children ? <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:max-w-[700px]">{children}</div> : null}
    </div>
  );
}
