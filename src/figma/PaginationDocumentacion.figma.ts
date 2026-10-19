// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=961-99762
// source=src/components/ui/Pagination.tsx
// component=Pagination
import figma from 'figma'
const instance = figma.selectedInstance

// Copia del set usada en la documentación de Figma.
// State se deduce de la página actual: en Figma hay 3 páginas y la actual es
// el botón Outline.
const page = instance.getEnum('State', {
  'next page': 1,
  'previous and next page': 2,
  'previous page': 3,
})

export default {
  example: figma.code`<Pagination page={${page}} totalPages={3} onPageChange={setPage} />`,
  imports: ['import { Pagination } from "@/components/ui/Pagination"'],
  id: 'pagination-documentacion',
  metadata: { nestable: true },
}
