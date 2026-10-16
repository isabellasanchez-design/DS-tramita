// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=949-18505
// source=src/components/ui/Chip.tsx
// component=Chip
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Chip text')
// Hover es un estado de interacción; no tiene prop en código.
const checked = instance.getEnum('States', {
  'Default': false,
  'Hover': false,
  'Select': true,
  'Disabled': false,
})
const disabled = instance.getEnum('States', {
  'Default': false,
  'Hover': false,
  'Select': false,
  'Disabled': true,
})
const showIcon = instance.getBoolean('Show icon')
// El Chip no tiene propiedad de swap para el ícono; se busca cualquier ícono
// conectado (src/figma/icons/) en vez de la capa "Clover", que cambia de
// nombre si alguien hace swap del ícono.
let iconCode
if (showIcon) {
  const [icon] = instance.findConnectedInstances((node) => /-icon(-\d+)?$/.test(node.codeConnectId() ?? ''))
  if (icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example
  }
}

export default {
  example: figma.code`<Chip
  name="filtro"
  value="opcion"
  label="${label}"${iconCode ? figma.code`
  icon={${iconCode}}` : ''}${checked ? `
  defaultChecked` : ''}${disabled ? `
  disabled` : ''}
/>`,
  imports: ['import { Chip } from "@/components/ui/Chip"'],
  id: 'chip',
  metadata: { nestable: true },
}
