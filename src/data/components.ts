export type ComponentDoc = {
  slug: string;
  name: string;
  summary: string;
  figmaNodeId: string;
  variantAxes?: { name: string; values: string[] }[];
  states?: string[];
  detailed: boolean;
};

export const components: ComponentDoc[] = [
  {
    slug: "indicadores",
    name: "Indicators and graph",
    summary: "KPI Card, Bar List Card y Progress bar para tableros de seguimiento.",
    figmaNodeId: "1325:7969",
    detailed: true,
  },
  {
    slug: "comunicaciones",
    name: "Comunicaciones",
    summary: "Redactar y previsualizar comunicaciones masivas, con editor de texto y variables.",
    figmaNodeId: "1303:5685",
    detailed: true,
  },
  {
    slug: "activity-timeline",
    name: "Activity Timeline",
    summary: "Historial de eventos de un trámite o una atención, con hora, responsable y descripción.",
    figmaNodeId: "759:1126",
    variantAxes: [{ name: "Status", values: ["L", "M", "S", "None"] }],
    detailed: true,
  },
  {
    slug: "expandable-tree",
    name: "Expandable tree item",
    summary: "Lista jerárquica que se abre por niveles, como un plan con ejes, programas e indicadores.",
    figmaNodeId: "1222:306",
    variantAxes: [{ name: "Propiedad 1", values: ["Nivel 00-cerrado", "Nivel 00-abierto", "Nivel 02", "Nivel 03", "Nivel 04"] }],
    detailed: true,
  },
  {
    slug: "uploader",
    name: "Uploader",
    summary: "Campo para adjuntar documentos y seguir su estado: cargando, en revisión, aprobado o con error.",
    figmaNodeId: "173:359",
    states: ["Default", "Progress bar", "Loaded", "Review", "Charged", "Error"],
    detailed: true,
  },
  {
    slug: "stepper",
    name: "Stepper",
    summary: "Indica en qué paso va la persona dentro de un proceso y cuántos le faltan.",
    figmaNodeId: "129:335",
    states: ["Completed", "Current", "Active"],
    detailed: true,
  },
  {
    slug: "popup",
    name: "Popup",
    summary: "Ventana modal para confirmar acciones, mostrar resultados importantes o aceptar términos.",
    figmaNodeId: "129:5397",
    variantAxes: [
      { name: "Case", values: ["Default", "Success", "Error", "Warning"] },
      { name: "Property 1", values: ["Vertical", "Horizontal"] },
      { name: "Tipe", values: ["Predeterminado", "Con marca"] },
    ],
    detailed: true,
  },
  {
    slug: "menu",
    name: "Menu",
    summary: "Barra lateral de navegación que se abre o se cierra, con secciones y la página actual marcada.",
    figmaNodeId: "233:79",
    variantAxes: [{ name: "State", values: ["Open", "Closed"] }],
    detailed: true,
  },
  {
    slug: "dropdown",
    name: "Dropdown",
    summary: "Lista desplegable para elegir una o varias opciones, con radio, checkbox o ícono.",
    figmaNodeId: "697:9",
    states: ["Default", "Hover", "Focus", "Selected"],
    detailed: true,
  },
  {
    slug: "card",
    name: "Card",
    summary: "Contenedor que agrupa imagen, título, descripción y una acción sobre un mismo tema.",
    figmaNodeId: "129:1846",
    variantAxes: [{ name: "Tipo", values: ["Vertical Card", "Horizontal Card", "Testimonial card"] }],
    states: ["Default", "Hover", "Press", "Disabled"],
    detailed: true,
  },
  {
    slug: "buttons",
    name: "Buttons",
    summary:
      "Acciones principales, secundarias y de icono. Seis tipos (Primary, Secondary, Tertiary, Link, Destructive, Outline), cada uno con cinco estados.",
    figmaNodeId: "10:299",
    variantAxes: [
      {
        name: "Type",
        values: ["Primary", "Secondary", "Tertiary", "Link", "Destructive", "Outline"],
      },
    ],
    states: ["Default", "Hover", "Focus", "Disabled", "Loading"],
    detailed: true,
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    summary:
      "Control de selección que permite elegir una o más opciones de un conjunto, o activar/desactivar un elemento.",
    figmaNodeId: "67:1603",
    variantAxes: [{ name: "Type", values: ["Selected", "Unselected"] }],
    states: ["Enabled", "Hovered", "Keyboard focus", "Pressed", "Disabled"],
    detailed: true,
  },
  {
    slug: "radio-button",
    name: "Radio Button",
    summary:
      "Forma recomendada para permitir al usuario una única selección dentro de una lista de opciones.",
    figmaNodeId: "67:1963",
    variantAxes: [{ name: "Selected", values: ["True", "False"] }],
    states: ["Enabled", "Hovered", "Keyboard focus", "Pressed", "Disabled"],
    detailed: true,
  },
  {
    slug: "switch",
    name: "Switch",
    summary:
      "Control de encendido/apagado para una sola opción, con efecto inmediato sobre el sistema.",
    figmaNodeId: "67:2174",
    variantAxes: [{ name: "Selected", values: ["Yes", "No"] }],
    states: ["Enabled", "Hovered", "Keyboard focus", "Pressed", "Disabled"],
    detailed: true,
  },
  {
    slug: "chips",
    name: "Chips",
    summary:
      "Elementos compactos que representan una entrada, atributo o acción de filtrado.",
    figmaNodeId: "129:12608",
    states: ["Default", "Select", "Disabled", "Hover"],
    detailed: true,
  },
  {
    slug: "tags",
    name: "Tags",
    summary:
      "Etiquetas para clasificar o marcar el estado de un elemento (por ejemplo, el estado de un trámite).",
    figmaNodeId: "64:237",
    detailed: false,
  },
  {
    slug: "textbox",
    name: "Textbox",
    summary: "Campo de texto para capturar información escrita por el usuario.",
    figmaNodeId: "33:399",
    variantAxes: [{ name: "use-case", values: ["Text field", "Date", "Password", "Dropdown"] }],
    states: ["Default", "Active", "Filled", "Error", "Success", "Disabled"],
    detailed: true,
  },
  {
    slug: "alert-toast",
    name: "Alert & Toast",
    summary: "Mensajes emergentes que notifican al usuario sobre el resultado de una acción.",
    figmaNodeId: "68:2434",
    detailed: true,
  },
  {
    slug: "information-bar",
    name: "Information bar",
    summary: "Barra que comunica información relevante o contextual dentro de una pantalla.",
    figmaNodeId: "67:2077",
    variantAxes: [{ name: "Property 1", values: ["Desktop", "Mobile"] }],
    detailed: true,
  },
  {
    slug: "pagination",
    name: "Pagination",
    summary: "Controles para navegar entre páginas de una lista o tabla de resultados.",
    figmaNodeId: "597:3458",
    variantAxes: [
      { name: "State", values: ["Previous page", "Previous and next page", "Next page"] },
    ],
    detailed: true,
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    summary: "Texto de ayuda contextual que aparece al pasar el cursor o hacer foco sobre un elemento.",
    figmaNodeId: "374:1152",
    variantAxes: [
      {
        name: "Tip position",
        values: [
          "Left",
          "Right",
          "Left top",
          "Center top",
          "Right top",
          "Left bottom",
          "Center bottom",
          "Right bottom",
        ],
      },
    ],
    detailed: true,
  },
  {
    slug: "tabs",
    name: "Tabs",
    summary: "Permiten alternar entre vistas o secciones relacionadas dentro de una misma pantalla.",
    figmaNodeId: "458:177",
    variantAxes: [{ name: "State", values: ["Default", "Select"] }],
    detailed: true,
  },
];

// Maps a "Componentes" nav item slug (see src/data/nav.ts) to the individual
// component doc slugs that belong under it. A category with a single entry
// renders that component directly; more than one renders an index page.
export const componentGroups: Record<string, string[]> = {
  botones: ["buttons"],
  textbox: ["textbox"],
  checkbox: ["checkbox"],
  "radio-button": ["radio-button"],
  switch: ["switch"],
  chips: ["chips"],
  tags: ["tags"],
  tooltips: ["tooltip"],
  "alert-toast": ["alert-toast"],
  "information-bar": ["information-bar"],
  pagination: ["pagination"],
  tabs: ["tabs"],
  cards: ["card"],
  dropdown: ["dropdown"],
  menu: ["menu"],
  modales: ["popup"],
  stepper: ["stepper"],
  uploader: ["uploader"],
  "expandable-tree": ["expandable-tree"],
  "activity-timeline": ["activity-timeline"],
  comunicaciones: ["comunicaciones"],
  indicadores: ["indicadores"],
};

export function findComponent(slug: string) {
  const component = components.find((c) => c.slug === slug);
  if (!component) throw new Error(`Missing component data for slug: ${slug}`);
  return component;
}
