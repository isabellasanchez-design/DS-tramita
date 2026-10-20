// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=129-12219
// source=src/components/ui/Popup.tsx
// component=Popup
import figma from 'figma'
const instance = figma.selectedInstance

const orientation = instance.getEnum('Property 1', { 'Vertical': 'vertical', 'Horizontal': 'horizontal' })
const tone = instance.getEnum('Case', { 'Default': 'Default', 'Success': 'Success', 'Error': 'Error', 'Warning': 'Warning' })
const branded = instance.getEnum('Tipe', { 'Predeterminado': false, 'Con marca': true })
const showTitle = instance.getBoolean('Title')
const title = showTitle ? instance.getString('Popup title text') : ''
const showClose = instance.getBoolean('Close')
const showButtons = instance.getBoolean('Buttons')
const showTerms = showButtons && instance.getBoolean('T&C')
const content = instance.getSlot('Space 1')

// El ícono va dentro del círculo, sin propiedad de swap.
let iconCode
if (showTitle && instance.getBoolean('Icon')) {
  const [icon] = instance.findConnectedInstances((node) => /-icon(-\d+)?$/.test(node.codeConnectId() ?? ''), { path: ['Title'] })
  if (icon && icon.type === 'INSTANCE') iconCode = icon.executeTemplate().example
}
// Los tres botones son instancias de Button: se leen sus textos.
const labels = showButtons
  ? instance.findLayers((node) => node.type === 'TEXT' && node.name === 'Label', { traverseInstances: true })
  : []
const label = (i: number) => (labels[i] && labels[i].type === 'TEXT' ? labels[i].textContent : '')

export default {
  example: figma.code`<Popup
  open={open}
  onClose={() => setOpen(false)}${tone === 'Default' ? '' : `
  tone="${tone}"`}${orientation === 'vertical' ? '' : `
  orientation="horizontal"`}${branded ? `
  branded` : ''}${iconCode ? figma.code`
  icon={${iconCode}}` : ''}
  title="${title}"${showTerms ? `
  terms={<Checkbox label="Acepto términos y condiciones" />}` : ''}${label(0) ? `
  primaryAction={{ label: "${label(0)}", onClick: () => {} }}` : ''}${label(1) ? `
  secondaryAction={{ label: "${label(1)}", onClick: () => {} }}` : ''}${label(2) ? `
  tertiaryAction={{ label: "${label(2)}", onClick: () => {} }}` : ''}${showClose ? '' : `
  hideClose`}
>
  ${content}
</Popup>`,
  imports: ['import { Popup } from "@/components/ui/Popup"'],
  id: 'popup',
  metadata: { nestable: false },
}
