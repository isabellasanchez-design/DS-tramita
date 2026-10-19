import type { CssRule } from "@/lib/css";

export const tagCaseNames = ["Success", "Error", "Pending Info", "Waiting", "Warning", "Marca"] as const;
export const tagTypeNames = ["Filled", "Contrast", "Text", "Edge"] as const;
// Nombres tal como están en las variantes de Figma: XS = 27px / 16px, S = 22px / 12px.
export const tagSizeNames = ["XS", "S"] as const;

export type TagCase = (typeof tagCaseNames)[number];
export type TagType = (typeof tagTypeNames)[number];
export type TagSize = (typeof tagSizeNames)[number];

type CaseColors = {
  /** Fondo de Filled. */
  subtle: string;
  /** Fondo de Contrast. */
  solid: string;
  /** Texto e íconos de Filled, Text y Edge. */
  text: string;
  /** Texto e íconos de Contrast. */
  onSolid: string;
  /** Borde de Edge. */
  edge: string;
};

// Variables de Figma por caso semántico.
export const tagCaseColors: Record<TagCase, CaseColors> = {
  Success: { subtle: "#e4f4e8", solid: "#28a44b", text: "#12331b", onSolid: "#f3f9f5", edge: "#28a44b" },
  Error: { subtle: "#f6e1e2", solid: "#e31c23", text: "#b4181d", onSolid: "#faf2f3", edge: "#e31c23" },
  "Pending Info": { subtle: "#e2ebf6", solid: "#1e5cae", text: "#1e5cae", onSolid: "#f3f6fa", edge: "#1e5cae" },
  Waiting: { subtle: "#ebebed", solid: "#9496a8", text: "#5c5d70", onSolid: "#ffffff", edge: "#73748c" },
  Warning: { subtle: "#f7efe0", solid: "#bb7d11", text: "#c2410c", onSolid: "#faf7f2", edge: "#ec9c13" },
  Marca: {
    subtle: "linear-gradient(72deg, rgba(74,209,111,0.2) 0%, rgba(26,31,107,0.2) 91.6%)",
    solid: "linear-gradient(72deg, #4ad16f 0%, #1a1f6b 91.6%)",
    text: "#2a32a2",
    onSolid: "#fdfcff",
    edge: "#4ad16f",
  },
};

export type TagStyle = { background?: string; border?: string; color: string; pill: boolean };

export function getTagStyle(tagCase: TagCase, type: TagType): TagStyle {
  const c = tagCaseColors[tagCase];
  switch (type) {
    case "Filled":
      return { background: c.subtle, color: c.text, pill: true };
    case "Contrast":
      return { background: c.solid, color: c.onSolid, pill: true };
    case "Text":
      return { color: c.text, pill: false };
    case "Edge":
      return { border: c.edge, color: c.text, pill: true };
  }
}

export const tagSizeSpecs: Record<TagSize, { height: number; fontSize: number; icon: number; paddingX: number; paddingY: number }> = {
  XS: { height: 27, fontSize: 16, icon: 16, paddingX: 8, paddingY: 4 },
  S: { height: 22, fontSize: 12, icon: 12, paddingX: 4, paddingY: 4 },
};

export const tagDefinition =
  "Tag es un elemento visual pequeño y no interactivo — a diferencia del Button, no dispara ninguna acción. Se usa para clasificar, etiquetar o mostrar el estado de un elemento dentro de la interfaz (una fila de tabla, una tarjeta, un ítem de lista).";

export const tagCaseInfo: { tagCase: TagCase; color: string; when: string }[] = [
  { tagCase: "Success", color: "Verde", when: 'Confirmar que algo se completó correctamente (ej: "Aprobado", "Pago confirmado").' },
  { tagCase: "Error", color: "Rojo", when: 'Señalar un problema, fallo o rechazo (ej: "Rechazado", "Documento inválido").' },
  { tagCase: "Pending Info", color: "Azul", when: 'Información neutra, en curso o en revisión (ej: "En revisión", "Pendiente").' },
  { tagCase: "Waiting", color: "Gris", when: 'Estado neutro/inactivo, sin urgencia (ej: "Sin iniciar", "En cola").' },
  { tagCase: "Warning", color: "Naranja/ámbar", when: 'Alertar sobre algo que requiere atención sin ser un error (ej: "Por vencer").' },
  {
    tagCase: "Marca",
    color: "Degradado verde→azul marca",
    when: 'Uso muy restringido — no es un estado semántico. Solo para resaltar algo relacionado con la marca o el producto (ej: "Nuevo", "Beta", "Recomendado"), nunca para comunicar el estado de un trámite. Si dudas entre Marca y otro caso, casi siempre es el caso equivocado.',
  },
];

export const tagMarcaNote =
  'Nota sobre Marca: es el único caso con fondo degradado (los demás son colores sólidos/planos) — visualmente ya se distingue como "especial", lo cual refuerza que debe sentirse como una excepción, no como una opción más del mismo nivel que Success/Error/etc.';

export const tagTypeInfo: { type: TagType; visual: string; when: string }[] = [
  { type: "Filled", visual: "Fondo sutil/pastel, texto en el color semántico", when: "Uso por defecto — visible sin ser agresivo. Funciona bien en tablas y listas." },
  { type: "Contrast", visual: "Fondo sólido con el color completo, texto blanco", when: "Cuando el tag necesita destacar más (ej. único protagonista en una tarjeta)." },
  { type: "Text", visual: "Sin fondo, solo texto de color", when: "Contextos muy compactos (celdas angostas) o con mucho ruido visual alrededor." },
  { type: "Edge", visual: "Sin fondo, borde de color", when: "Cuando el tag va sobre una imagen o fondo de color y necesita despegarse." },
];

export const tagSizeNote =
  "La altura no se puede modificar y debe respetarse siempre, sin importar si el Tag tiene 0, 1 o 2 íconos activos, o si el label es corto o largo. El único eje que crece o se achica con el contenido es el ancho.";

export const tagIconInfo = {
  intro:
    "Ambos son propiedades booleanas independientes — el Tag puede mostrarse en 4 combinaciones: sin ícono, solo izquierdo, solo derecho, o con los dos. El gap entre ícono(s) y texto (4px) lo resuelve el auto layout automáticamente sin importar cuántos íconos estén activos.",
  rows: [
    ["icon-left (izquierda)", "Opción por defecto. El ícono antecede al texto y refuerza visualmente el significado del Case — el ojo lee primero el símbolo y luego confirma con el texto."],
    ["icon-right (derecha)", "Uso puntual, casi siempre acompañando al izquierdo, no solo. En componentes interactivos, un ícono al final suele indicar una acción secundaria (quitar, expandir) — pero como el Tag no es interactivo, esa razón no aplica acá. Úsalo solo para un efecto decorativo simétrico (ícono-texto-ícono)."],
  ],
  rule: "Regla práctica: evita activar icon-right sin icon-left — se vería como una inconsistencia sin justificación. Un solo ícono a la izquierda alcanza en la mayoría de los casos.",
};

export const tagBestPractices: string[] = [
  "Los tags no son interactivos — si necesitas que el usuario pueda hacer clic, eso es un Button o un Chip, no un Tag.",
  "Marca se usa con moderación — solo para momentos de branding puntuales, nunca para estado.",
  "Mantén el mismo Case para el mismo significado en toda la app (no uses Warning en una pantalla y Pending Info en otra para el mismo estado).",
  "Un solo tag por elemento cuando sea posible — varios tags juntos generan ruido visual.",
  "La altura del Tag es fija — nunca se ajusta manualmente.",
];

export const tagAccessibility: string[] = [
  "El color no puede ser la única forma de comunicar el estado: el texto del tag debe nombrarlo (\"Rechazado\", no solo un tag rojo).",
  "Como el Tag no es interactivo, no debe recibir foco ni llevar role=\"button\"; es un <span> dentro del contenido.",
  "Los íconos son decorativos (aria-hidden): el significado lo lleva el texto.",
];

export const tagAnatomy = [
  { number: 1, name: "Tag", detail: "Contenedor · alto fijo · radio 100 (Text no tiene fondo ni borde)." },
  { number: 2, name: "icon-left (opcional)", detail: "Ícono CheckCircle por defecto · Formato Outline · Peso Regular · 16px (XS) / 12px (S)." },
  { number: 3, name: "Label", detail: "Texto · 16px (XS) / 12px (S)." },
  { number: 4, name: "icon-right (opcional)", detail: "Mismo ícono y tamaño que icon-left." },
];

export const tagSpecs = [
  {
    element: "Tag",
    rows: [
      { name: "Dirección", value: "Horizontal" },
      { name: "Alineación", value: "Centro" },
      { name: "Espacio entre elementos", value: "4px" },
      { name: "Alto XS / S", value: "27px / 22px" },
      { name: "Padding XS", value: "4px 8px" },
      { name: "Padding S", value: "4px" },
      { name: "Radio", value: "100 (píldora)" },
      { name: "Borde (Edge)", value: "1px" },
    ],
  },
];

export const tagCssRules: CssRule[] = [
  {
    selector: ".tag",
    lines: [
      { property: "display", value: "inline-flex" },
      { property: "align-items", value: "center" },
      { property: "gap", value: "4px" },
      { property: "height", value: "27px" },
      { property: "padding", value: "4px 8px" },
      { property: "border-radius", value: "100px" },
      { property: "font", value: "400 16px 'Roboto', sans-serif" },
      { property: "white-space", value: "nowrap" },
    ],
  },
  { selector: ".tag--s", lines: [{ property: "height", value: "22px" }, { property: "padding", value: "4px" }, { property: "font-size", value: "12px" }] },
  { selector: ".tag--success.tag--filled", lines: [{ property: "background", value: "#e4f4e8" }, { property: "color", value: "#12331b" }] },
  { selector: ".tag--success.tag--contrast", lines: [{ property: "background", value: "#28a44b" }, { property: "color", value: "#f3f9f5" }] },
  { selector: ".tag--success.tag--text", lines: [{ property: "color", value: "#12331b" }] },
  { selector: ".tag--success.tag--edge", lines: [{ property: "border", value: "1px solid #28a44b" }, { property: "color", value: "#12331b" }] },
];

export const tagHtml = `<span class="tag tag--success tag--filled">
  <svg aria-hidden="true"><!-- CheckCircle --></svg>
  Aprobado
</span>`;
