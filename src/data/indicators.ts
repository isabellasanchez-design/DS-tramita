import type { SpecGroup } from "@/components/doc/DocBlocks";

export const indicatorsDefinition =
  "Piezas para tableros de seguimiento: KPI Card para una cifra clave con su estado, Bar List Card para comparar cantidades entre categorías y Progress bar para el avance hacia una meta.";

export const kpiStatusInfo: { status: string; bar: string; badge: string }[] = [
  { status: "Neutral", bar: "#3140a6", badge: "Tag Pending Info" },
  { status: "Success", bar: "#17974c", badge: "Tag Success" },
  { status: "Warning", bar: "#b06a08", badge: "Tag Warning" },
  { status: "Critical", bar: "#d6303f", badge: "Tag Error" },
];

export const indicatorsSpecs: SpecGroup[] = [
  {
    element: "KPI Card",
    rows: [
      { name: "Contenedor", value: "Blanco · borde #e1e3f3 · radio 14px" },
      { name: "Sombra", value: "0 8px 24px rgba(27,33,89,.12), 0 1px 2px rgba(27,33,89,.06)" },
      { name: "Barra de estado", value: "4px arriba, color según Status" },
      { name: "Valor", value: "Roboto Bold 32px · #1c2057" },
      { name: "Título / descripción", value: "Bold 14px #1c2057 · 12px #5c5d70" },
    ],
  },
  {
    element: "Bar List Card",
    rows: [
      { name: "Contenedor", value: "Blanco · borde #d8d9de · radio 16px · padding 24px" },
      { name: "Fila", value: "Categoría 170px Bold 12px #484956 · barra · valor Bold 12px #5c5d70" },
      { name: "Separación", value: "16px entre filas · 10px entre columnas" },
      { name: "Pie", value: "Línea #73748c · conclusión Bold 14px · total 12px" },
    ],
  },
  {
    element: "Progress bar",
    rows: [
      { name: "Alto", value: "S 8px · XS 4px" },
      { name: "Colores", value: "Pista #e4e5f4 · relleno #2a32a2" },
      { name: "Extremos", value: "Redondeados" },
    ],
  },
];

export const indicatorsNote =
  "Diferencia con Figma: en la Bar List Card de Figma las barras usan las variantes fijas de Progress bar (100%, 50%, 33%, 25%), así que 34 y 28 se ven iguales. En código cada barra es proporcional al valor más alto, para que la longitud represente el dato real.";

export const indicatorsUsage: string[] = [
  "KPI Card para 3 a 5 cifras clave arriba de un tablero; el título dice qué se mide y la descripción el periodo.",
  "El badge resume el estado con texto (\"Cumplido\", \"Crítico\"): el color de la barra no es la única pista.",
  "Bar List Card para comparar hasta 8 categorías ordenadas de mayor a menor; con más, agrupar el resto en \"Otras\".",
  "Progress bar para el avance hacia una meta, con el porcentaje escrito cerca.",
];

export const indicatorsAccessibility: string[] = [
  "La Bar List Card es una <table> con título (caption) y encabezados: categoría y valor se leen como datos; la barra es decorativa.",
  "La KPI Card es un <article> con su título como nombre; el estado se dice en el badge.",
  "La Progress bar con label es role=\"progressbar\" con aria-valuenow; sin label es decorativa.",
];

export const indicatorsReactUsage = `import { KpiCard } from "@/components/ui/KpiCard";
import { BarListCard } from "@/components/ui/BarListCard";
import { ProgressBar } from "@/components/ui/ProgressBar";

<KpiCard value="1.284" title="Trámites radicados" description="Último mes" status="Success" badge={{ status: "Success", label: "Cumplido" }} />

<BarListCard
  title="Nuevos prestadores por actividad turística"
  subtitle="156 inscripciones este mes"
  items={[{ label: "Alojamiento turístico", value: 62 }, { label: "Agencias de viajes", value: 34 }]}
  summary="Actividad con mayor crecimiento: Alojamiento turístico"
  total="Total: 156"
/>

<ProgressBar value={66} label="Avance de la meta anual" />`;
