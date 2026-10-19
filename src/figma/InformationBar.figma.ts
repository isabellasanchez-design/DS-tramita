// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=67-2088
// source=src/components/ui/InformationBar.tsx
// component=InformationBar
import figma from 'figma'
const instance = figma.selectedInstance

// Property 1 (Desktop/Mobile) no tiene prop: el componente es responsive.
// El texto no es una propiedad en Figma; se lee de la capa "Text".
const textLayer = instance.findText('Text')
const text = textLayer && textLayer.type === 'TEXT' ? textLayer.textContent : 'Texto del aviso'

export default {
  example: figma.code`<InformationBar onClose={() => {}}>
  ${text}
</InformationBar>`,
  imports: ['import { InformationBar } from "@/components/ui/InformationBar"'],
  id: 'information-bar',
  metadata: { nestable: true },
}
