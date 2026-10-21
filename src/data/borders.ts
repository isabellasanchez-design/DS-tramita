// Bordes del D.S. Tramita. Figma no tiene una página de bordes: los radios,
// grosores y colores salen de los componentes de las páginas 01–03, y los
// colores de borde de "Variables de uso › Border" (página 01_Color).

export const bordersDefinition =
  "Radios de esquina, grosores y colores de borde que usan los componentes. Son valores tomados de los componentes de Figma; los colores son las variables de uso de la categoría Border.";

/** Escala de radios. `variable`: en Figma el valor está ligado a una variable local. */
export const radiusScale: { value: number | "full"; label: string; variable: boolean; use: string }[] = [
  { value: 4, label: "4px", variable: true, use: "Campos (Textbox, Date, Dropdown), Checkbox, zona del Uploader y caja del ícono del Toast." },
  { value: 8, label: "8px", variable: true, use: "Tooltip, Alert y Toast, ítems del Menú, Uploader y botón Link." },
  { value: 12, label: "12px", variable: true, use: "Botones Tertiary y Destructive, imagen de la Card y paneles de Comunicaciones." },
  { value: 16, label: "16px", variable: true, use: "Cards, Tabs (esquinas superiores), Compose Email, Bar List Card y Filtros de tabla." },
  { value: 20, label: "20px", variable: false, use: "Botones Primary, Secondary y Outline, y Chips." },
  { value: 24, label: "24px", variable: true, use: "Popup y esquinas exteriores de la Tabla." },
  {
    value: "full",
    label: "Completo",
    variable: false,
    use: "Radio Button, Switch, Tags, badges, barras de progreso, Icon Button, círculos del Stepper y botón del Menú. En Figma va como 100px o la mitad del lado.",
  },
];

/** Radios que no están en la escala; quedan documentados para revisarlos en Figma. */
export const radiusOutliers = [
  { value: "10px", where: "Caja del ícono de cada ítem del Menú lateral (Sidebar › Icon)." },
  { value: "14px", where: "KPI Card." },
];

export const borderWeights = [
  { value: 1, label: "1px", use: "Grosor por defecto de todos los bordes y separadores." },
  { value: 2, label: "2px", use: "Foco de Checkbox y Switch; opción activa del Dropdown." },
  { value: 4, label: "4px", use: "Indicador de la pestaña seleccionada en Tabs (solo borde inferior)." },
];

export const borderRules = [
  {
    element: "Posición",
    figmaName: "Stroke",
    rows: [
      { name: "Alineación", value: "Inside (por dentro): el borde no cambia el tamaño del componente" },
      { name: "En CSS", value: "box-sizing: border-box (o box-shadow inset)" },
    ],
  },
  {
    element: "Bordes por lado",
    figmaName: "Individual strokes",
    rows: [
      { name: "Solo inferior", value: "Tabs y celdas de la Tabla" },
      { name: "Solo superior", value: "Separador entre opciones del Dropdown" },
      { name: "Sin el inferior / sin el superior", value: "Barra de herramientas y área de texto de Comunicaciones" },
    ],
  },
  {
    element: "Estilo",
    figmaName: "Dash",
    rows: [
      { name: "Sólido", value: "Todos los componentes" },
      { name: "Discontinuo", value: "Solo la zona vacía del Uploader (para soltar archivos)" },
    ],
  },
];

/** Variables de uso › Border (01_Color). `contrast`: contra blanco. */
export const borderColors: { name: string; hex: string; contrast: number; use: string }[] = [
  { name: "Default", hex: "#D8D9DE", contrast: 1.41, use: "Separadores: Tabla, Tabs, opciones del Dropdown, Compose Email, Bar List Card." },
  { name: "Subtle", hex: "#EBEBED", contrast: 1.19, use: "Chips y separadores suaves de Comunicaciones." },
  { name: "Strong", hex: "#B9BAC5", contrast: 1.93, use: "Definida en Figma; ningún componente la usa todavía." },
  { name: "Disabled", hex: "#EBEBED", contrast: 1.19, use: "Componentes deshabilitados." },
  { name: "Brand", hex: "#2A32A2", contrast: 10.11, use: "Botón Outline, Checkbox, campo activo, Pagination, Card y Popup." },
  { name: "Info", hex: "#1E5CAE", contrast: 6.57, use: "Tag Info y Uploader en revisión." },
  { name: "Success", hex: "#30CF5D", contrast: 2.06, use: "Definida en Figma; los componentes usan #28A44B (ver abajo)." },
  { name: "Warning", hex: "#EC9C13", contrast: 2.25, use: "Tag Warning." },
  { name: "Error", hex: "#B4181D", contrast: 6.8, use: "Campo con error." },
];

/** Colores de borde de los componentes que no son variables Border. */
export const borderColorOutliers = [
  { hex: "#28A44B", where: "Textbox (éxito), Tag Success y Uploader cargado. La variable Border/Success es #30CF5D." },
  { hex: "#BB7D11", where: "Foco de Checkbox y Switch, Uploader con error. La variable Border/Warning es #EC9C13." },
  { hex: "#E4E5F4", where: "Textbox por defecto, Filtros de tabla y hover de la Tabla." },
  { hex: "#C5C1D1", where: "Uploader (zona vacía y cargando)." },
  { hex: "#1C2057", where: "Radio Button y Dropdown." },
  { hex: "#73748C", where: "Tag Neutral." },
];

export const bordersContrastNote =
  "Accesibilidad pendiente (WCAG 1.4.11, contraste 3:1 para los límites de un control): Default, Subtle, Strong, Disabled, Success y Warning no llegan a 3:1 contra blanco. Sirven para separar contenido, pero un campo o un control no se puede reconocer solo por ese borde. El Textbox por defecto usa #E4E5F4 (1,25:1). Se documenta para corregirlo en Figma.";
