// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-2237
// source=node_modules/@phosphor-icons/react/dist/ssr/Megaphone.d.ts
// component=MegaphoneIcon
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
  example: figma.code`<MegaphoneIcon weight="${weight}" />`,
  imports: ['import { MegaphoneIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'megaphone-icon',
  metadata: { nestable: true },
}
