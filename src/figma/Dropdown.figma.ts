// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=697-6426
// source=src/components/ui/Dropdown.tsx
// component=Dropdown
import figma from 'figma'
const instance = figma.selectedInstance

// Option_list: la lista con sus opciones (Master option). El campo que la
// abre es el del Dropdown; label y placeholder van como ejemplo.
const options = instance.findConnectedInstances((node) => /^dropdown-option/.test(node.codeConnectId() ?? ''))
let optionsCode
for (const option of options) {
  const code = option.executeTemplate().example
  optionsCode = optionsCode ? figma.code`${optionsCode}
  ${code}` : code
}

export default {
  example: figma.code`<Dropdown label="Label" placeholder="Selecciona una opción">
  ${optionsCode}
</Dropdown>`,
  imports: ['import { Dropdown, DropdownOption } from "@/components/ui/Dropdown"'],
  id: 'dropdown',
  metadata: { nestable: false },
}
