// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-7379
// source=node_modules/@phosphor-icons/react/dist/ssr/CircleNotch.d.ts
// component=CircleNotchIcon
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
  example: figma.code`<CircleNotchIcon weight="${weight}" />`,
  imports: ['import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'circle-notch-icon',
  metadata: { nestable: true },
}
