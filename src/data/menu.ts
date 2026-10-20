import type { SpecGroup } from "@/components/doc/DocBlocks";

export const menuDefinition =
  "Barra lateral de navegación de la plataforma. Agrupa las secciones por tema, marca la página actual y se puede cerrar para dejar solo los íconos.";

export const menuStateInfo: { status: string; visual: string }[] = [
  { status: "Open", visual: "255px de ancho: logotipo, títulos de sección, íconos con texto y perfil." },
  { status: "Closed", visual: "48px de ancho: isotipo, solo íconos y foto de perfil." },
  { status: "Item default", visual: "Ícono y texto blancos." },
  { status: "Item Select", visual: "Fondo #e4e5f4, ícono y texto Bold #2a32a2: la página actual." },
];

export const menuSpecs: SpecGroup[] = [
  {
    element: "Barra",
    rows: [
      { name: "Ancho", value: "255px abierta · 48px cerrada" },
      { name: "Fondo", value: "Degradado vertical #1a1f6b → #2830a6 (46%)" },
      { name: "Padding", value: "8px" },
    ],
  },
  {
    element: "Ítem",
    rows: [
      { name: "Alto", value: "35px · 32×32px cerrada" },
      { name: "Padding", value: "8px · 32px a la derecha" },
      { name: "Radio", value: "8px" },
      { name: "Ícono", value: "16px" },
      { name: "Texto", value: "Roboto 16px" },
    ],
  },
  {
    element: "Otros",
    rows: [
      { name: "Título de sección", value: "Roboto 12px · blanco · 32px de alto" },
      { name: "Perfil", value: "Foto 32px radio 8px · nombre Bold 14px · correo 12px #d8d9de" },
      { name: "Botón abrir/cerrar", value: "24px · #23297b · sobre el borde derecho" },
    ],
  },
];

export const menuNote =
  "Figma no define estados Hover ni Focus para los ítems ni para el botón de abrir y cerrar; el código usa el indicador de foco del navegador. Conviene diseñarlos, sobre todo el foco sobre el fondo oscuro.";

export const menuUsage: string[] = [
  "Una sola Sidebar por plataforma, a la izquierda y de alto completo.",
  "Agrupar los ítems en secciones con título cuando son más de 6.",
  "Usar íconos distintos y reconocibles: con la barra cerrada son lo único que se ve.",
  "Recordar si la persona dejó la barra cerrada y respetarlo en la siguiente visita.",
];

export const menuAccessibility: string[] = [
  "Es un <nav aria-label=\"Menú principal\"> con listas de enlaces; cada sección es un grupo con su título.",
  "La página actual lleva aria-current=\"page\".",
  "El botón de abrir/cerrar tiene aria-expanded y nombre (\"Abrir menú\" / \"Cerrar menú\").",
  "Cerrada, los textos siguen en la página para lectores de pantalla; solo se ocultan visualmente.",
];

export const menuReactUsage = `import { SidebarMenu, SidebarMenuItem, SidebarMenuSection } from "@/components/ui/SidebarMenu";

<SidebarMenu profile={{ name: "Administrador", email: "admin@tramita.com.co", onClick: abrirCuenta }}>
  <SidebarMenuSection label="Parametrización">
    <SidebarMenuItem href="/" icon={<HouseIcon />} current>Inicio</SidebarMenuItem>
    <SidebarMenuItem href="/servicios" icon={<DoorOpenIcon />}>Servicios de atención</SidebarMenuItem>
  </SidebarMenuSection>
</SidebarMenu>`;
