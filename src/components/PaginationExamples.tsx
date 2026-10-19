"use client";

import { useState } from "react";
import { Pagination } from "@/components/ui/Pagination";

const noop = () => {};

export function PaginationStates() {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-zinc-50 p-6">
      {[
        { page: 1, label: "next page" },
        { page: 2, label: "previous and next page" },
        { page: 3, label: "previous page" },
      ].map(({ page, label }) => (
        <div key={label} className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-zinc-600">{label}</span>
          <Pagination page={page} totalPages={3} onPageChange={noop} aria-label={`Ejemplo ${label}`} />
        </div>
      ))}
    </div>
  );
}

const solicitudes = Array.from({ length: 23 }, (_, i) => `Solicitud ${String(i + 1).padStart(3, "0")}`);
const PER_PAGE = 5;

export function PaginationDemo() {
  const [page, setPage] = useState(1);
  const total = Math.ceil(solicitudes.length / PER_PAGE);
  return (
    <div className="flex flex-col gap-4">
      <ul aria-label={`Solicitudes, página ${page} de ${total}`} className="flex flex-col gap-1 text-sm text-zinc-700">
        {solicitudes.slice((page - 1) * PER_PAGE, page * PER_PAGE).map((item) => (
          <li key={item} className="rounded-lg bg-white px-4 py-2">
            {item}
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={total} onPageChange={setPage} />
    </div>
  );
}
