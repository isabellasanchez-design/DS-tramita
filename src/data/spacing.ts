// Márgenes y separaciones documentados en la página "Margin" de Figma, sobre la
// pantalla "Mis trámites asignados" (1440 × 1024).

export const spacingDefinition =
  "Márgenes y separaciones del layout de pantalla: el padding del área de contenido, la distancia entre bloques y el padding interno de cada tarjeta.";

export const spacingLayouts = [
  { name: "Sidebar expandido", sidebar: 255, content: 1185 },
  { name: "Sidebar colapsado", sidebar: 48, content: 1392 },
];

export const spacingRules = [
  {
    element: "Área de contenido",
    figmaName: "Frame 3461",
    rows: [
      { name: "Dirección", value: "Vertical" },
      { name: "Alineación", value: "Arriba a la izquierda" },
      { name: "Ajuste", value: "Fill × Fill" },
      { name: "Padding", value: "32px" },
      { name: "Separación entre bloques", value: "32px" },
    ],
  },
  {
    element: "Tarjeta de encabezado",
    figmaName: "Frame",
    rows: [
      { name: "Dirección", value: "Vertical" },
      { name: "Ajuste", value: "Fill (ancho) × Hug (alto)" },
      { name: "Padding", value: "32px" },
      { name: "Separación interna", value: "24px" },
    ],
  },
  {
    element: "Tarjeta de contenido",
    figmaName: "Frame",
    rows: [
      { name: "Dirección", value: "Vertical" },
      { name: "Ajuste", value: "Fill (ancho) × Fixed (alto)" },
      { name: "Padding", value: "32px" },
      { name: "Separación interna", value: "24px" },
    ],
  },
];

/** Valores de espaciado que aparecen en los componentes y pantallas de Figma. */
export const spacingScale = [
  { value: 4, token: "xs / spacing/xxs", use: "Separación entre ícono y texto (Chip, Tag)." },
  { value: 8, token: "s / spacing/xs", use: "Padding vertical de Chip; padding horizontal de Tag XS." },
  { value: 12, token: "m", use: "Padding de bloques de nota y tablas de lineamientos." },
  { value: 24, token: "—", use: "Separación entre elementos dentro de una tarjeta." },
  { value: 32, token: "—", use: "Padding de pantalla y de tarjetas; separación entre tarjetas." },
];
