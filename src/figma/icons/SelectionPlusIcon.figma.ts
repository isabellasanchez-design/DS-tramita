// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-8556
// source=node_modules/@phosphor-icons/react/dist/ssr/SelectionPlus.d.ts
// component=SelectionPlusIcon
// Generado por scripts/icons-code-connect.mjs — no editar a mano.
import figma from 'figma'
const instance = figma.selectedInstance

// Format solo tiene el valor Outline en Figma; Phosphor no tiene prop equivalente.
const weight = instance.getEnum('Weight', {
  'Bold': 'bold',
  'Duotone': 'duotone',
  'Fill': 'fill',
  'Light': 'light',
  'Regular': 'regular',
  'Thin': 'thin',
})

export default {
  example: figma.code`<SelectionPlusIcon weight="${weight}" />`,
  imports: ['import { SelectionPlusIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'selection-plus-icon',
  metadata: { nestable: true },
}
