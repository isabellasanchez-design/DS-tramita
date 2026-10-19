// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-18681
// source=node_modules/@phosphor-icons/react/dist/ssr/ArrowFatUp.d.ts
// component=ArrowFatUpIcon
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
  example: figma.code`<ArrowFatUpIcon weight="${weight}" />`,
  imports: ['import { ArrowFatUpIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'arrow-fat-up-icon',
  metadata: { nestable: true },
}
