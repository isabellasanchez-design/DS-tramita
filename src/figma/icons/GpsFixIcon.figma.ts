// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-3343
// source=node_modules/@phosphor-icons/react/dist/ssr/GpsFix.d.ts
// component=GpsFixIcon
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
  example: figma.code`<GpsFixIcon weight="${weight}" />`,
  imports: ['import { GpsFixIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'gps-fix-icon',
  metadata: { nestable: true },
}
