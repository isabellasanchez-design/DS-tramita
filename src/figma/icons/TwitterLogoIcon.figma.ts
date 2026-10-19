// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-9917
// source=node_modules/@phosphor-icons/react/dist/ssr/TwitterLogo.d.ts
// component=TwitterLogoIcon
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
  example: figma.code`<TwitterLogoIcon weight="${weight}" />`,
  imports: ['import { TwitterLogoIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'twitter-logo-icon',
  metadata: { nestable: true },
}
