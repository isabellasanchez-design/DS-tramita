// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-17351
// source=node_modules/@phosphor-icons/react/dist/ssr/Pizza.d.ts
// component=PizzaIcon
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
  example: figma.code`<PizzaIcon weight="${weight}" />`,
  imports: ['import { PizzaIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'pizza-icon',
  metadata: { nestable: true },
}
