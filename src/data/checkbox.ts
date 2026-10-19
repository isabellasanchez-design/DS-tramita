import type { CssRule } from "@/lib/css";

export const checkboxTypeNames = ["Selected", "Unselected"] as const;

export const checkboxStateNames = [
  "Enabled",
  "Hovered",
  "Keyboardtab",
  "Pressed",
  "Disabled",
] as const;

export type CheckboxType = (typeof checkboxTypeNames)[number];
export type CheckboxState = (typeof checkboxStateNames)[number];

export type CheckboxStyle = {
  /** Fondo del Container (solo Selected). */
  bg?: string;
  border?: string;
  borderWidth: number;
  /** Fondo gris del área del Checkbox mientras se presiona. */
  pressed: boolean;
  checked: boolean;
};

// Variables de Figma (surface/interactive/secondary, border/brand, …)
export const checkboxColors = {
  secondary: "#1c2057",
  secondaryHover: "#121433",
  brand: "#2a32a2",
  neutral: "#d8d9de",
  focus: "#bb7d11",
};

const c = checkboxColors;

const styleByTypeAndState: Record<CheckboxType, Record<CheckboxState, Omit<CheckboxStyle, "checked">>> = {
  Selected: {
    Enabled: { bg: c.secondary, borderWidth: 0, pressed: false },
    Hovered: { bg: c.secondaryHover, borderWidth: 0, pressed: false },
    Keyboardtab: { bg: c.secondary, border: c.focus, borderWidth: 2, pressed: false },
    Pressed: { bg: c.secondary, borderWidth: 0, pressed: true },
    Disabled: { bg: c.neutral, borderWidth: 0, pressed: false },
  },
  Unselected: {
    Enabled: { border: c.brand, borderWidth: 1, pressed: false },
    Hovered: { border: c.secondaryHover, borderWidth: 1, pressed: false },
    Keyboardtab: { border: c.focus, borderWidth: 2, pressed: false },
    Pressed: { border: c.brand, borderWidth: 1, pressed: true },
    Disabled: { border: c.neutral, borderWidth: 1, pressed: false },
  },
};

export function getCheckboxStyle(type: CheckboxType, state: CheckboxState): CheckboxStyle {
  return { ...styleByTypeAndState[type][state], checked: type === "Selected" };
}

export const checkboxDefinition =
  "Control de selección que permite al usuario elegir una o más opciones de un conjunto, activar/desactivar un ítem, o marcar sub-selecciones dentro de una lista.";

export const checkboxTypeInfo: Record<CheckboxType, string> = {
  Selected: "Container con fondo #1C2057 y el ícono Check en blanco.",
  Unselected: "Container vacío con borde de 1px #2A32A2.",
};

export const checkboxStateInfo: { status: CheckboxState; when: string }[] = [
  { status: "Enabled", when: "Estado natural, en reposo." },
  { status: "Hovered", when: "Al pasar el cursor por encima (desktop)." },
  {
    status: "Keyboardtab",
    when: "Al navegar con teclado (Tab) — borde naranja/warning visible, crítico para accesibilidad.",
  },
  { status: "Pressed", when: "Durante el clic/tap." },
  { status: "Disabled", when: "Cuando la opción no está disponible para marcar en ese contexto." },
];

export const checkboxUsage = {
  title: "Cuándo usar Checkbox (vs. Radio Button)",
  detail:
    "Checkbox = selección múltiple o independiente (el usuario puede marcar varias opciones a la vez, o activar/desactivar un solo ítem sin afectar a otros). Ej: aceptar términos y condiciones, seleccionar varios documentos de una lista, marcar tareas completadas.",
};

export const checkboxAccessibility: string[] = [
  "Cada checkbox necesita una etiqueta visible asociada al input (<label>), y hacer clic en la etiqueta también debe marcarlo.",
  "Usar el <input type=\"checkbox\"> nativo: así funciona con la barra espaciadora y los lectores de pantalla anuncian su estado sin ARIA adicional.",
  "No quitar el borde de foco (Keyboardtab); es la única señal de dónde está el usuario al navegar con teclado.",
  "Cuando varios checkbox responden a una misma pregunta, agruparlos en un <fieldset> con su <legend>.",
  "Disabled no debe ser la única forma de explicar una restricción: indicar en texto por qué la opción no está disponible.",
];

export const checkboxAnatomy = [
  {
    number: 1,
    name: "Checkbox",
    detail: "Área del control · 27.2 × 27.5px · padding 3px en los cuatro lados.",
  },
  {
    number: 2,
    name: "Container",
    detail: "Caja de selección · 18 × 18px · radio 4px.",
  },
  {
    number: 3,
    name: "Check",
    detail: "Ícono Check · Formato Outline · Peso Regular · 16px. Solo visible en Selected.",
  },
];

export const checkboxSpecs: { element: string; rows: { name: string; value: string }[] }[] = [
  {
    element: "Checkbox",
    rows: [
      { name: "Dirección", value: "Horizontal" },
      { name: "Alineación", value: "Centro" },
      { name: "Ajuste vertical", value: "Fill" },
      { name: "Ajuste horizontal", value: "Fill" },
      { name: "Padding", value: "3px" },
    ],
  },
  {
    element: "Container",
    rows: [
      { name: "Tamaño", value: "18 × 18px" },
      { name: "Radio", value: "4px" },
      { name: "Borde", value: "1px (Unselected) · 2px (Keyboardtab)" },
      { name: "Ajuste vertical", value: "Fixed" },
      { name: "Ajuste horizontal", value: "Fill" },
    ],
  },
];

export const checkboxCssRules: CssRule[] = [
  {
    selector: ".checkbox",
    lines: [
      { property: "appearance", value: "none" },
      { property: "width", value: "18px" },
      { property: "height", value: "18px" },
      { property: "margin", value: "3px" },
      { property: "border", value: `1px solid ${c.brand}` },
      { property: "border-radius", value: "4px" },
      { property: "background-color", value: "transparent" },
      { property: "cursor", value: "pointer" },
    ],
  },
  { selector: ".checkbox:hover", lines: [{ property: "border-color", value: c.secondaryHover }] },
  {
    selector: ".checkbox:checked",
    lines: [
      { property: "border-color", value: c.secondary },
      { property: "background", value: `${c.secondary} url("check.svg") center / 16px no-repeat` },
    ],
  },
  {
    selector: ".checkbox:checked:hover",
    lines: [
      { property: "border-color", value: c.secondaryHover },
      { property: "background-color", value: c.secondaryHover },
    ],
  },
  {
    selector: ".checkbox:focus-visible",
    lines: [
      { property: "outline", value: `2px solid ${c.focus}` },
      { property: "outline-offset", value: "-2px" },
    ],
  },
  { selector: ".checkbox:active", lines: [{ property: "box-shadow", value: `0 0 0 3px ${c.neutral}` }] },
  {
    selector: ".checkbox:disabled",
    lines: [
      { property: "border-color", value: c.neutral },
      { property: "cursor", value: "not-allowed" },
    ],
  },
  { selector: ".checkbox:checked:disabled", lines: [{ property: "background-color", value: c.neutral }] },
];

export const checkboxHtml = `<label class="checkbox-field">
  <input type="checkbox" class="checkbox" name="terminos" />
  Acepto los términos y condiciones
</label>`;
