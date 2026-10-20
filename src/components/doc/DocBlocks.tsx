import type { ReactNode } from "react";
import { CssCodeBlock, HtmlCodeBlock } from "@/components/CodeBlock";
import { parseCss } from "@/lib/css";

// Bloques compartidos por las páginas de documentación de componentes.

export function DocSection({
  title,
  description,
  level = 2,
  className = "mb-8",
  children,
}: {
  title: string;
  description?: ReactNode;
  level?: 2 | 3;
  className?: string;
  children: ReactNode;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <section className={className}>
      <Heading
        className={`mb-1 font-semibold text-zinc-900 ${level === 2 ? "text-lg" : "text-base"}`}
      >
        {title}
      </Heading>
      {description ? <p className="mb-4 text-sm text-zinc-600">{description}</p> : <div className="mb-3" />}
      {children}
    </section>
  );
}

export function InfoTable({
  columns,
  rows,
  minWidth = 480,
}: {
  columns: string[];
  rows: ReactNode[][];
  minWidth?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-xl bg-zinc-50 p-6">
      <table className="w-full border-separate border-spacing-y-2" style={{ minWidth }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-4 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, rowIndex) => (
            <tr key={rowIndex} className="align-top">
              {cells.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`bg-white px-4 py-3 text-sm ${
                    cellIndex === 0 ? "w-36 rounded-l-lg font-medium text-zinc-900" : "text-zinc-600"
                  } ${cellIndex === cells.length - 1 ? "rounded-r-lg" : ""}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AnatomyBlock({
  diagram,
  items,
}: {
  diagram: ReactNode;
  items: { number: number; name: string; detail: string }[];
}) {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-zinc-50 p-6 sm:flex-row sm:items-center">
      <div className="shrink-0">{diagram}</div>
      <ol className="flex flex-1 flex-col gap-4">
        {items.map((item) => (
          <li key={item.number} className="flex gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#c54600] text-xs font-bold text-white">
              {item.number}
            </span>
            <div>
              <p className="font-semibold text-zinc-900">{item.name}</p>
              <p className="text-sm text-zinc-600">{item.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export type SpecGroup = { element: string; rows: { name: string; value: string }[] };

export function SpecsBlock({ diagram, groups }: { diagram?: ReactNode; groups: SpecGroup[] }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-zinc-50 p-6 lg:flex-row lg:items-center">
      {diagram ? <div className="shrink-0">{diagram}</div> : null}
      <div className="flex flex-1 flex-col gap-4">
        {groups.map((group) => (
          <div key={group.element}>
            <h3 className="mb-2 text-sm font-semibold text-zinc-900">{group.element}</h3>
            <dl className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white">
              {group.rows.map((spec) => (
                <div key={spec.name} className="flex items-center justify-between gap-4 px-5 py-3">
                  <dt className="text-sm text-zinc-600">{spec.name}</dt>
                  <dd className="text-right font-mono text-sm text-zinc-900">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 rounded-xl bg-zinc-50 p-6 pl-10">
      {items.map((item) => (
        <li key={item} className="text-sm leading-relaxed text-zinc-700">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 rounded-xl border border-[var(--brand-primary-soft)] bg-white p-4 text-sm leading-relaxed text-zinc-700">
      {children}
    </p>
  );
}

/** Matriz de muestras: filas × columnas, con encabezados accesibles. */
export function PreviewMatrix({
  columns,
  rows,
  minWidth = 560,
}: {
  columns: string[];
  rows: { label: string; cells: ReactNode[] }[];
  minWidth?: number;
}) {
  return (
    <div className="overflow-x-auto rounded-xl bg-zinc-50 p-6">
      <table className="w-full border-separate border-spacing-4" style={{ minWidth }}>
        <thead>
          <tr>
            <td />
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-600"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row" className="pr-2 text-left text-sm font-medium text-zinc-700">
                {row.label}
              </th>
              {row.cells.map((cell, index) => (
                <td key={index} className="text-center">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MarkerBadge({ n }: { n: number }) {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#c54600] text-[11px] font-bold text-white">
      {n}
    </span>
  );
}

/** Secciones HTML y CSS de la pestaña Code, para equipos que no usan React. */
export function HtmlCssSections({ html, css, intro }: { html: string; css: string; intro?: ReactNode }) {
  return (
    <>
      <DocSection
        title="HTML"
        description={intro ?? "Estructura semántica de referencia, para equipos que no usan el componente React."}
      >
        <HtmlCodeBlock code={html} />
      </DocSection>
      <DocSection title="CSS" className="" description="Estilos con los valores de Figma.">
        <CssCodeBlock rules={parseCss(css)} />
      </DocSection>
    </>
  );
}
