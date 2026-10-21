// Archivos que pertenecen a cada documento. Lo usa scripts/versions.mjs para
// saber qué documentos cambió un commit aunque no traiga scope.
// Cada entrada es un prefijo de ruta: "src/components/Button" cubre
// ButtonPreview.tsx, ButtonDiagrams.tsx, etc.
//
// Los archivos compartidos (p. ej. src/app/estilos/[slug]/page.tsx) no se
// asignan a ningún documento: para versionar un cambio en ellos, indica el
// documento en el scope del commit, p. ej. `fix(colores): …`.
export const docSources: Record<string, string[]> = {
  "/estilos/colores": [
    "src/data/colors.ts",
    "src/components/ColorSwatch.tsx",
    "src/components/ColorScaleRow.tsx",
  ],
  "/estilos/tipografia": ["src/data/typography.ts"],
  "/estilos/iconografia": ["src/data/phosphor-icons.ts", "src/components/IconGallery.tsx"],
  "/componentes/botones": [
    "src/data/buttons.ts",
    "src/components/Button",
    "src/components/ui/Button.tsx",
    "src/figma/Button",
  ],
  "/componentes/checkbox": [
    "src/data/checkbox.ts",
    "src/components/Checkbox",
    "src/components/ui/Checkbox.tsx",
    "src/figma/Checkbox.figma.ts",
  ],
  "/componentes/radio-button": ["src/data/radio.ts", "src/components/Radio", "src/components/ui/Radio.tsx"],
  "/componentes/switch": ["src/data/switch.ts", "src/components/Switch", "src/components/ui/Switch.tsx"],
  "/componentes/chips": ["src/data/chips.ts", "src/components/Chip", "src/components/ui/Chip.tsx"],
  "/componentes/tags": ["src/data/tags.ts", "src/components/TagsDoc.tsx", "src/components/ui/Tag.tsx"],
  "/componentes/textbox": [
    "src/data/textbox.ts",
    "src/components/Textbox",
    "src/components/ui/Field.tsx",
    "src/components/ui/Input.tsx",
    "src/components/ui/Select.tsx",
    "src/figma/Input.figma.ts",
  ],
  "/componentes/tooltips": [
    "src/data/tooltip.ts",
    "src/components/TooltipDoc.tsx",
    "src/components/ui/Tooltip.tsx",
    "src/figma/Tooltip.figma.ts",
  ],
  "/componentes/alert-toast": [
    "src/data/alerts.ts",
    "src/components/AlertToast",
    "src/components/ui/Alert.tsx",
    "src/figma/Alert",
    "src/figma/Toast",
  ],
  "/componentes/information-bar": [
    "src/data/informationBar.ts",
    "src/components/InformationBar",
    "src/components/ui/InformationBar.tsx",
    "src/figma/InformationBar.figma.ts",
  ],
  "/componentes/pagination": [
    "src/data/pagination.ts",
    "src/components/Pagination",
    "src/components/ui/Pagination.tsx",
    "src/figma/Pagination",
  ],
  "/componentes/tabs": [
    "src/data/tabs.ts",
    "src/components/TabsDoc.tsx",
    "src/components/TabsExamples.tsx",
    "src/components/ui/Tabs.tsx",
    "src/figma/Tab.figma.ts",
  ],
  "/componentes/cards": [
    "src/data/card.ts",
    "src/components/Card",
    "src/components/ui/Card.tsx",
    "src/components/ui/IconButton.tsx",
    "src/components/ui/TestimonialCard.tsx",
    "src/figma/VerticalCard.figma.ts",
    "src/figma/HorizontalCard.figma.ts",
    "src/figma/IconButton.figma.ts",
    "src/figma/TestimonialCard.figma.ts",
  ],
  "/componentes/dropdown": [
    "src/data/dropdown.ts",
    "src/components/Dropdown",
    "src/components/ui/Dropdown.tsx",
    "src/figma/Dropdown",
  ],
  "/componentes/menu": [
    "src/data/menu.ts",
    "src/components/Menu",
    "src/components/ui/SidebarMenu.tsx",
    "src/figma/SidebarMenu",
  ],
  "/componentes/modales": [
    "src/data/popup.ts",
    "src/components/Popup",
    "src/components/ui/Popup.tsx",
    "src/figma/Popup.figma.ts",
  ],
  "/componentes/stepper": [
    "src/data/stepper.ts",
    "src/components/Stepper",
    "src/components/ui/Stepper.tsx",
    "src/figma/StepperItem.figma.ts",
  ],
  "/componentes/uploader": [
    "src/data/uploader.ts",
    "src/components/Uploader",
    "src/components/ui/Uploader.tsx",
    "src/figma/Uploader",
  ],
  "/componentes/expandable-tree": [
    "src/data/tree.ts",
    "src/components/Tree",
    "src/components/ui/TreeView.tsx",
    "src/figma/TreeItem.figma.ts",
  ],
  "/componentes/activity-timeline": [
    "src/data/timeline.ts",
    "src/components/TimelineDoc.tsx",
    "src/components/ui/ActivityTimeline.tsx",
    "src/figma/ActivityTimelineItem.figma.ts",
  ],
  "/componentes/comunicaciones": [
    "src/data/comunicaciones.ts",
    "src/components/Comunicaciones",
    "src/components/ui/ComposeEmail.tsx",
    "src/components/ui/EmailPreview.tsx",
    "src/components/ui/RichTextEditor.tsx",
    "src/figma/ComposeEmail.figma.ts",
    "src/figma/EmailPreview.figma.ts",
  ],
  "/componentes/indicadores": [
    "src/data/indicators.ts",
    "src/components/IndicatorsDoc.tsx",
    "src/components/ui/KpiCard.tsx",
    "src/components/ui/BarListCard.tsx",
    "src/components/ui/ProgressBar.tsx",
    "src/figma/KpiCard.figma.ts",
    "src/figma/BarListCard.figma.ts",
    "src/figma/ProgressBar.figma.ts",
  ],
  "/componentes/tablas": [
    "src/data/tabla.ts",
    "src/components/Tabla",
    "src/components/ui/DataTable.tsx",
    "src/figma/Tabla",
  ],
  "/estilos/bordes": ["src/data/borders.ts"],
  "/estilos/espaciado": ["src/data/spacing.ts", "src/components/SpacingLayoutDiagram.tsx"],
};
