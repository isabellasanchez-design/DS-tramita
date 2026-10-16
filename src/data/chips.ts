import type { CssRule } from "@/lib/css";

export const chipStateNames = ["Default", "Hover", "Select", "Disabled"] as const;
export type ChipState = (typeof chipStateNames)[number];

export type ChipStyle = {
  bg: string;
  border?: string;
  text: string;
  bold: boolean;
};

// Variables de Figma: surface/default, neutral/0x, primary/02, brand/navy, text/secondary.
export const chipStyles: Record<ChipState, ChipStyle> = {
  Default: { bg: "#ffffff", border: "#ebebed", text: "#484956", bold: false },
  Hover: { bg: "#c9ccee", text: "#484956", bold: false },
  Select: { bg: "#1a1f6b", text: "#ffffff", bold: true },
  Disabled: { bg: "#ebebed", border: "#f6f6f7", text: "#b9bac5", bold: false },
};

/** Color del ícono de ejemplo (Circle) en Figma; no cambia con el estado. */
export const chipIconColor = "#5c5d70";

export const chipDefinition =
  "Elemento compacto y seleccionable usado para filtrar, etiquetar o mostrar opciones de selección de forma visual y espacialmente eficiente. A diferencia del Button, no dispara una acción inmediata — representa una opción que se activa/desactiva (selección única o múltiple).";

export const chipStateInfo: { status: ChipState; visual: string; when: string }[] = [
  {
    status: "Default",
    visual: "Fondo blanco, borde gris claro (neutral/01), texto gris secundario.",
    when: "Estado inicial de un chip no seleccionado — la opción está disponible pero no elegida (ej: filtro disponible antes de aplicarlo).",
  },
  {
    status: "Hover",
    visual: "Fondo tenue (primary/02).",
    when: "Al pasar el cursor, indica que el chip es interactivo (desktop).",
  },
  {
    status: "Select",
    visual: "Fondo azul marino sólido (brand/navy), texto blanco en negrita.",
    when: 'Cuando el usuario seleccionó esa opción — es el estado "activo" (ej: filtro aplicado, categoría elegida, talla seleccionada).',
  },
  {
    status: "Disabled",
    visual: "Fondo gris claro (neutral/01), texto gris apagado (neutral/03).",
    when: "Cuando la opción existe pero no está disponible para elegir en ese contexto (ej: un filtro que no aplica a los resultados actuales, una talla sin stock).",
  },
];

export const chipStateRule =
  "Regla rápida: Default → Hover → Select es el flujo normal de interacción. Disabled es la excepción, para opciones visibles pero no aplicables.";

export const chipTypicalUse: string[] = [
  "Filtros de búsqueda o listados (ej: filtrar trámites por estado, categoría o fecha).",
  "Tags de categorización (ej: mostrar el tipo de documento o etiqueta asociada a un ítem).",
  'Selección de opciones tipo "chip group" — ya sea de selección única (como radio buttons) o múltiple (como checkboxes), dependiendo del contexto (ej: elegir talla, tipo de trámite, sede).',
];

export const chipVsButton = {
  columns: ["", "Chip", "Button"],
  rows: [
    ["Función", "Representa una opción que se selecciona/deselecciona", "Dispara una acción o navegación"],
    ["Estado persistente", 'Sí — queda "activo" visualmente mientras esté seleccionado', "No — vuelve a Default después de la interacción"],
    ["Cuándo usarlo", "Filtros, tags, selección de opciones", "Enviar, confirmar, cancelar, navegar"],
  ],
};

export const chipBestPractices: string[] = [
  "Agrupar Chips relacionados en una fila o grid con scroll horizontal si no caben en el ancho disponible — no apilar ni truncar el texto.",
  "Indicar claramente si la selección es única o múltiple con el comportamiento (ej: en selección única, elegir un Chip deselecciona automáticamente el anterior).",
  'No usar Chip para acciones (eso es rol del Button) — si el clic dispara algo que no es "activar/desactivar una opción", no es un Chip.',
  "Disabled debe seguir siendo legible, aunque no interactuable — el usuario debe poder leer qué opción existe aunque no pueda elegirla.",
];

export const chipAccessibility: string[] = [
  "Construir cada chip sobre un input nativo (checkbox para selección múltiple, radio para única) dentro de un <fieldset> con <legend>; así el estado seleccionado se anuncia sin ARIA adicional.",
  "El foco debe ser visible al navegar con teclado; Figma no define un estado de foco para Chip, por eso aquí se usa el mismo borde naranja (#BB7D11) de Checkbox y Radio.",
  "El estado Select no debe depender solo del color: el texto pasa a negrita, lo que ayuda a distinguirlo.",
];

export const chipAnatomy = [
  { number: 1, name: "Chip", detail: "Contenedor · radio 20px · ancho según el contenido." },
  { number: 2, name: "Ícono (opcional)", detail: "Propiedad booleana Show icon (activa por defecto) · 16px · Formato Outline · Peso Fill." },
  { number: 3, name: "Chip name", detail: "Texto · Roboto 14px (Regular; Bold en Select)." },
];

export const chipSpecs = [
  {
    element: "Chip",
    rows: [
      { name: "Dirección", value: "Horizontal" },
      { name: "Alineación", value: "Centro" },
      { name: "Ajuste", value: "Hug × Hug" },
      { name: "Espacio entre elementos", value: "4px" },
      { name: "Padding vertical", value: "8px" },
      { name: "Padding horizontal", value: "20px" },
      { name: "Radio", value: "20px" },
      { name: "Borde", value: "1px (Default y Disabled)" },
    ],
  },
];

export const chipCssRules: CssRule[] = [
  {
    selector: ".chip",
    lines: [
      { property: "display", value: "inline-flex" },
      { property: "align-items", value: "center" },
      { property: "gap", value: "4px" },
      { property: "padding", value: "8px 20px" },
      { property: "border", value: "1px solid #ebebed" },
      { property: "border-radius", value: "20px" },
      { property: "background-color", value: "#ffffff" },
      { property: "color", value: "#484956" },
      { property: "font", value: "400 14px 'Roboto', sans-serif" },
      { property: "cursor", value: "pointer" },
    ],
  },
  { selector: ".chip:hover", lines: [{ property: "background-color", value: "#c9ccee" }, { property: "border-color", value: "#c9ccee" }] },
  {
    selector: ".chip:has(:checked)",
    lines: [
      { property: "background-color", value: "#1a1f6b" },
      { property: "border-color", value: "#1a1f6b" },
      { property: "color", value: "#ffffff" },
      { property: "font-weight", value: "700" },
    ],
  },
  { selector: ".chip:has(:focus-visible)", lines: [{ property: "outline", value: "2px solid #bb7d11" }, { property: "outline-offset", value: "2px" }] },
  {
    selector: ".chip:has(:disabled)",
    lines: [
      { property: "background-color", value: "#ebebed" },
      { property: "border-color", value: "#f6f6f7" },
      { property: "color", value: "#b9bac5" },
      { property: "cursor", value: "not-allowed" },
    ],
  },
];

export const chipHtml = `<fieldset>
  <legend>Filtrar por estado</legend>
  <label class="chip">
    <input type="checkbox" class="visually-hidden" name="estado" value="en-revision" />
    En revisión
  </label>
  <label class="chip">
    <input type="checkbox" class="visually-hidden" name="estado" value="aprobado" />
    Aprobado
  </label>
</fieldset>`;
