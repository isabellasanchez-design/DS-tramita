import type { SpecGroup } from "@/components/doc/DocBlocks";
import type { TipPosition } from "@/components/ui/Tooltip";

export const tooltipDefinition =
  "Texto breve de ayuda que aparece al pasar el cursor o al llegar con el teclado a un elemento. Explica qué hace o qué significa, sin interrumpir la tarea.";

/** tip-position de Figma → prop tipPosition, y dónde queda el tooltip respecto al elemento. */
export const tooltipPositions: { figma: string; code: TipPosition; placement: string }[] = [
  { figma: "center bttm", code: "centerBottom", placement: "Encima, centrado" },
  { figma: "left bttm", code: "leftBottom", placement: "Encima, hacia la derecha" },
  { figma: "right bttm", code: "rightBottom", placement: "Encima, hacia la izquierda" },
  { figma: "center top", code: "centerTop", placement: "Debajo, centrado" },
  { figma: "left top", code: "leftTop", placement: "Debajo, hacia la derecha" },
  { figma: "right top", code: "rightTop", placement: "Debajo, hacia la izquierda" },
  { figma: "left", code: "left", placement: "A la derecha" },
  { figma: "right", code: "right", placement: "A la izquierda" },
];

export const tooltipPositionNote =
  "tip-position indica dónde está la flecha, no el tooltip: con la flecha abajo (center bttm) el tooltip aparece encima del elemento. Elegir la posición que no tape contenido importante ni se salga de la pantalla.";

export const tooltipAnatomy = [
  { number: 1, name: "Burbuja", detail: "Fondo #1c2057, radio 8px, padding 8px 12px, ancho máximo 290px." },
  { number: 2, name: "Texto", detail: "Roboto Regular 12px, interlineado 14px, blanco. Máximo dos líneas." },
  { number: 3, name: "Flecha", detail: "12×6px. Apunta al centro del elemento que activa el tooltip." },
];

export const tooltipSpecs: SpecGroup[] = [
  {
    element: "Burbuja",
    rows: [
      { name: "Fondo", value: "#1c2057" },
      { name: "Radio", value: "8px" },
      { name: "Padding", value: "8px 12px" },
      { name: "Ancho máximo", value: "290px" },
      { name: "Sombra", value: "0 6px 6px rgba(0,0,0,.05), 0 1px 2px rgba(0,0,0,.25)" },
    ],
  },
  {
    element: "Texto",
    rows: [
      { name: "Tipografía", value: "Roboto Regular 12px / 14px" },
      { name: "Color", value: "#ffffff (13,6:1 sobre #1c2057)" },
    ],
  },
  {
    element: "Flecha",
    rows: [
      { name: "Tamaño", value: "12 × 6px" },
      { name: "Distancia al borde", value: "20px (arriba/abajo) · 8px (left/right)" },
    ],
  },
];

export const tooltipUsage: string[] = [
  "Para explicar un ícono sin texto, una abreviatura o un dato que no cabe en la pantalla.",
  "El texto complementa: la tarea se debe poder completar sin leer el tooltip.",
  "Máximo dos líneas. Si hace falta más, usar un texto de ayuda visible o un Popup.",
  "Nunca poner botones, enlaces ni campos dentro: el tooltip no recibe foco.",
  "No usarlo como único medio para información crítica o errores: en celular no hay hover.",
];

export const tooltipAccessibility: string[] = [
  "Aparece con el mouse y con el foco del teclado; el elemento que lo activa debe ser enfocable (botón, enlace, campo).",
  "El elemento se conecta al texto con aria-describedby y la burbuja tiene role=\"tooltip\".",
  "Escape lo cierra sin mover el foco (WCAG 1.4.13).",
  "Se puede pasar el cursor sobre la burbuja sin que desaparezca (WCAG 1.4.13).",
  "Un botón solo con ícono necesita también aria-label: el tooltip describe, no nombra.",
];

export const tooltipReactUsage = `import { Tooltip } from "@/components/ui/Tooltip";

<Tooltip content="Descarga el comprobante en PDF" tipPosition="centerBottom">
  <Button variant="Tertiary" aria-label="Descargar" iconLeft={<DownloadSimpleIcon />} />
</Tooltip>`;
