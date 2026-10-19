// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-5418
// source=node_modules/@phosphor-icons/react/dist/ssr/StopCircle.d.ts
// component=StopCircleIcon
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
  example: figma.code`<StopCircleIcon weight="${weight}" />`,
  imports: ['import { StopCircleIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'stop-circle-icon',
  metadata: { nestable: true },
}
