import type { CssRule } from "@/lib/css";

export const switchSelectedNames = ["Yes", "No"] as const;
export const switchStateNames = ["Enabled", "Hovered", "Keyboardtab", "Pressed", "Disabled"] as const;

export type SwitchSelected = (typeof switchSelectedNames)[number];
export type SwitchState = (typeof switchStateNames)[number];

export type SwitchStyle = {
  track: string;
  handle: string;
  icon: string;
  /** El Handle crece de 18px a 24px mientras se presiona. */
  handleSize: number;
  focus: boolean;
  on: boolean;
};

// Variables de Figma: surface/interactive/action*, neutral/0x, border/warning.
export const switchColors = {
  action: "#30cf5d",
  actionHover: "#28a44b",
  actionPressed: "#227c3c",
  neutral04: "#9496a8",
  neutral05: "#73748c",
  neutral06: "#5c5d70",
  disabled: "#d8d9de",
  handleOn: "#f3f9f5",
  handleOff: "#f6f6f7",
  focus: "#bb7d11",
};

const c = switchColors;

const styles: Record<SwitchSelected, Record<SwitchState, Omit<SwitchStyle, "on">>> = {
  Yes: {
    Enabled: { track: c.action, handle: c.handleOn, icon: c.actionHover, handleSize: 18, focus: false },
    Hovered: { track: c.actionHover, handle: c.handleOn, icon: c.actionPressed, handleSize: 18, focus: false },
    Keyboardtab: { track: c.action, handle: c.handleOn, icon: c.actionHover, handleSize: 18, focus: true },
    Pressed: { track: c.actionPressed, handle: c.handleOn, icon: c.actionPressed, handleSize: 24, focus: false },
    Disabled: { track: c.disabled, handle: "#ffffff", icon: c.disabled, handleSize: 18, focus: false },
  },
  No: {
    Enabled: { track: c.neutral04, handle: c.handleOff, icon: c.neutral04, handleSize: 18, focus: false },
    Hovered: { track: c.neutral05, handle: c.handleOff, icon: c.neutral05, handleSize: 18, focus: false },
    Keyboardtab: { track: c.neutral04, handle: c.handleOff, icon: c.neutral04, handleSize: 18, focus: true },
    Pressed: { track: c.neutral06, handle: c.handleOff, icon: c.neutral06, handleSize: 24, focus: false },
    Disabled: { track: c.disabled, handle: "#ffffff", icon: c.disabled, handleSize: 18, focus: false },
  },
};

export function getSwitchStyle(selected: SwitchSelected, state: SwitchState): SwitchStyle {
  return { ...styles[selected][state], on: selected === "Yes" };
}

export const switchDefinition =
  "Control que permite activar o desactivar una configuración binaria (On/Off). A diferencia del Checkbox, el cambio se aplica de inmediato, sin necesidad de un botón de confirmación adicional.";

export const switchStateInfo: { status: SwitchState; when: string }[] = [
  { status: "Enabled", when: "Estado natural, en reposo." },
  { status: "Hovered", when: "Al pasar el cursor por encima (desktop)." },
  { status: "Keyboardtab", when: "Al navegar con teclado — borde de foco visible." },
  { status: "Pressed", when: "Durante el clic/tap, en el momento de cambiar de estado." },
  { status: "Disabled", when: "Cuando la configuración no puede modificarse en ese contexto." },
];

export const switchVsCheckbox = {
  columns: ["", "Switch", "Checkbox"],
  rows: [
    ["Aplicación del cambio", "Inmediata — no requiere confirmación", 'Puede requerir un botón "Guardar" adicional según el formulario'],
    ["Tipo de opción", "Configuración binaria (On/Off)", "Selección de una o varias opciones de una lista"],
    ["Ejemplo", "Activar notificaciones, modo oscuro", "Aceptar términos, seleccionar documentos"],
  ],
  rule: "Regla rápida: si el cambio debe aplicarse al instante → Switch. Si el cambio forma parte de un formulario que se envía o guarda después → Checkbox.",
};

export const switchAccessibility: string[] = [
  'Usar role="switch" sobre el input nativo (o un <button> con aria-checked) para que los lectores de pantalla anuncien "activado / desactivado".',
  "La etiqueta debe describir la configuración, no la acción: \"Notificaciones por correo\", no \"Activar notificaciones\".",
  "Como el cambio es inmediato, confirmar el resultado cuando tenga efectos visibles en otra parte de la pantalla (por ejemplo, con un mensaje en una región aria-live).",
  "El ícono Check/X refuerza el estado sin depender solo del color.",
];

export const switchAnatomy = [
  { number: 1, name: "Switch", detail: "Pista · 48 × 24px · radio 100 (píldora)." },
  { number: 2, name: "Handle Container", detail: "24 × 24px · se alinea a la derecha en Yes y a la izquierda en No." },
  { number: 3, name: "Check / X", detail: "Ícono Check (Yes) o X (No) · Formato Outline · Peso Bold · 18px." },
  { number: 4, name: "Handle", detail: "Círculo de 18px (24px mientras se presiona)." },
];

export const switchSpecs = [
  {
    element: "Switch",
    rows: [
      { name: "Tamaño", value: "48 × 24px" },
      { name: "Radio", value: "100 (píldora)" },
      { name: "Dirección", value: "Horizontal" },
      { name: "Alineación", value: "Centro derecha (Yes) · centro izquierda (No)" },
      { name: "Ajuste", value: "Fixed × Fixed" },
      { name: "Borde de foco", value: "2px #BB7D11" },
    ],
  },
  {
    element: "Handle Container",
    rows: [
      { name: "Tamaño", value: "24 × 24px" },
      { name: "Handle", value: "18px · 24px en Pressed" },
      { name: "Ícono", value: "18px · Bold" },
    ],
  },
];

export const switchCssRules: CssRule[] = [
  {
    selector: ".switch",
    lines: [
      { property: "appearance", value: "none" },
      { property: "position", value: "relative" },
      { property: "width", value: "48px" },
      { property: "height", value: "24px" },
      { property: "border-radius", value: "100px" },
      { property: "background-color", value: c.neutral04 },
      { property: "cursor", value: "pointer" },
    ],
  },
  {
    selector: ".switch::before",
    lines: [
      { property: "content", value: '""' },
      { property: "position", value: "absolute" },
      { property: "top", value: "3px" },
      { property: "left", value: "3px" },
      { property: "width", value: "18px" },
      { property: "height", value: "18px" },
      { property: "border-radius", value: "50%" },
      { property: "background-color", value: c.handleOff },
      { property: "transition", value: "transform 150ms" },
    ],
  },
  { selector: ".switch:hover", lines: [{ property: "background-color", value: c.neutral05 }] },
  { selector: ".switch:active", lines: [{ property: "background-color", value: c.neutral06 }] },
  { selector: ".switch:checked", lines: [{ property: "background-color", value: c.action }] },
  {
    selector: ".switch:checked::before",
    lines: [
      { property: "transform", value: "translateX(24px)" },
      { property: "background-color", value: c.handleOn },
    ],
  },
  { selector: ".switch:checked:hover", lines: [{ property: "background-color", value: c.actionHover }] },
  { selector: ".switch:checked:active", lines: [{ property: "background-color", value: c.actionPressed }] },
  {
    selector: ".switch:focus-visible",
    lines: [
      { property: "outline", value: `2px solid ${c.focus}` },
      { property: "outline-offset", value: "-2px" },
    ],
  },
  { selector: ".switch:disabled", lines: [{ property: "background-color", value: c.disabled }, { property: "cursor", value: "not-allowed" }] },
];

export const switchHtml = `<label class="switch-field">
  <input type="checkbox" role="switch" class="switch" name="notificaciones" checked />
  Notificaciones por correo
</label>`;
