import type { SpecGroup } from "@/components/doc/DocBlocks";

// Colores de 02_Alert & Toast en Figma, tal cual.
export const alertToneNames = ["Marca", "Success", "Error", "Pending info", "Waiting", "Warning"] as const;
export type AlertTone = (typeof alertToneNames)[number];
/** subtle = Normal / Subtle en Figma; solid = Contrast / colored / solid. */
export type AlertAppearance = "subtle" | "solid";

export type AlertToneColors = {
  subtleBg: string;
  solidBg: string;
  /** Ícono en subtle (Alert). */
  accent: string;
  /** Fondo del botón principal y borde/texto del secundario en subtle. */
  action: string;
  /** Borde y texto del botón secundario en solid. */
  solidOutline: string;
};

const marca = "#4ad16f 0%, #1a1f6b 100%";

export const alertTones: Record<AlertTone, AlertToneColors> = {
  Marca: {
    subtleBg: "linear-gradient(90deg, rgba(74,209,111,0.4) 0%, rgba(26,31,107,0.4) 100%)",
    solidBg: `linear-gradient(90deg, ${marca})`,
    accent: "#2a32a2",
    action: "#23297b",
    solidOutline: "#f3f4f9",
  },
  Success: { subtleBg: "#e4f4e8", solidBg: "#28a44b", accent: "#227c3c", action: "#227c3c", solidOutline: "#f3f9f5" },
  Error: { subtleBg: "#f6e1e2", solidBg: "#e31c23", accent: "#b4181d", action: "#88161a", solidOutline: "#faf2f3" },
  "Pending info": { subtleBg: "#e2ebf6", solidBg: "#2473db", accent: "#1e5cae", action: "#1b4883", solidOutline: "#f3f6fa" },
  Waiting: { subtleBg: "#ebebed", solidBg: "#9496a8", accent: "#5c5d70", action: "#5c5d70", solidOutline: "#ffffff" },
  Warning: { subtleBg: "#f7efe0", solidBg: "#ec9c13", accent: "#8d6011", action: "#8d6011", solidOutline: "#faf7f2" },
};

export const alertDefinition =
  "Mensajes que informan sobre el resultado de una acción o el estado de un trámite. El Alert va dentro del contenido de la página; el Toast aparece sobre la interfaz como confirmación de algo que acaba de pasar.";

export const alertToneInfo: { tone: AlertTone; when: string }[] = [
  { tone: "Success", when: "La acción terminó bien: solicitud enviada, documento cargado." },
  { tone: "Error", when: "La acción falló o hay un problema que impide continuar." },
  { tone: "Warning", when: "Algo requiere atención antes de seguir (un plazo, un dato a revisar)." },
  { tone: "Pending info", when: "Falta información del usuario para continuar el trámite." },
  { tone: "Waiting", when: "El trámite está en proceso y depende de un tercero." },
  { tone: "Marca", when: "Mensajes informativos o promocionales de Tramita." },
];

export const alertVsToast = {
  columns: ["", "Alert", "Toast"],
  rows: [
    ["Dónde", "Dentro del contenido, junto a lo que describe.", "Sobre la interfaz, en una esquina."],
    ["Contenido", "Un texto corto.", "Título y descripción opcional."],
    ["Acciones", "Hasta dos (principal y secundaria).", "Una."],
    ["Duración", "Hasta que se resuelva o se cierre.", "Hasta que se cierre; no desaparece sola."],
  ],
};

export const alertContrastNote =
  "Accesibilidad pendiente: en el estilo solid, el texto blanco no cumple WCAG 1.4.3 sobre Waiting (#9496a8, 2,92:1), Warning (#ec9c13, 2,25:1), Success (#28a44b, 3,23:1) ni el extremo verde de Marca (#4ad16f, 1,97:1). Error y Pending info sí cumplen. Se corrige primero en Figma y luego en código, como una versión nueva.";

export const alertAnatomy = [
  { number: 1, name: "Contenedor", detail: "Radio 8px, padding 20px 12px. Fondo según caso y estilo." },
  { number: 2, name: "Ícono", detail: "Phosphor Regular. En subtle toma el color del caso; en solid, blanco." },
  { number: 3, name: "Texto", detail: "Alert: Roboto 16px. Toast: título Roboto Bold 18px y descripción 16px." },
  { number: 4, name: "Cerrar", detail: "Botón X de 24px con nombre accesible \"Cerrar\"." },
  { number: 5, name: "Acciones (opcional)", detail: "Botones de 44px de alto, radio 20px, con el color del caso." },
];

export const alertSpecs: SpecGroup[] = [
  {
    element: "Contenedor",
    rows: [
      { name: "Radio", value: "8px" },
      { name: "Padding", value: "20px 12px" },
      { name: "Espacio entre bloques", value: "16px" },
    ],
  },
  {
    element: "Contenido",
    rows: [
      { name: "Ícono y texto", value: "8px entre sí" },
      { name: "Sangría de la descripción (Toast)", value: "32px" },
      { name: "Sangría de las acciones", value: "24px Alert · 32px Toast" },
    ],
  },
  {
    element: "Acciones",
    rows: [
      { name: "Alto", value: "44px" },
      { name: "Radio", value: "20px" },
      { name: "Padding", value: "12px 16px" },
      { name: "Espacio entre botones", value: "16px" },
    ],
  },
];

export const alertAccessibility: string[] = [
  "El Toast se anuncia al aparecer: role=\"status\", o role=\"alert\" si es Error.",
  "Un Alert que aparece después de una acción (p. ej. al enviar un formulario) debe llevar role=\"alert\" o role=\"status\"; uno que ya está al cargar la página no lo necesita.",
  "El Toast no se cierra solo: la persona lo cierra cuando termina de leerlo (WCAG 2.2.1).",
  "El botón de cerrar es un <button> con aria-label=\"Cerrar\".",
  "El caso no depende solo del color: el texto debe decir qué pasó.",
];

export const alertReactUsage = `import { Alert, Toast } from "@/components/ui/Alert";

<Alert
  tone="Warning"              // Marca · Success · Error · Pending info · Waiting · Warning
  appearance="subtle"         // subtle · solid
  primaryAction={{ label: "Revisar", onClick: revisar }}
  secondaryAction={{ label: "Más tarde", onClick: cerrar }}
  onClose={cerrar}
>
  Tu solicitud vence en 3 días.
</Alert>

<Toast
  tone="Success"
  title="Solicitud enviada"
  primaryAction={{ label: "Ver solicitud", onClick: verSolicitud }}
  onClose={cerrarToast}
>
  Te avisaremos por correo cuando cambie de estado.
</Toast>`;
