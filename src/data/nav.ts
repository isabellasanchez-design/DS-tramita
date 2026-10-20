export type NavItem = { slug: string; label: string; description?: string };

export type NavCategory = {
  key: "fundamentos" | "estilos" | "componentes";
  label: string;
  description: string;
  href: string;
  items: NavItem[];
};

export const navCategories: NavCategory[] = [
  {
    key: "fundamentos",
    label: "Fundamentos",
    description:
      "Principios y reglas que orientan cómo se diseña y construye la experiencia digital.",
    href: "/fundamentos",
    items: [
      {
        slug: "principios-de-diseno",
        label: "Principios de diseño",
        description:
          "Criterios que orientan las decisiones de diseño para crear experiencias coherentes, claras y centradas en las personas.",
      },
      {
        slug: "accesibilidad",
        label: "Accesibilidad",
        description:
          "Buenas prácticas para garantizar que las experiencias puedan ser utilizadas por la mayor cantidad de personas posible.",
      },
      { slug: "consistencia", label: "Consistencia" },
      {
        slug: "jerarquia",
        label: "Jerarquía",
        description:
          "Lineamientos para organizar y priorizar la información según su importancia dentro de la interfaz.",
      },
      { slug: "responsive", label: "Responsive" },
      { slug: "criterios-ux", label: "Criterios UX" },
      { slug: "buenas-practicas", label: "Buenas prácticas" },
    ],
  },
  {
    key: "estilos",
    label: "Estilos",
    description:
      "Recursos visuales que construyen la identidad y apariencia de las interfaces.",
    href: "/estilos",
    items: [
      { slug: "colores", label: "Colores" },
      { slug: "tipografia", label: "Tipografía" },
      { slug: "iconografia", label: "Iconografía" },
      { slug: "espaciado", label: "Espaciado" },
      { slug: "bordes", label: "Bordes" },
      { slug: "sombras", label: "Sombras" },
      { slug: "grid", label: "Grid" },
      { slug: "elevacion", label: "Elevación" },
      { slug: "modos-light-dark", label: "Modos Light/Dark" },
      { slug: "tokens-de-diseno", label: "Tokens de diseño" },
    ],
  },
  {
    key: "componentes",
    label: "Componentes",
    description:
      "Elementos reutilizables para construir interfaces de forma consistente y escalable.",
    href: "/componentes",
    items: [
      { slug: "botones", label: "Botones" },
      { slug: "textbox", label: "Textbox" },
      { slug: "checkbox", label: "Checkbox" },
      { slug: "radio-button", label: "Radio Button" },
      { slug: "switch", label: "Switch" },
      { slug: "chips", label: "Chips" },
      { slug: "tags", label: "Tags" },
      { slug: "tooltips", label: "Tooltip" },
      { slug: "alert-toast", label: "Alert & Toast" },
      { slug: "information-bar", label: "Information bar" },
      { slug: "pagination", label: "Pagination" },
      { slug: "tabs", label: "Tabs" },
      { slug: "cards", label: "Card" },
      { slug: "dropdown", label: "Dropdown" },
      { slug: "menu", label: "Menu" },
      { slug: "modales", label: "Modales" },
      { slug: "tablas", label: "Tablas" },
    ],
  },
];

export function getCategory(key: NavCategory["key"]) {
  const category = navCategories.find((c) => c.key === key);
  if (!category) throw new Error(`Unknown nav category: ${key}`);
  return category;
}
