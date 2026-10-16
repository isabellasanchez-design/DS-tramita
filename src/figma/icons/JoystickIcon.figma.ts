// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-6678
// source=node_modules/@phosphor-icons/react/dist/ssr/Joystick.d.ts
// component=JoystickIcon
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
  example: figma.code`<JoystickIcon weight="${weight}" />`,
  imports: ['import { JoystickIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'joystick-icon',
  metadata: { nestable: true },
}
