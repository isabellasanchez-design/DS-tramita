import type { SpecGroup } from "@/components/doc/DocBlocks";

export const comunicacionesDefinition =
  "Componentes para enviar comunicaciones masivas desde la plataforma: el formulario para redactar el correo, con editor de texto y variables, y la vista previa de cómo lo recibirá cada persona.";

export const comunicacionesParts: { name: string; component: string; detail: string }[] = [
  { name: "Compose Email", component: "<ComposeEmail />", detail: "Formulario completo: paso, criterios, destinatarios, asunto, contenido y acciones." },
  { name: "Rich Text Editor", component: "<RichTextEditor />", detail: "Editor con negrita, subrayado, cursiva, enlace, lista y variables." },
  { name: "Email Preview", component: "<EmailPreview />", detail: "Vista previa con remitente, destinatarios, asunto, cuerpo y nota de trazabilidad." },
];

export const comunicacionesSpecs: SpecGroup[] = [
  {
    element: "Compose Email",
    rows: [
      { name: "Contenedor", value: "Blanco · borde #d8d9de · radio 16px · padding 24px" },
      { name: "Título", value: "Roboto Bold 14px · #1b2159" },
      { name: "Paso", value: "Roboto 12px · #6b7094" },
      { name: "Espacio entre bloques", value: "16px" },
    ],
  },
  {
    element: "Rich Text Editor",
    rows: [
      { name: "Barra", value: "#e4e5f4 · borde #d8d9de · padding 12px 24px · íconos 16px separados 17px" },
      { name: "Variables", value: "Roboto Bold 12px · #454b78" },
      { name: "Área de texto", value: "Blanco · borde #d8d9de · padding 32px 24px · Roboto 14px #1b2159" },
    ],
  },
  {
    element: "Email Preview",
    rows: [
      { name: "Encabezado", value: "#e4e5f4 · De / Para Roboto 12px #484956 · asunto Bold 14px #2a32a2" },
      { name: "Cuerpo", value: "Roboto 12px · #484956 · padding 32px 24px" },
      { name: "Nota", value: "Línea #73748c · Roboto 12px #9496a8" },
    ],
  },
];

export const comunicacionesNote =
  "Pendiente en Figma: la nota de trazabilidad (#9496a8, 2,92:1) no cumple WCAG 1.4.3; las capas \"Italic\" y \"Underline\" del editor tienen los íconos cruzados (en código cada botón hace lo que muestra su ícono), y no hay estados de foco ni de botón activo en la barra.";

export const comunicacionesUsage: string[] = [
  "Mostrar siempre a cuántas personas llegará el correo y con qué criterios se eligieron.",
  "Usar variables ({{nombre_prestador}}) para personalizar en vez de escribir un nombre genérico.",
  "Pasar por la vista previa antes de confirmar el envío.",
  "Guardar borrador debe estar disponible en todo momento.",
];

export const comunicacionesAccessibility: string[] = [
  "La barra del editor es un role=\"toolbar\": se entra con Tab y se recorre con flechas, Inicio y Fin.",
  "Negrita, subrayado, cursiva y lista son botones con aria-pressed; el enlace pide la URL en un campo con label.",
  "El área de texto es role=\"textbox\" con aria-multiline y el label del campo.",
  "Los criterios son una lista informativa; no son controles.",
];

export const comunicacionesReactUsage = `import { ComposeEmail } from "@/components/ui/ComposeEmail";
import { EmailPreview } from "@/components/ui/EmailPreview";

<ComposeEmail
  step="Paso 2 de 3"
  criteria={["Tipo de trámite: Renovación", "Estado: Activo"]}
  recipients="711 destinatarios"
  onEditRecipients={editar}
  subject={asunto}
  onSubjectChange={setAsunto}
  variables={[{ label: "Prestador", token: "{{nombre_prestador}}" }]}
  onSaveDraft={guardar}
  onSend={enviar}
/>

<EmailPreview from="rnt@mincomercio.gov.co" to="612 destinatarios" subject={asunto} note="Este envío queda registrado.">
  {cuerpo}
</EmailPreview>`;
