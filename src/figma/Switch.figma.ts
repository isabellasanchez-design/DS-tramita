// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=67-2180
// source=src/components/ui/Switch.tsx
// component=Switch
import figma from 'figma'
const instance = figma.selectedInstance

// Icon e Instance no tienen prop: el componente siempre muestra Check (Yes) o X (No).
const checked = instance.getEnum('Selected', {
  'Yes': true,
  'No': false,
})
const disabled = instance.getEnum('State', {
  'Enabled': false,
  'Hovered': false,
  'Pressed': false,
  'Keyboardtab': false,
  'Disabled': true,
})

export default {
  example: figma.code`<Switch
  name="configuracion"
  label="Nombre de la configuración"${checked ? `
  defaultChecked` : ''}${disabled ? `
  disabled` : ''}
/>`,
  imports: ['import { Switch } from "@/components/ui/Switch"'],
  id: 'switch',
  metadata: { nestable: true },
}
