// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=697-188
// source=src/components/ui/Dropdown.tsx
// component=DropdownOption
import figma from 'figma'
const instance = figma.selectedInstance

// Property 1 (Default/Hover/Focus/Selected) lo maneja el Dropdown según la
// interacción y el valor; Property 2 (Mobile/Desk) es responsive.
// Mostrar Radio Button y Mostrar Checkbox se definen en el Dropdown
// (showRadio, multiple). El texto es el contenido del Slot.
const content = instance.getSlot('Slot')
let iconCode
if (instance.getBoolean('Mostrar Icon')) {
  const [icon] = instance.findConnectedInstances((node) => /-icon(-\d+)?$/.test(node.codeConnectId() ?? ''))
  if (icon && icon.type === 'INSTANCE') iconCode = icon.executeTemplate().example
}

export default {
  example: figma.code`<DropdownOption value="opcion"${iconCode ? figma.code` icon={${iconCode}}` : ''}>${content}</DropdownOption>`,
  imports: ['import { Dropdown, DropdownOption } from "@/components/ui/Dropdown"'],
  id: 'dropdown-option',
  metadata: { nestable: true },
}
