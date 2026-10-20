import type { SpecGroup } from "@/components/doc/DocBlocks";

export const treeDefinition =
  "Lista jerárquica que se abre por niveles, para estructuras como un plan de desarrollo (apuesta, eje, programa, indicador) o un catálogo de trámites por categoría.";

export const treeLevels: { figma: string; icon: string; indent: string; bg: string }[] = [
  { figma: "Nivel 00-cerrado / abierto", icon: "Target", indent: "16px", bg: "Blanco (radio 8px cerrado)" },
  { figma: "Nivel 02", icon: "Signpost", indent: "56px", bg: "#f6f6f7" },
  { figma: "Nivel 03", icon: "Files", indent: "80px", bg: "#f6f6f7" },
  { figma: "Nivel 04", icon: "Flag", indent: "104px", bg: "#f6f6f7" },
];

export const treeSpecs: SpecGroup[] = [
  {
    element: "Fila",
    rows: [
      { name: "Padding", value: "8px vertical · 16px derecha · sangría según nivel" },
      { name: "Caret e ícono", value: "16px · #333dcc · 8px entre sí" },
      { name: "Código", value: "Roboto 14px · #484956" },
      { name: "Título", value: "Roboto 14px · #202025" },
      { name: "Descripción", value: "Roboto 12px · #424242" },
    ],
  },
];

export const treeNote =
  "Pendiente en Figma: el caret es CaretUp tanto abierto como cerrado, así que no indica el estado; y no hay estados Hover ni Focus (el código usa el foco del navegador). El estado sí se anuncia con aria-expanded.";

export const treeUsage: string[] = [
  "Para jerarquías de 2 a 5 niveles donde importa ver la relación padre–hijo.",
  "Cada fila con código corto y un título claro; la descripción es opcional.",
  "Abrir por defecto solo el primer nivel o la rama relevante.",
  "Para listas planas usar una Tabla; para pasos en orden, un Stepper.",
];

export const treeAccessibility: string[] = [
  "Patrón de árbol de WAI-ARIA: role=\"tree\", \"treeitem\" con aria-level y aria-expanded, y \"group\" para los hijos.",
  "Solo una fila está en el orden de Tab; las demás se recorren con flechas.",
  "Teclado: arriba/abajo para moverse, derecha abre o baja al hijo, izquierda cierra o sube al padre, Inicio y Fin, Enter o Espacio abre y cierra.",
];

export const treeReactUsage = `import { TreeView } from "@/components/ui/TreeView";

<TreeView
  aria-label="Plan de desarrollo"
  defaultExpanded={["ap-01"]}
  items={[
    {
      id: "ap-01",
      code: "AP-01",
      title: "Gobernanza",
      description: "Consolidar una gestión pública eficiente y transparente.",
      children: [{ id: "ej-01", code: "EJ-01", title: "Fortalecimiento institucional" }],
    },
  ]}
/>`;
