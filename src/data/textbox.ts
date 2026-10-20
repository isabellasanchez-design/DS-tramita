import type { SpecGroup } from "@/components/doc/DocBlocks";

export const textboxDefinition =
  "Campo para capturar información escrita por el usuario: texto libre, fechas, contraseñas o una opción de una lista. Siempre va acompañado de un label visible y, cuando hace falta, de un mensaje de ayuda o de validación.";

export const textboxUseCases: { name: string; component: string; detail: string }[] = [
  {
    name: "Text field",
    component: '<Input type="text" />',
    detail: "Texto libre: nombres, direcciones, números de documento, correos (type=\"email\").",
  },
  {
    name: "Date",
    component: '<Input type="date" />',
    detail: "Fechas. Usa el calendario nativo del navegador, que ya es accesible con teclado.",
  },
  {
    name: "Password",
    component: '<Input type="password" />',
    detail: "Contraseñas, con botón para mostrarla u ocultarla.",
  },
  {
    name: "Dropdown",
    component: "<Select />",
    detail: "Una opción de una lista corta. Para listas con búsqueda usar el organismo Dropdown.",
  },
];

export const textboxStateInfo: { status: string; when: string; how: string }[] = [
  { status: "Default", when: "Campo vacío, en reposo. Se ve el placeholder.", how: "Automático." },
  {
    status: "Active",
    when: "El campo tiene el foco (clic o Tab).",
    how: "Automático (:focus-visible). Borde y texto en #2a32a2.",
  },
  { status: "Filled", when: "El campo tiene un valor.", how: "Automático." },
  {
    status: "Error",
    when: "El valor no es válido o falta un campo obligatorio.",
    how: 'status="error" y el motivo en message. Marca aria-invalid.',
  },
  {
    status: "Success",
    when: "El valor se validó correctamente (p. ej. un NIT verificado).",
    how: 'status="success". Usar solo cuando la validación aporta información.',
  },
  { status: "Disabled", when: "El campo no se puede editar en este momento.", how: "disabled." },
];

export const textboxAnatomy = [
  { number: 1, name: "Label", detail: "Roboto Regular 16px (14px en móvil) · #202025. Con * si es obligatorio o (Opcional)." },
  { number: 2, name: "Campo", detail: "Caja de 36px de alto (40px en móvil), radio 4px, borde 1px." },
  { number: 3, name: "Íconos (opcionales)", detail: "16px (24px en móvil). El de la derecha cambia según el estado." },
  { number: 4, name: "Mensaje", detail: "Roboto Regular 14px (12px en móvil). Toma el color del estado." },
  { number: 5, name: "Ayuda", detail: "Segunda línea de ayuda, siempre neutra." },
];

export const textboxSpecs: SpecGroup[] = [
  {
    element: "Campo",
    rows: [
      { name: "Alto", value: "36px · móvil 40px" },
      { name: "Padding", value: "8px" },
      { name: "Espacio entre elementos", value: "6px" },
      { name: "Radio", value: "4px" },
      { name: "Borde", value: "1px #e4e5f4" },
      { name: "Texto", value: "Roboto Regular 16px · #202025" },
      { name: "Placeholder", value: "#9496a8" },
    ],
  },
  {
    element: "Estados",
    rows: [
      { name: "Active", value: "Borde #2a32a2 (2px efectivos)" },
      { name: "Error", value: "Borde y mensaje #b4181d" },
      { name: "Success", value: "Borde #28a44b · mensaje #12331b" },
      { name: "Disabled", value: "Fondo #ebebed · texto #484956" },
    ],
  },
  {
    element: "Espaciado vertical",
    rows: [{ name: "Entre label, campo y mensajes", value: "4px" }],
  },
];

export const textboxContrastNote =
  "Accesibilidad pendiente: el borde Default (#e4e5f4, 1,25:1) y el placeholder (#9496a8, 2,92:1) no cumplen WCAG 1.4.11 y 1.4.3. Un gris como #73748c (4,56:1) cumple ambos. Se corrige primero en Figma y luego en código, como una versión nueva.";

export const textboxBestPractices: string[] = [
  "El label siempre visible encima del campo. El placeholder es un ejemplo del formato, nunca reemplaza al label.",
  "Marcar con * los obligatorios o con (Opcional) los opcionales, según cuál sea la minoría en el formulario. No mezclar ambos.",
  "El mensaje de error dice qué pasó y cómo corregirlo: \"Escribe un correo con @, por ejemplo nombre@correo.com\".",
  "Validar al salir del campo o al enviar, no mientras la persona escribe.",
  "Usar el tipo correcto (email, tel, date, number) para que el móvil muestre el teclado adecuado.",
];

export const textboxAccessibility: string[] = [
  "Cada campo tiene un <label> asociado. Si el diseño no muestra label (Title=false), usar hideLabel: el texto sigue disponible para lectores de pantalla.",
  "El mensaje y la ayuda se conectan con aria-describedby; en Error se marca aria-invalid.",
  "El asterisco es visual: el atributo required es el que anuncia que el campo es obligatorio.",
  "El botón de la contraseña es un toggle (aria-pressed) con nombre \"Mostrar contraseña\".",
  "El Error no depende solo del color: lleva ícono y mensaje de texto.",
];

export const textboxReactUsage = `import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

<Input
  label="Correo electrónico"
  type="email"
  required
  placeholder="nombre@correo.com"
  status={error ? "error" : undefined}   // "error" · "success"
  message={error ?? "Te enviaremos la confirmación del trámite."}
/>

<Input label="Fecha de nacimiento" type="date" />
<Input label="Contraseña" type="password" hint="Mínimo 8 caracteres." />

<Select label="Tipo de documento" placeholder="Selecciona una opción" required defaultValue="">
  <option value="cc">Cédula de ciudadanía</option>
  <option value="ce">Cédula de extranjería</option>
</Select>`;
