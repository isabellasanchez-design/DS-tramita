// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-1914
// source=node_modules/@phosphor-icons/react/dist/ssr/ChatDots.d.ts
// component=ChatDotsIcon
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
  example: figma.code`<ChatDotsIcon weight="${weight}" />`,
  imports: ['import { ChatDotsIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'chat-dots-icon',
  metadata: { nestable: true },
}
