// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1282-12423
// source=src/components/ui/TreeView.tsx
// component=TreeView
import figma from 'figma'
const instance = figma.selectedInstance

// En Figma cada fila es una instancia; en código el TreeView recibe los datos
// del árbol y calcula nivel, sangría e ícono. Esta fila sale como un item.
const level = instance.getEnum('Propiedad 1', {
  'Nivel 00-cerrado': 0,
  'Nivel 00-abierto': 0,
  'Nivel 02': 2,
  'Nivel 03': 3,
  'Nivel 04': 4,
})
const texts = instance.findLayers((node) => node.type === 'TEXT')
const text = (i: number) => (texts[i] && texts[i].type === 'TEXT' ? texts[i].textContent : '')
const hasChildren = instance.getBoolean('drop-down')

export default {
  example: figma.code`// Fila de nivel ${level}
{
  id: "${text(0).toLowerCase()}",
  code: "${text(0)}",
  title: "${text(1)}",
  description: "${text(2)}",${hasChildren ? `
  children: [/* … */],` : ''}
}`,
  imports: ['import { TreeView } from "@/components/ui/TreeView"'],
  id: 'tree-item',
  metadata: { nestable: true },
}
