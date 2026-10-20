import type { SpecGroup } from "@/components/doc/DocBlocks";

export const stepperDefinition =
  "Muestra en qué paso va la persona dentro de un proceso de varias etapas, como radicar una solicitud, y cuántos le faltan.";

export const stepperStates: { figma: string; meaning: string; visual: string }[] = [
  { figma: "Completed", meaning: "Paso terminado", visual: "Verde #28a44b con check; nombre #12331b." },
  { figma: "Current", meaning: "Paso actual", visual: "#23297b con el número en blanco; nombre Bold #1c2057." },
  { figma: "Active", meaning: "Paso pendiente", visual: "#e4e5f4 con el número #5c5d70; nombre #5c5d70." },
];

export const stepperSpecs: SpecGroup[] = [
  {
    element: "Paso",
    rows: [
      { name: "Ancho (Figma)", value: "192px; en código se reparten el ancho" },
      { name: "Círculo", value: "34px · número Roboto Bold 12px · check 20px" },
      { name: "Línea", value: "2px de grosor, del color del estado" },
      { name: "Nombre", value: "Roboto 12px, centrado, 4px bajo el círculo" },
    ],
  },
];

export const stepperContrastNote =
  "Accesibilidad pendiente: el círculo y la línea de los pasos pendientes (#e4e5f4) tienen 1,25:1 sobre blanco y no cumplen WCAG 1.4.11; el número sí se lee (5,17:1). Se corrige primero en Figma y luego en código, como una versión nueva.";

export const stepperUsage: string[] = [
  "Para procesos de 3 a 6 pasos en orden. Más pasos se vuelven difíciles de leer.",
  "Nombres cortos que digan qué se hace en cada paso.",
  "Siempre arriba del contenido del paso actual, en el mismo lugar en todo el proceso.",
  "Para secciones que se pueden visitar en cualquier orden usar Tabs, no Stepper.",
];

export const stepperAccessibility: string[] = [
  "Es una lista ordenada <ol> con nombre (\"Progreso del trámite\").",
  "El paso actual lleva aria-current=\"step\".",
  "Cada paso se anuncia completo: \"Paso 2 de 4, actual: Datos del solicitante\".",
  "El estado no depende solo del color: los completados tienen check y el actual va en negrita.",
];

export const stepperReactUsage = `import { Stepper } from "@/components/ui/Stepper";

<Stepper
  steps={["Tipo de solicitud", "Datos del solicitante", "Documentos", "Confirmación"]}
  current={1}
/>`;
