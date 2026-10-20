"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CaretRightIcon, ClockIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { DataTable, TableFilters } from "@/components/ui/DataTable";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Tag } from "@/components/ui/Tag";
import type { TagCase } from "@/data/tags";

type Tramite = { radicado: string; solicitante: string; radicacion: string; estado: string; vencimiento: string };

const estados: Record<string, TagCase> = { "En revisión": "Pending Info", Vencido: "Error", Aprobado: "Success", "En espera": "Waiting" };

const tramites: Tramite[] = [
  { radicado: "TH-2026-000005", solicitante: "Jaime Sánchez", radicacion: "07/07/2026", estado: "En revisión", vencimiento: "21/07/2026" },
  { radicado: "TH-2026-000012", solicitante: "Valeria Santodomingo", radicacion: "06/07/2026", estado: "Vencido", vencimiento: "10/07/2026" },
  { radicado: "TH-2026-000018", solicitante: "Valentina Iriarte", radicacion: "09/07/2026", estado: "Aprobado", vencimiento: "23/07/2026" },
  { radicado: "TH-2026-000021", solicitante: "Andrés Restrepo", radicacion: "10/07/2026", estado: "En espera", vencimiento: "24/07/2026" },
  { radicado: "TH-2026-000027", solicitante: "Camila Ortiz", radicacion: "11/07/2026", estado: "En revisión", vencimiento: "25/07/2026" },
];

/** dd/mm/aaaa → número ordenable. */
const fecha = (value: string) => Number(value.split("/").reverse().join(""));

export function TramitesTable() {
  const [query, setQuery] = useState("");
  const [estado, setEstado] = useState("");
  const rows = useMemo(
    () =>
      tramites.filter(
        (t) => t.solicitante.toLowerCase().includes(query.toLowerCase()) && (!estado || t.estado === estado)
      ),
    [query, estado]
  );

  return (
    <div className="flex flex-col gap-6">
      <TableFilters
        search={
          <Input
            label="Buscar por nombre del solicitante"
            hideLabel
            type="search"
            iconLeft={<MagnifyingGlassIcon weight="regular" />}
            placeholder="Escriba el nombre del solicitante"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        }
      >
        <Select label="Estado" hideLabel placeholder="Estado" value={estado} onChange={(event) => setEstado(event.target.value)}>
          {Object.keys(estados).map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </Select>
        <Input label="Fecha de radicación" hideLabel type="date" />
        <Input label="Fecha de vencimiento" hideLabel type="date" />
      </TableFilters>

      <DataTable
        caption="Trámites asignados"
        rowKey={(row) => row.radicado}
        rows={rows}
        columns={[
          { key: "radicado", header: "Número radicado", sortable: true },
          { key: "solicitante", header: "Nombre solicitante", sortable: true },
          { key: "radicacion", header: "Fecha de radicación", sortable: true, sortValue: (row) => fecha(row.radicacion) },
          {
            key: "estado",
            header: "Estado",
            sortable: true,
            render: (row) => (
              <Tag tagCase={estados[row.estado]} size="S">
                {row.estado}
              </Tag>
            ),
          },
          {
            key: "vencimiento",
            header: "Vencimiento",
            sortable: true,
            sortValue: (row) => fecha(row.vencimiento),
            render: (row) => (
              <span className="inline-flex items-center gap-2">
                <ClockIcon aria-hidden className="size-4 text-[#484956]" />
                {row.vencimiento}
              </span>
            ),
          },
          {
            key: "detalle",
            header: "Ver detalle",
            hideHeader: true,
            width: 70,
            render: (row) => (
              <Link href="#" aria-label={`Ver detalle de ${row.radicado}`} className="inline-flex text-[#2a32a2]">
                <CaretRightIcon aria-hidden className="size-4" />
              </Link>
            ),
          },
        ]}
        empty="No hay trámites con esos filtros."
      />
    </div>
  );
}

export function IndicadoresTable() {
  return (
    <DataTable
      caption="Indicador de resultado"
      rowKey={(row) => row.apuesta}
      rows={[
        { apuesta: "Gobernanza", programa: "Avanzando hacia el mejoramiento de los trámites", resultado: "Cobertura neta en educación media", producto: "Aulas dotadas" },
        { apuesta: "Dignidad", programa: "-", resultado: "-", producto: "-" },
      ]}
      columns={[
        { key: "apuesta", header: "Apuesta" },
        { key: "programa", header: "Programa" },
        { key: "resultado", header: "Indicador de resultado" },
        { key: "producto", header: "Indicador de producto" },
      ]}
    />
  );
}
