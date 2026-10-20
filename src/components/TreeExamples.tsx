"use client";

import { TreeView, type TreeItem } from "@/components/ui/TreeView";

const plan: TreeItem[] = [
  {
    id: "ap-01",
    code: "AP-01",
    title: "Gobernanza",
    description: "Consolidar una gestión pública eficiente, transparente y cercana a la ciudadanía.",
    children: [
      {
        id: "ej-01",
        code: "EJ-01",
        title: "Fortalecimiento institucional",
        description: "Mejorar la gestión institucional y los servicios de atención.",
        children: [
          {
            id: "ip-01",
            code: "IP-01",
            title: "Avanzando hacia el mejoramiento de los trámites",
            description: "Mejorar la gestión institucional con trámites en línea.",
            children: [
              { id: "in-01", code: "IN-01", title: "Trámites disponibles en línea", description: "Creciente · Línea base 62 · Meta 90" },
              { id: "in-02", code: "IN-02", title: "Tiempo promedio de respuesta", description: "Decreciente · Línea base 15 días · Meta 8 días" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ap-02",
    code: "AP-02",
    title: "Educación",
    description: "Ampliar la cobertura y la calidad de la educación.",
    children: [{ id: "ej-02", code: "EJ-02", title: "Cobertura neta en educación media", description: "Creciente · Línea base 62 · Meta 75" }],
  },
];

export function TreeDemo() {
  return <TreeView aria-label="Plan de desarrollo" items={plan} defaultExpanded={["ap-01", "ej-01"]} />;
}

/** Vista del componente: todos los niveles abiertos. */
export function TreePreview() {
  return <TreeView aria-label="Plan de desarrollo" items={plan} defaultExpanded={["ap-01", "ej-01", "ip-01", "ap-02"]} />;
}
