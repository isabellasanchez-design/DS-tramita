// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-5193
// source=node_modules/@phosphor-icons/react/dist/ssr/Sliders.d.ts
// component=SlidersIcon
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
  example: figma.code`<SlidersIcon weight="${weight}" />`,
  imports: ['import { SlidersIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'sliders-icon',
  metadata: { nestable: true },
}
