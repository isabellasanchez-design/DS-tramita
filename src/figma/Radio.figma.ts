// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=67-1971
// source=src/components/ui/Radio.tsx
// component=Radio
import figma from 'figma'
const instance = figma.selectedInstance

// Hovered, Pressed y Keyboardtab son estados de interacción del input nativo;
// no tienen prop en código.
const checked = instance.getEnum('Selected', {
  'True': true,
  'False': false,
})
const disabled = instance.getEnum('State', {
  'Enabled': false,
  'Hovered': false,
  'Pressed': false,
  'Keyboardtab': false,
  'Disabled': true,
})

export default {
  example: figma.code`<Radio
  name="grupo"
  value="opcion"
  label="Etiqueta de la opción"${checked ? `
  defaultChecked` : ''}${disabled ? `
  disabled` : ''}
/>`,
  imports: ['import { Radio } from "@/components/ui/Radio"'],
  id: 'radio',
  metadata: { nestable: true },
}
