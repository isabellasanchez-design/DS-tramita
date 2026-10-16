// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-8766
// source=node_modules/@phosphor-icons/react/dist/ssr/Stack.d.ts
// component=StackIcon
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
  example: figma.code`<StackIcon weight="${weight}" />`,
  imports: ['import { StackIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'stack-icon',
  metadata: { nestable: true },
}
