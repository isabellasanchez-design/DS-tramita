// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=33-3511
// source=src/components/ui/Input.tsx
// component=Input
import figma from 'figma'
const instance = figma.selectedInstance

// Sin prop en código:
// - Version (Desktop/Mobile): el componente es responsive.
// - Active: es el foco. Hide_password / Show-password: el botón del ojo es interno.
// - left-icon / right-icon / helper icon: íconos de ejemplo sin propiedad de swap.
// - phone-code: aún no existe en código.
const useCase = instance.getEnum('use-case', {
  'Text field': 'text',
  'Date': 'date',
  'Password': 'password',
  'Dropdown': 'dropdown',
})
const status = instance.getEnum('State', {
  'Default': undefined,
  'Active': undefined,
  'Filled': undefined,
  'Error': 'error',
  'Success': 'success',
  'Disabled': undefined,
})
const disabled = instance.getEnum('State', {
  'Default': false,
  'Active': false,
  'Filled': false,
  'Error': false,
  'Success': false,
  'Disabled': true,
})
// En Default y Active el texto de Figma es el placeholder; en los demás, el valor.
const isPlaceholder = instance.getEnum('State', {
  'Default': true,
  'Active': true,
  'Filled': false,
  'Error': false,
  'Success': false,
  'Disabled': false,
})
const text = instance.getString('Input text')
const showLabel = instance.getBoolean('Title')
const required = instance.getBoolean('Obligatorio')
const optional = instance.getBoolean('Opcional')
const showMessage = instance.getBoolean('hint 1')
const showMessageEnd = instance.getBoolean('hint 1.1')
const showHint = instance.getBoolean('hint 2')

const isSelect = useCase === 'dropdown'
const tag = isSelect ? 'Select' : 'Input'

export default {
  example: figma.code`<${tag}
  label="Label"${showLabel ? '' : `
  hideLabel`}${useCase === 'text' || isSelect ? '' : `
  type="${useCase}"`}${isPlaceholder || isSelect ? `
  placeholder="${text}"` : `
  defaultValue="${text}"`}${required ? `
  required` : ''}${optional && !required ? `
  optional` : ''}${status ? `
  status="${status}"` : ''}${showMessage ? `
  message="Mensaje de ayuda"` : ''}${showMessage && showMessageEnd ? `
  messageEnd="0/100"` : ''}${showHint ? `
  hint="Texto de ayuda"` : ''}${disabled ? `
  disabled` : ''}
${isSelect ? `>
  <option value="opcion">${text}</option>
</Select>` : '/>'}`,
  imports: [`import { ${tag} } from "@/components/ui/${tag}"`],
  id: 'input',
  metadata: { nestable: true },
}
