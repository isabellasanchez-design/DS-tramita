// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=67-1614
// source=src/components/ui/Checkbox.tsx
// component=Checkbox
import figma from 'figma'
const instance = figma.selectedInstance

// Hovered, Pressed y Keyboardtab son estados de interacción (:hover, :active,
// :focus-visible) que el input nativo resuelve solo; no tienen prop en código.
const checked = instance.getEnum('Type', {
  'Selected': true,
  'Unselected': false,
})
const disabled = instance.getEnum('State', {
  'Enabled': false,
  'Hovered': false,
  'Pressed': false,
  'Keyboardtab': false,
  'Disabled': true,
})

export default {
  example: figma.code`<Checkbox
  label="Etiqueta de la opción"${checked ? `
  defaultChecked` : ''}${disabled ? `
  disabled` : ''}
/>`,
  imports: ['import { Checkbox } from "@/components/ui/Checkbox"'],
  id: 'checkbox',
  metadata: { nestable: true },
}
