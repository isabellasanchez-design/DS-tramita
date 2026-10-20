// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1331-10020
// source=src/components/ui/BarListCard.tsx
// component=BarListCard
import figma from 'figma'
const instance = figma.selectedInstance

// Sin propiedades en Figma: se leen los textos en orden (título, subtítulo,
// categoría/valor por fila, conclusión y total). Las barras se calculan solas.
const texts = instance
  .findLayers((node) => node.type === 'TEXT')
  .map((node) => (node.type === 'TEXT' ? node.textContent : ''))
const [title, subtitle] = texts
const summary = texts[texts.length - 2]
const total = texts[texts.length - 1]
const rows = texts.slice(2, -2)
let items = ''
for (let i = 0; i + 1 < rows.length; i += 2) {
  items += `\n    { label: "${rows[i]}", value: ${Number(rows[i + 1]) || 0} },`
}

export default {
  example: figma.code`<BarListCard
  title="${title}"
  subtitle="${subtitle}"
  items={[${items}
  ]}
  summary="${summary}"
  total="${total}"
/>`,
  imports: ['import { BarListCard } from "@/components/ui/BarListCard"'],
  id: 'bar-list-card',
  metadata: { nestable: false },
}
