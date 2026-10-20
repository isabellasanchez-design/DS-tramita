// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1167-52135
// source=src/components/ui/DataTable.tsx
// component=DataTable
import figma from 'figma'
const instance = figma.selectedInstance

// Los encabezados se leen de las celdas de encabezado (texto en negrita 12px).
const caso = instance.getEnum('Caso', { 'Tramites asignados': 'Trámites asignados', 'Indicador de resultado': 'Indicador de resultado' })
const headers = instance
  .findLayers((node) => node.type === 'TEXT' && node.name === 'Text', { traverseInstances: true })
  .map((node) => (node.type === 'TEXT' ? node.textContent : ''))
  .filter((text, i, all) => text && all.indexOf(text) === i)
  .slice(0, caso === 'Trámites asignados' ? 5 : 4)
let columns = ''
headers.forEach((header, i) => {
  columns += `\n    { key: "col${i + 1}", header: "${header}"${caso === 'Trámites asignados' ? ', sortable: true' : ''} },`
})

export default {
  example: figma.code`<DataTable
  caption="${caso}"
  rowKey={(row) => row.id}
  rows={filas}
  columns={[${columns}
  ]}
/>`,
  imports: ['import { DataTable } from "@/components/ui/DataTable"'],
  id: 'data-table',
  metadata: { nestable: false },
}
