export type ButtonStyle = {
  bg: string;
  text: string;
  border?: string;
  radius: number;
  paddingX: number;
  shadow?: boolean;
  ring?: string;
  loading?: boolean;
};

export const buttonTypeNames = [
  "Primary",
  "Secondary",
  "Tertiary",
  "Link",
  "Destructive",
  "Outline",
] as const;

export const buttonStateNames = ["Default", "Hover", "Focus", "Disabled", "Loading"] as const;

export type ButtonType = (typeof buttonTypeNames)[number];
type ButtonState = (typeof buttonStateNames)[number];

const shapeByType: Record<ButtonType, { radius: number; paddingX: number }> = {
  Primary: { radius: 20, paddingX: 16 },
  Secondary: { radius: 20, paddingX: 16 },
  Tertiary: { radius: 12, paddingX: 12 },
  Link: { radius: 8, paddingX: 0 },
  Destructive: { radius: 12, paddingX: 12 },
  Outline: { radius: 20, paddingX: 16 },
};

const disabledText = "#9496a8";
const disabledBg = "#ebebed";

const colorByTypeAndState: Record<ButtonType, Record<ButtonState, Omit<ButtonStyle, "radius" | "paddingX">>> = {
  Primary: {
    Default: { bg: "#23297b", text: "#ffffff" },
    Hover: { bg: "#23297b", text: "#ffffff", shadow: true },
    Focus: { bg: "#1c2057", text: "#ffffff" },
    Disabled: { bg: disabledBg, text: disabledText },
    Loading: { bg: "#23297b", text: "#ffffff", loading: true },
  },
  Secondary: {
    Default: { bg: "#c9ccee", text: "#2a32a2" },
    Hover: { bg: "#c9ccee", text: "#2a32a2", shadow: true },
    Focus: { bg: "#c9ccee", text: "#2a32a2" },
    Disabled: { bg: disabledBg, text: disabledText },
    Loading: { bg: "#c9ccee", text: "#2a32a2", loading: true },
  },
  Tertiary: {
    Default: { bg: "transparent", text: "#2a32a2" },
    Hover: { bg: "transparent", text: "#2a32a2", shadow: true },
    Focus: { bg: "transparent", text: "#2a32a2", ring: "#beb7e6" },
    Disabled: { bg: "transparent", text: disabledText },
    Loading: { bg: "transparent", text: "#2a32a2", loading: true },
  },
  Link: {
    Default: { bg: "transparent", text: "#2a32a2" },
    Hover: { bg: "transparent", text: "#2a32a2", shadow: true },
    Focus: { bg: "transparent", text: "#2a32a2", ring: "#beb7e6" },
    Disabled: { bg: "transparent", text: disabledText },
    Loading: { bg: "transparent", text: "#2a32a2", loading: true },
  },
  Destructive: {
    Default: { bg: "transparent", text: "#b4181d" },
    Hover: { bg: "transparent", text: "#b4181d", shadow: true },
    Focus: { bg: "transparent", text: "#b4181d", ring: "#e6b7b8" },
    Disabled: { bg: "transparent", text: disabledText },
    Loading: { bg: "transparent", text: "#b4181d", loading: true },
  },
  Outline: {
    Default: { bg: "#ffffff", text: "#2a32a2", border: "#2a32a2" },
    Hover: { bg: "#d8e0fc", text: "#2a32a2", border: "#2a32a2", shadow: true },
    Focus: { bg: "#ffffff", text: "#2a32a2", border: "#476fee", ring: "#beb7e6" },
    Disabled: { bg: disabledBg, text: disabledText, border: "#d8d9de" },
    Loading: { bg: "#ffffff", text: "#2a32a2", border: "#476fee", loading: true },
  },
};

export function getButtonStyle(type: ButtonType, state: ButtonState): ButtonStyle {
  return { ...shapeByType[type], ...colorByTypeAndState[type][state] };
}

export const buttonSizeNames = ["Small", "Medium", "Large"] as const;
export type ButtonSize = (typeof buttonSizeNames)[number];

export const buttonSizeSpecs: Record<
  ButtonSize,
  {
    height: number;
    paddingY: number;
    paddingX: number;
    gap: number;
    fontSize: number;
    typography: string;
    iconSize: number;
  }
> = {
  Small: {
    height: 36,
    paddingY: 8,
    paddingX: 12,
    gap: 6,
    fontSize: 14,
    typography: "Roboto Regular 14px (Small)",
    iconSize: 16,
  },
  Medium: {
    height: 44,
    paddingY: 12,
    paddingX: 16,
    gap: 8,
    fontSize: 16,
    typography: "Roboto Regular 16px (Base)",
    iconSize: 20,
  },
  Large: {
    height: 52,
    paddingY: 14,
    paddingX: 20,
    gap: 10,
    fontSize: 18,
    typography: "Roboto Regular 18px (Large)",
    iconSize: 24,
  },
};

export const buttonDefinition =
  "Elemento interactivo que dispara una acción, navegación o envío. Es el componente de mayor jerarquía de interacción en la interfaz — guía al usuario hacia la acción que debe tomar.";

export const buttonStateInfo: { status: string; when: string; behavior: string }[] = [
  { status: "Default", when: "Estado natural, en reposo.", behavior: "-" },
  {
    status: "Hover",
    when: "Al pasar el cursor por encima (desktop).",
    behavior: "Indica que el elemento es interactivo antes del clic.",
  },
  {
    status: "Focus",
    when: "Al navegar con teclado (Tab) o inmediatamente después de hacer clic/tap.",
    behavior:
      "Crítico para accesibilidad — debe tener un indicador visual claro (outline/shadow) para usuarios de teclado y lectores de pantalla.",
  },
  {
    status: "Disabled",
    when: "Cuando la acción no está disponible aún (ej: formulario incompleto, checkbox de términos sin marcar).",
    behavior:
      "El usuario ve el botón pero no puede interactuar. Evitar ocultarlo — es mejor mostrarlo deshabilitado que hacerlo desaparecer, para que el usuario entienda qué falta.",
  },
  {
    status: "Loading",
    when: "Mientras se procesa la acción tras el clic (ej: enviando datos al servidor, validando un trámite).",
    behavior:
      "Reemplaza el label por un indicador de progreso. Evita doble-click accidental — el botón debe bloquear nuevas interacciones mientras está en este estado.",
  },
];

export const buttonUsageIntro =
  "Los botones permiten ejecutar acciones dentro de la interfaz y utilizan distintos niveles de énfasis para comunicar su importancia. La variante debe seleccionarse según la jerarquía de la acción, el contexto y el impacto que tendrá sobre el usuario.";

export const buttonUsageByType: { type: ButtonType; detail: string }[] = [
  {
    type: "Primary",
    detail:
      "para la acción principal y de mayor prioridad dentro de una pantalla o flujo, como Continuar, Guardar o Confirmar.",
  },
  {
    type: "Secondary",
    detail:
      "para acciones importantes que acompañan a la principal, pero requieren menor protagonismo visual.",
  },
  {
    type: "Tertiary",
    detail:
      "para acciones complementarias o de baja prioridad que deben estar disponibles sin competir con la acción principal.",
  },
  {
    type: "Outline",
    detail:
      "para acciones secundarias que necesitan mayor presencia que un botón terciario, manteniendo una jerarquía inferior al primario.",
  },
  {
    type: "Link",
    detail: "para acciones de navegación o acciones simples que requieren el menor peso visual.",
  },
  {
    type: "Destructive",
    detail:
      "para acciones que eliminan, cancelan o generan cambios potencialmente irreversibles. Debe utilizarse únicamente cuando sea necesario advertir al usuario sobre una acción de riesgo.",
  },
];

export const buttonUsageOutro =
  'Los botones pueden incorporar íconos antes o después de la etiqueta cuando estos ayuden a reforzar el significado de la acción. El texto debe ser breve, claro y preferiblemente comenzar con un verbo, evitando etiquetas genéricas como "Aceptar" cuando pueda indicarse una acción más específica.';

export const buttonBestPractices: string[] = [
  "Un solo Primary por pantalla o sección visible. Si hay dos acciones igual de importantes, usar Primary + Secondary, nunca dos Primary.",
  'Destructive nunca va solo — debe ir acompañado de una confirmación (modal/Alert) antes de ejecutar la acción, salvo que sea trivialmente reversible (ej: "Deshacer" en un Toast).',
  "Focus visible siempre — no remover el indicador de foco por estética; es un requisito de accesibilidad.",
  "Loading debe bloquear interacción — el usuario no debe poder hacer doble clic mientras se procesa.",
  "Disabled ≠ oculto. Mostrar el botón deshabilitado ayuda al usuario a entender que la acción existe pero aún no está disponible.",
];

export const buttonAnatomy = [
  {
    number: 1,
    name: "Button",
    detail: "Contenedor del botón. Su ancho se ajusta al contenido (label + iconos).",
  },
  {
    number: 2,
    name: "Icono izquierdo (opcional)",
    detail: "Depende del ícono elegido · Formato Outline · Peso Regular.",
  },
  {
    number: 3,
    name: "Label",
    detail: "Texto centrado · Estilo Cuerpo Base (Roboto Regular, 16px).",
  },
  {
    number: 4,
    name: "Icono derecho (opcional)",
    detail: "Depende del ícono elegido · Formato Outline · Peso Regular.",
  },
];

export const buttonSpecs = [
  { name: "Dirección", value: "Horizontal" },
  { name: "Alineación", value: "Centro" },
  { name: "Ajuste vertical", value: "Hug (se ajusta al contenido)" },
  { name: "Ajuste horizontal", value: "Fill (llena el espacio disponible)" },
  { name: "Espacio entre elementos", value: "8px" },
  { name: "Padding superior", value: "12px" },
  { name: "Padding inferior", value: "12px" },
  { name: "Padding izquierdo", value: "16px" },
  { name: "Padding derecho", value: "16px" },
];

export function getButtonClassName(type: ButtonType): string {
  return `.btn-${type.toLowerCase()}`;
}

export function getButtonCssLines(type: ButtonType): { property: string; value: string }[] {
  const style = getButtonStyle(type, "Default");
  const { paddingY } = buttonSizeSpecs.Medium;
  const lines: { property: string; value: string }[] = [
    { property: "display", value: "inline-flex" },
    { property: "align-items", value: "center" },
    { property: "justify-content", value: "center" },
    { property: "gap", value: "8px" },
    { property: "padding", value: `${paddingY}px ${style.paddingX}px` },
    { property: "border-radius", value: `${style.radius}px` },
    { property: "background-color", value: style.bg },
    { property: "color", value: style.text },
    { property: "border", value: style.border ? `1px solid ${style.border}` : "none" },
    { property: "font-family", value: "'Roboto', sans-serif" },
    { property: "font-size", value: "16px" },
    { property: "font-weight", value: "400" },
    { property: "cursor", value: "pointer" },
  ];
  return lines;
}

export function getButtonCssText(type: ButtonType): string {
  const className = getButtonClassName(type);
  const lines = getButtonCssLines(type);
  const body = lines.map((line) => `  ${line.property}: ${line.value};`).join("\n");
  return `${className} {\n${body}\n}`;
}

export const buttonReactUsage = `import { Button } from "@/components/ui/Button";
import { CaretCircleRightIcon } from "@phosphor-icons/react/dist/ssr";

<Button
  variant="Primary"      // Primary · Secondary · Tertiary · Outline · Link · Destructive
  size="Medium"          // Small · Medium · Large
  iconRight={<CaretCircleRightIcon weight="regular" />}
  loading={enviando}     // muestra el progreso y bloquea clics sin perder el foco
  type="submit"
>
  Continuar
</Button>

// Solo ícono: el nombre accesible va en aria-label.
<Button variant="Tertiary" aria-label="Siguiente" iconLeft={<CaretCircleRightIcon />} />`;
