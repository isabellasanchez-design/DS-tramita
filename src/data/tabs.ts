import type { SpecGroup } from "@/components/doc/DocBlocks";

export const tabsDefinition =
  "Pestañas para alternar entre secciones relacionadas de una misma pantalla sin salir de ella, por ejemplo los datos, documentos e historial de una solicitud.";

export const tabsStates: { figma: string; when: string }[] = [
  { figma: "Select", when: "La pestaña activa: su panel es el que se muestra. Solo una a la vez." },
  { figma: "default", when: "Las demás pestañas." },
];

export const tabsSpecs: SpecGroup[] = [
  {
    element: "Pestaña",
    rows: [
      { name: "Alto", value: "51px" },
      { name: "Padding vertical", value: "16px" },
      { name: "Ancho", value: "Se reparten el ancho disponible" },
      { name: "Texto", value: "Roboto 16px, centrado" },
    ],
  },
  {
    element: "Estados",
    rows: [
      { name: "Select", value: "Bold #2a32a2 · línea inferior 4px #2a32a2" },
      { name: "default", value: "Regular #5c5d70 · línea inferior 1px #d8d9de" },
    ],
  },
];

export const tabsFocusNote =
  "Figma no define un estado de foco para las pestañas; el código usa el indicador por defecto del navegador. Conviene diseñarlo para que sea consistente con el resto del D.S.";

export const tabsUsage: string[] = [
  "Para 2 a 5 secciones del mismo nivel que no hace falta ver al mismo tiempo.",
  "Etiquetas cortas, de una o dos palabras, que digan qué hay en cada sección.",
  "No usarlas para pasos de un proceso en orden: para eso está el Stepper.",
  "No usarlas como navegación entre páginas distintas.",
];

export const tabsAccessibility: string[] = [
  "Sigue el patrón de pestañas de WAI-ARIA: role=\"tablist\", \"tab\" y \"tabpanel\", con aria-selected y aria-controls.",
  "Con teclado: Tab entra a la pestaña activa, las flechas izquierda/derecha cambian de pestaña, Inicio y Fin van a la primera y la última, y Tab de nuevo entra al panel.",
  "Si no hay un título visible encima, darle un aria-label al grupo.",
  "La pestaña activa no depende solo del color: también cambia el grosor de la línea y del texto.",
];

export const tabsReactUsage = `import { Tab, Tabs } from "@/components/ui/Tabs";

<Tabs aria-label="Detalle de la solicitud">
  <Tab label="Datos">…</Tab>
  <Tab label="Documentos">…</Tab>
  <Tab label="Historial">…</Tab>
</Tabs>`;
