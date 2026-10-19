// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-1690
// source=node_modules/@phosphor-icons/react/dist/ssr/AddressBook.d.ts
// component=AddressBookIcon
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
  example: figma.code`<AddressBookIcon weight="${weight}" />`,
  imports: ['import { AddressBookIcon } from "@phosphor-icons/react/dist/ssr"'],
  id: 'address-book-icon',
  metadata: { nestable: true },
}
