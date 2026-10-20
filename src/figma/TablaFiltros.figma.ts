// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1167-52082
// source=src/components/ui/DataTable.tsx
// component=TableFilters
import figma from 'figma'
const instance = figma.selectedInstance

// Los filtros son Inputs conectados: cada uno sale de su propia plantilla.
const inputs = instance.findConnectedInstances((node) => node.codeConnectId() === 'input')
let filters
for (const input of inputs.slice(1)) {
  const code = input.executeTemplate().example
  filters = filters ? figma.code`${filters}
  ${code}` : code
}
const search = inputs[0] ? inputs[0].executeTemplate().example : undefined

export default {
  example: figma.code`<TableFilters${search ? figma.code` search={${search}}` : ''}>
  ${filters}
</TableFilters>`,
  imports: ['import { TableFilters } from "@/components/ui/DataTable"'],
  id: 'table-filters',
  metadata: { nestable: false },
}
