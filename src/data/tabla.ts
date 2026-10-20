import type { SpecGroup } from "@/components/doc/DocBlocks";

export const tablaDefinition =
  "Tabla para listar registros con varias columnas, como las solicitudes asignadas a un funcionario. Permite ordenar por columna, filtrar y entrar al detalle de cada fila.";

export const tablaSpecs: SpecGroup[] = [
  {
    element: "Encabezado (Table header cell)",
    rows: [
      { name: "Fondo", value: "#e4e5f4 · borde inferior #d8d9de" },
      { name: "Padding", value: "16px" },
      { name: "Texto", value: "Roboto Bold 12px · #484956" },
      { name: "Ordenar", value: "ArrowsDownUp 16px, 12px después del texto" },
    ],
  },
  {
    element: "Celda (Table cell)",
    rows: [
      { name: "Fondo", value: "Blanco · borde inferior #d8d9de" },
      { name: "Hover", value: "Fondo #c9ccee (toda la fila)" },
      { name: "Padding", value: "16px 24px" },
      { name: "Texto", value: "Roboto 14px · #202025" },
    ],
  },
  {
    element: "Tabla",
    rows: [
      { name: "Esquinas", value: "24px (left corner / right corner)" },
      { name: "Columnas", value: "Ancho repartido · acción 70px" },
      { name: "Filtros", value: "Buscador de 548px · filtros de 228px separados 8px · 24px entre filas" },
    ],
  },
];

export const tablaNote =
  "Figma no define estados de foco para los botones de ordenar ni para el enlace de detalle; el código usa el indicador del navegador. Tampoco define el estado de tabla vacía: el código muestra \"No hay resultados.\".";

export const tablaUsage: string[] = [
  "Para comparar registros con los mismos campos. Si cada registro tiene pocos datos y mucho texto, mejor Cards.",
  "Ordenar por la columna más útil por defecto (p. ej. fecha de vencimiento) y permitir cambiarlo.",
  "El estado en un Tag con texto; las fechas siempre en el mismo formato (dd/mm/aaaa).",
  "Con más de 10 filas, agregar Pagination debajo.",
  "Los filtros van arriba de la tabla y aplican de inmediato.",
];

export const tablaAccessibility: string[] = [
  "Es una <table> con caption y encabezados con scope=\"col\".",
  "Las columnas ordenables tienen un botón en el encabezado; la columna ordenada lleva aria-sort (ascending/descending).",
  "El enlace de cada fila tiene nombre completo (\"Ver detalle de TH-2026-000005\"), no solo el ícono.",
  "Los filtros están en un role=\"search\"; cada uno tiene label, aunque no se vea.",
  "En pantallas angostas la tabla hace scroll horizontal en vez de deformarse.",
];

export const tablaReactUsage = `import { DataTable, TableFilters } from "@/components/ui/DataTable";

<DataTable
  caption="Trámites asignados"
  rowKey={(row) => row.radicado}
  rows={tramites}
  columns={[
    { key: "radicado", header: "Número radicado", sortable: true },
    { key: "solicitante", header: "Nombre solicitante", sortable: true },
    { key: "estado", header: "Estado", render: (row) => <Tag tagCase="Pending Info" size="S">{row.estado}</Tag> },
    {
      key: "detalle",
      header: "Ver detalle",
      hideHeader: true,
      width: 70,
      render: (row) => (
        <Link href={\`/tramites/\${row.radicado}\`} aria-label={\`Ver detalle de \${row.radicado}\`}>
          <CaretRightIcon />
        </Link>
      ),
    },
  ]}
/>`;
