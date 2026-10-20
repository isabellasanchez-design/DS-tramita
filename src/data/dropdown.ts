import type { SpecGroup } from "@/components/doc/DocBlocks";

export const dropdownDefinition =
  "Lista de opciones que se despliega desde un campo. Permite elegir una opción o varias, con radio, checkbox o ícono en cada una. Para listas cortas de una sola opción sin íconos basta el Select del Textbox.";

export const dropdownStateInfo: { status: string; visual: string }[] = [
  { status: "Default", visual: "Fondo blanco, línea superior 1px #d8d9de." },
  { status: "Hover", visual: "Fondo #e4e5f4." },
  { status: "Focus", visual: "Fondo #e4e5f4 y borde 2px #2a32a2: la opción activa con el teclado." },
  { status: "Selected", visual: "Texto en negrita (y radio o checkbox marcado si se muestran)." },
];

export const dropdownSpecs: SpecGroup[] = [
  {
    element: "Opción",
    rows: [
      { name: "Padding", value: "12px 8px" },
      { name: "Alto", value: "40px (Desk) · 43px (Mobile)" },
      { name: "Texto", value: "Roboto 14px (Desk) · 16px (Mobile) · #202025" },
      { name: "Espacio entre controles y texto", value: "8px" },
    ],
  },
  {
    element: "Lista",
    rows: [
      { name: "Radio", value: "8px" },
      { name: "Alto máximo", value: "8 opciones; después hace scroll" },
    ],
  },
];

export const dropdownUsage: string[] = [
  "Dropdown para listas con íconos, con selección múltiple o con más de 7 opciones. Para pocas opciones de texto basta el Select del Textbox.",
  "Si son 2 a 5 opciones y conviene verlas todas, usar Radio Button o Checkbox en vez de un Dropdown.",
  "En selección múltiple, el campo resume cuántas opciones hay elegidas.",
  "Ordenar las opciones de forma lógica (alfabética, por frecuencia) y con textos cortos.",
];

export const dropdownAccessibility: string[] = [
  "Patrón \"select-only combobox\" de WAI-ARIA: el campo es role=\"combobox\" y la lista role=\"listbox\" con role=\"option\".",
  "El foco se queda en el campo; aria-activedescendant indica la opción activa, que se ve con el estado Focus.",
  "Teclado: flechas para moverse, Enter o Espacio para elegir, Escape para cerrar, Inicio y Fin, y escribir una letra salta a la opción que empieza por ella.",
  "En selección múltiple la lista tiene aria-multiselectable y sigue abierta al marcar.",
  "El estado de cada opción se anuncia con aria-selected; los radios y checkboxes son solo visuales.",
];

export const dropdownReactUsage = `import { Dropdown, DropdownOption } from "@/components/ui/Dropdown";

<Dropdown label="Ciudad" placeholder="Selecciona una ciudad" onChange={setCiudad}>
  <DropdownOption value="bog">Bogotá</DropdownOption>
  <DropdownOption value="med">Medellín</DropdownOption>
</Dropdown>

<Dropdown label="Documentos" multiple defaultValue={["rut"]}>
  <DropdownOption value="rut" icon={<FileTextIcon />}>RUT</DropdownOption>
  <DropdownOption value="cc" icon={<IdentificationCardIcon />}>Cédula</DropdownOption>
</Dropdown>`;
