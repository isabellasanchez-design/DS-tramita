// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-5039
// source=node_modules/@phosphor-icons/react/dist/ssr/RepeatOnce.d.ts
// component=RepeatOnceIcon
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
  example: figma.code`<RepeatOnceIcon weight="${weight}" />`,
  imports: ['import { RepeatOnceIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'repeat-once-icon',
  metadata: { nestable: true },
}
