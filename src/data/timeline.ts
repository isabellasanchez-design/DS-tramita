import type { SpecGroup } from "@/components/doc/DocBlocks";

export const timelineDefinition =
  "Historial de lo que ha pasado en un trámite o una atención: cada evento con su hora, quién lo hizo y una descripción, del más reciente al más antiguo.";

export const timelineEmphasis: { figma: string; code: string; when: string }[] = [
  { figma: "L", code: "L", when: "Evento más reciente o hito principal (punto relleno)." },
  { figma: "M", code: "M", when: "Evento importante (anillo blanco de 1px)." },
  { figma: "S", code: "S", when: "Evento secundario (anillo blanco de 3px)." },
  { figma: "None", code: "none", when: "Evento informativo (punto blanco)." },
];

export const timelineSpecs: SpecGroup[] = [
  {
    element: "Evento",
    rows: [
      { name: "Punto", value: "12px · #5c5d70" },
      { name: "Línea", value: "2px · #ebebed" },
      { name: "Columna del punto", value: "20px · 8px hasta el texto" },
      { name: "Título", value: "Roboto Bold 14px · #1c2057" },
      { name: "Hora y responsable", value: "Roboto 12px · #9496a8" },
      { name: "Descripción", value: "Roboto 12px · #9496a8" },
      { name: "Espacio entre eventos", value: "24px" },
    ],
  },
];

export const timelineContrastNote =
  "Accesibilidad pendiente: la hora y la descripción (#9496a8, 2,92:1) no cumplen WCAG 1.4.3, y el punto None es blanco sin borde, así que no se ve sobre fondo blanco. Se corrige primero en Figma y luego en código, como una versión nueva.";

export const timelineUsage: string[] = [
  "Para el historial de una solicitud, un turno o un documento.",
  "Del evento más reciente al más antiguo, con hora y responsable en todos.",
  "Títulos cortos en pasado (\"Documentos adjuntados\").",
  "El énfasis del punto no debe ser la única forma de saber qué pasó: el título lo dice.",
];

export const timelineAccessibility: string[] = [
  "Es una lista ordenada <ol> con nombre (\"Historial del trámite\").",
  "Los puntos y las líneas son decorativos (aria-hidden); el contenido está en el texto.",
];

export const timelineReactUsage = `import { ActivityTimeline, ActivityTimelineItem } from "@/components/ui/ActivityTimeline";

<ActivityTimeline aria-label="Historial del turno">
  <ActivityTimelineItem emphasis="L" title="Trámite cerrado" meta="09:52 AM • Funcionaria: María López">
    Trámite de radicación finalizado exitosamente.
  </ActivityTimelineItem>
  <ActivityTimelineItem title="Turno generado" meta="09:12 AM • Sistema (Autoservicio)" />
</ActivityTimeline>`;
