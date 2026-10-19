// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=374-1214
// source=src/components/ui/Tooltip.tsx
// component=Tooltip
import figma from 'figma'
const instance = figma.selectedInstance

// tip-position es dónde está la flecha; el tooltip queda del lado contrario.
const tipPosition = instance.getEnum('tip-position', {
  'left': 'left',
  'right': 'right',
  'left top': 'leftTop',
  'center top': 'centerTop',
  'right top': 'rightTop',
  'left bttm': 'leftBottom',
  'center bttm': 'centerBottom',
  'right bttm': 'rightBottom',
})
const text = instance.getString('Tooltip text')

// En Figma el tooltip no incluye el elemento que lo activa: va como children.
export default {
  example: figma.code`<Tooltip content="${text}"${tipPosition === 'centerBottom' ? '' : ` tipPosition="${tipPosition}"`}>
  {/* Elemento enfocable que activa el tooltip */}
</Tooltip>`,
  imports: ['import { Tooltip } from "@/components/ui/Tooltip"'],
  id: 'tooltip',
  metadata: { nestable: true },
}
