// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1339-257
// source=src/components/ui/KpiCard.tsx
// component=KpiCard
import figma from 'figma'
const instance = figma.selectedInstance

const status = instance.getEnum('Status', { 'Neutral': 'Neutral', 'Success': 'Success', 'Warning': 'Warning', 'Critical': 'Critical' })
const badgeStatus = instance.getEnum('Badge', { 'Neutral': 'Neutral', 'Success': 'Success', 'Warning': 'Warning', 'Critical': 'Critical' })
const showBadge = instance.getBoolean('Tag')
const showDescription = instance.getBoolean('Description')
const text = (name: string) => {
  const layer = instance.findText(name)
  return layer && layer.type === 'TEXT' ? layer.textContent : ''
}
// El texto del badge vive dentro del Tag anidado.
const [badgeText] = instance.findLayers((node) => node.type === 'TEXT' && node.name === 'Label', { traverseInstances: true })
const badgeLabel = badgeText && badgeText.type === 'TEXT' ? badgeText.textContent : ''

export default {
  example: figma.code`<KpiCard
  value="${text('Value')}"
  title="${text('Title')}"${showDescription ? `
  description="${text('Description')}"` : ''}${status === 'Neutral' ? '' : `
  status="${status}"`}${showBadge ? `
  badge={{ status: "${badgeStatus}", label: "${badgeLabel}" }}` : ''}
/>`,
  imports: ['import { KpiCard } from "@/components/ui/KpiCard"'],
  id: 'kpi-card',
  metadata: { nestable: true },
}
