import type { CssRule } from "@/lib/css";

export const radioSelectedNames = ["True", "False"] as const;
export const radioStateNames = ["Enabled", "Hovered", "Keyboardtab", "Pressed", "Disabled"] as const;

export type RadioSelected = (typeof radioSelectedNames)[number];
export type RadioState = (typeof radioStateNames)[number];

export type RadioStyle = {
  ring: string;
  /** 1.5px en todos los estados salvo False/Enabled, que usa 1px. */
  ringWidth: number;
  /** Punto central; en Keyboardtab lleva borde naranja. */
  dot?: { fill?: string; stroke?: string };
  /** Fondo gris circular mientras se presiona (solo Selected=True en Figma). */
  pressed: boolean;
};

export const radioColors = {
  secondary: "#1c2057",
  secondaryHover: "#121433",
  neutral: "#d8d9de",
  focus: "#bb7d11",
};

const c = radioColors;

const styles: Record<RadioSelected, Record<RadioState, RadioStyle>> = {
  True: {
    Enabled: { ring: c.secondary, ringWidth: 1.5, dot: { fill: c.secondary }, pressed: false },
    Hovered: { ring: c.secondaryHover, ringWidth: 1.5, dot: { fill: c.secondaryHover }, pressed: false },
    Keyboardtab: { ring: c.focus, ringWidth: 1.5, dot: { fill: c.secondary, stroke: c.focus }, pressed: false },
    Pressed: { ring: c.secondary, ringWidth: 1.5, dot: { fill: c.secondary }, pressed: true },
    Disabled: { ring: c.neutral, ringWidth: 1.5, dot: { fill: c.neutral }, pressed: false },
  },
  False: {
    Enabled: { ring: c.secondary, ringWidth: 1, pressed: false },
    Hovered: { ring: c.secondaryHover, ringWidth: 1.5, pressed: false },
    Keyboardtab: { ring: c.focus, ringWidth: 1.5, dot: { stroke: c.focus }, pressed: false },
    Pressed: { ring: c.secondary, ringWidth: 1.5, pressed: false },
    Disabled: { ring: c.neutral, ringWidth: 1.5, pressed: false },
  },
};

export function getRadioStyle(selected: RadioSelected, state: RadioState) {
  return styles[selected][state];
}

export const radioDefinition =
  "Control de selección que permite al usuario elegir una única opción de una lista de alternativas mutuamente excluyentes.";

export const radioSelectedInfo: Record<RadioSelected, { visual: string; when: string }> = {
  True: {
    visual: "Círculo con punto de relleno en el centro.",
    when: "Cuando esa opción es la elegida dentro del grupo.",
  },
  False: {
    visual: "Círculo vacío, solo borde.",
    when: "Cuando esa opción existe pero no es la elegida — recuerda que solo una puede estar en True a la vez dentro del mismo grupo.",
  },
};

export const radioSelectedNote =
  "Cada uno de los 5 estados de interacción (Enabled, Hovered, Keyboardtab, Pressed, Disabled) existe tanto para Selected=True como para Selected=False — son 10 combinaciones visuales en total, igual que en Checkbox.";

export const radioStateInfo: { status: RadioState; when: string }[] = [
  { status: "Enabled", when: "Estado natural, en reposo — seleccionado o no seleccionado." },
  { status: "Hovered", when: "Al pasar el cursor por encima (desktop)." },
  {
    status: "Keyboardtab",
    when: "Al navegar con teclado (Tab) — indicador visual de foco, crítico para accesibilidad.",
  },
  { status: "Pressed", when: "Durante el clic/tap, justo al momento de seleccionar." },
  {
    status: "Disabled",
    when: "Cuando la opción no está disponible para elegir en ese contexto (ya sea que estuviera seleccionada o no previamente).",
  },
];

export const radioUsage = {
  title: "Cuándo usar Radio Button (vs. Checkbox)",
  detail:
    "Radio Button = selección única y excluyente (elegir una opción automáticamente deselecciona las demás). Ej: elegir tipo de documento (cédula o pasaporte), elegir método de pago, elegir sede del trámite.",
};

export const radioAccessibility: string[] = [
  "Agrupar las opciones en un <fieldset> con su <legend>, y darles el mismo name para que el navegador las trate como un solo grupo.",
  "Con el teclado, Tab entra y sale del grupo y las flechas mueven la selección entre opciones; no hace falta JavaScript si se usa el input nativo.",
  "Cada opción necesita una etiqueta visible asociada (<label>); hacer clic en el texto también debe seleccionarla.",
  "No quitar el indicador de foco (Keyboardtab).",
];

export const radioAnatomy = [
  { number: 1, name: "Radio Button", detail: "Área del control · 24.4 × 24px." },
  {
    number: 2,
    name: "Fill_RadioButton",
    detail: "Aro de 19.5px con borde de 1.5px y, en Selected=True, punto central de 12px.",
  },
];

export const radioSpecs = [
  {
    element: "Radio Button",
    rows: [
      { name: "Dirección", value: "Horizontal" },
      { name: "Alineación", value: "Centro" },
      { name: "Ajuste vertical", value: "Fill" },
      { name: "Ajuste horizontal", value: "Fill" },
      { name: "Padding", value: "12px" },
    ],
  },
  {
    element: "Fill_RadioButton",
    rows: [
      { name: "Tamaño", value: "24 × 24px" },
      { name: "Aro", value: "19.5px · borde 1.5px (1px en False/Enabled)" },
      { name: "Punto central", value: "12px" },
      { name: "Radio", value: "100 (circular)" },
    ],
  },
];

export const radioCssRules: CssRule[] = [
  {
    selector: ".radio",
    lines: [
      { property: "appearance", value: "none" },
      { property: "width", value: "19.5px" },
      { property: "height", value: "19.5px" },
      { property: "margin", value: "2.25px" },
      { property: "border", value: `1px solid ${c.secondary}` },
      { property: "border-radius", value: "50%" },
      { property: "cursor", value: "pointer" },
    ],
  },
  { selector: ".radio:hover", lines: [{ property: "border", value: `1.5px solid ${c.secondaryHover}` }] },
  {
    selector: ".radio:checked",
    lines: [
      { property: "border-width", value: "1.5px" },
      { property: "background", value: `radial-gradient(circle, currentColor 0 6px, transparent 6.5px)` },
      { property: "color", value: c.secondary },
    ],
  },
  { selector: ".radio:checked:hover", lines: [{ property: "color", value: c.secondaryHover }] },
  {
    selector: ".radio:focus-visible",
    lines: [
      { property: "outline", value: "none" },
      { property: "border", value: `1.5px solid ${c.focus}` },
      { property: "box-shadow", value: `inset 0 0 0 2px ${c.focus}` },
    ],
  },
  { selector: ".radio:checked:active", lines: [{ property: "box-shadow", value: `0 0 0 2.25px ${c.neutral}` }] },
  {
    selector: ".radio:disabled",
    lines: [
      { property: "border-color", value: c.neutral },
      { property: "color", value: c.neutral },
      { property: "cursor", value: "not-allowed" },
    ],
  },
];

export const radioHtml = `<fieldset>
  <legend>Tipo de documento</legend>
  <label class="radio-field">
    <input type="radio" class="radio" name="tipo-documento" value="cc" checked />
    Cédula de ciudadanía
  </label>
  <label class="radio-field">
    <input type="radio" class="radio" name="tipo-documento" value="pa" />
    Pasaporte
  </label>
</fieldset>`;
