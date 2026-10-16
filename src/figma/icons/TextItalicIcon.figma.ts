// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-15376
// source=node_modules/@phosphor-icons/react/dist/ssr/TextItalic.d.ts
// component=TextItalicIcon
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
  example: figma.code`<TextItalicIcon weight="${weight}" />`,
  imports: ['import { TextItalicIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'text-italic-icon',
  metadata: { nestable: true },
}
