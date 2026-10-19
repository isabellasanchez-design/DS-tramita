// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=943-3600
// source=src/components/ui/Alert.tsx
// component=Toast
import figma from 'figma'
const instance = figma.selectedInstance

// Dark solo tiene el valor False. Título y descripción son capas "Text" dentro
// de instancias anidadas (TextBase): la primera es el título.
const tone = instance.getEnum('Case', {
  'Marca': 'Marca',
  'Success': 'Success',
  'Error': 'Error',
  'Pending info': 'Pending info',
  'Waiting': 'Waiting',
  'Warning': 'Warning',
})
const appearance = instance.getEnum('Style', { 'Subtle': 'subtle', 'solid': 'solid' })
const texts = instance.findLayers((node) => node.type === 'TEXT' && node.name === 'Text', { traverseInstances: true })
const title = texts[0] && texts[0].type === 'TEXT' ? texts[0].textContent : 'Título'
const showContent = instance.getBoolean('Content')
const description = showContent && texts[1] && texts[1].type === 'TEXT' ? texts[1].textContent : ''
const showButtons = instance.getBoolean('buttons')
const labels = showButtons
  ? instance.findLayers((node) => node.type === 'TEXT' && node.name === 'Label', { traverseInstances: true })
  : []
const primary = labels[0] && labels[0].type === 'TEXT' ? labels[0].textContent : ''

export default {
  example: figma.code`<Toast
  tone="${tone}"${appearance === 'subtle' ? '' : `
  appearance="solid"`}
  title="${title}"${primary ? `
  primaryAction={{ label: "${primary}", onClick: () => {} }}` : ''}
  onClose={() => {}}
${description ? `>
  ${description}
</Toast>` : '/>'}`,
  imports: ['import { Toast } from "@/components/ui/Alert"'],
  id: 'toast-documentacion',
  metadata: { nestable: true },
}
