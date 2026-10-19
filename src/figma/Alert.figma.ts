// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=68-4461
// source=src/components/ui/Alert.tsx
// component=Alert
import figma from 'figma'
const instance = figma.selectedInstance

const tone = instance.getEnum('Case', {
  'Marca': 'Marca',
  'Success': 'Success',
  'Error': 'Error',
  'Pending info': 'Pending info',
  'Waiting': 'Waiting',
  'Warning': 'Warning',
})
const appearance = instance.getEnum('Style', { 'Normal': 'subtle', 'Contrast': 'solid' })
const text = instance.getString('Alert text')
// Los botones del footer son instancias de Button; se leen sus labels.
const showButtons = instance.getBoolean('Buttons')
const labels = showButtons
  ? instance.findLayers((node) => node.type === 'TEXT' && node.name === 'Label', { traverseInstances: true })
  : []
const primary = labels[0] && labels[0].type === 'TEXT' ? labels[0].textContent : ''
const secondary = labels[1] && labels[1].type === 'TEXT' ? labels[1].textContent : ''

export default {
  example: figma.code`<Alert
  tone="${tone}"${appearance === 'subtle' ? '' : `
  appearance="solid"`}${primary ? `
  primaryAction={{ label: "${primary}", onClick: () => {} }}` : ''}${secondary ? `
  secondaryAction={{ label: "${secondary}", onClick: () => {} }}` : ''}
  onClose={() => {}}
>
  ${text}
</Alert>`,
  imports: ['import { Alert } from "@/components/ui/Alert"'],
  id: 'alert',
  metadata: { nestable: true },
}
