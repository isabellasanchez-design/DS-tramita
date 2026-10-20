// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1293-431
// source=src/components/ui/ActivityTimeline.tsx
// component=ActivityTimelineItem
import figma from 'figma'
const instance = figma.selectedInstance

// Mostrar Connector no tiene prop: la línea se oculta sola en el último evento.
const emphasis = instance.getEnum('Status', { 'L': 'L', 'M': 'M', 'S': 'S', 'None': 'none' })
const title = instance.getString('Step title')
const meta = instance.getString('Time and person in charge')
const body = instance.getSlot('Slot')

export default {
  example: figma.code`<ActivityTimelineItem${emphasis === 'none' ? '' : ` emphasis="${emphasis}"`} title="${title}" meta="${meta}">
  ${body}
</ActivityTimelineItem>`,
  imports: ['import { ActivityTimeline, ActivityTimelineItem } from "@/components/ui/ActivityTimeline"'],
  id: 'activity-timeline-item',
  metadata: { nestable: true },
}
