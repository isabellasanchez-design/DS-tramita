// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=429-253
// source=src/components/ui/IconButton.tsx
// component=IconButton
import figma from 'figma'
const instance = figma.selectedInstance

const size = instance.getEnum('Size', {
  'Small': 'Small',
  'Medium': 'Medium',
  'Large': 'Large',
})
// Sin propiedad de swap: se toma el ícono conectado que tenga adentro.
const [icon] = instance.findConnectedInstances((node) => /-icon(-\d+)?$/.test(node.codeConnectId() ?? ''))
const iconCode = icon && icon.type === 'INSTANCE' ? icon.executeTemplate().example : undefined

export default {
  example: figma.code`<IconButton${iconCode ? figma.code` icon={${iconCode}}` : ''}${size === 'Medium' ? '' : ` size="${size}"`} />`,
  imports: ['import { IconButton } from "@/components/ui/IconButton"'],
  id: 'icon-button',
  metadata: { nestable: true },
}
