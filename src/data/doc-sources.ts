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
  "/componentes/inputs/checkbox": [
    "src/data/checkbox.ts",
    "src/components/Checkbox",
    "src/components/ui/Checkbox.tsx",
    "src/figma/Checkbox.figma.ts",
  ],
  "/componentes/inputs/radio-button": ["src/data/radio.ts", "src/components/Radio", "src/components/ui/Radio.tsx"],
  "/componentes/inputs/switch": ["src/data/switch.ts", "src/components/Switch", "src/components/ui/Switch.tsx"],
  "/componentes/badges/chips": ["src/data/chips.ts", "src/components/Chip", "src/components/ui/Chip.tsx"],
  "/componentes/badges/tags": ["src/data/tags.ts", "src/components/TagsDoc.tsx", "src/components/ui/Tag.tsx"],
  "/componentes/inputs/textbox": [
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
  "/componentes/alertas/alert-toast": [
    "src/data/alerts.ts",
    "src/components/AlertToast",
    "src/components/ui/Alert.tsx",
    "src/figma/Alert",
    "src/figma/Toast",
  ],
  "/componentes/alertas/information-bar": [
    "src/data/informationBar.ts",
    "src/components/InformationBar",
    "src/components/ui/InformationBar.tsx",
    "src/figma/InformationBar.figma.ts",
  ],
  "/estilos/espaciado": ["src/data/spacing.ts", "src/components/SpacingLayoutDiagram.tsx"],
};
