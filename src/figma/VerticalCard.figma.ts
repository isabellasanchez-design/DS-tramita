// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=129-2149
// source=src/components/ui/Card.tsx
// component=Card
import figma from 'figma'
const instance = figma.selectedInstance

// Hover y Press son estados de interacción de una Card con href.
const disabled = instance.getEnum('State', {
  'Default': false,
  'Hover': false,
  'Press': false,
  'Disabled': true,
})
const showImage = instance.getBoolean('Image')
const showIcon = instance.getBoolean('Icon')
const showTitle = instance.getBoolean('Title')

// Textos propios de la Card (sin entrar en instancias): título y descripción.
const texts = instance.findLayers((node) => node.type === 'TEXT')
const title = showTitle && texts[0] && texts[0].type === 'TEXT' ? texts[0].textContent : ''
const descriptionLayer = texts[showTitle ? 1 : 0]
const description = descriptionLayer && descriptionLayer.type === 'TEXT' ? descriptionLayer.textContent : ''

// El ícono vive dentro del Icon Button.
let iconCode
if (showIcon) {
  const [icon] = instance.findConnectedInstances((node) => /-icon(-\d+)?$/.test(node.codeConnectId() ?? ''), {
    traverseInstances: true,
    path: ['Icon Button'],
  })
  if (icon && icon.type === 'INSTANCE') iconCode = icon.executeTemplate().example
}

// Tags: los de arriba son "Additional tags"; el último, el estado del pie.
const tagInstances = instance.findConnectedInstances((node) => node.codeConnectId() === 'tag')
const statusTag = tagInstances[tagInstances.length - 1]
const statusCode = statusTag ? statusTag.executeTemplate().example : undefined

let tagsCode
if (instance.getBoolean('Additional tags')) {
  for (const tag of tagInstances.slice(0, -1)) {
    const code = tag.executeTemplate().example
    tagsCode = tagsCode ? figma.code`${tagsCode}${code}` : code
  }
}
const button = instance.findConnectedInstance('button')
const actionCode = !disabled && button && button.type === 'INSTANCE' ? button.executeTemplate().example : undefined

export default {
  example: figma.code`<Card${showImage ? `
  image={{ src: "/imagen.png", alt: "" }}` : ''}${iconCode ? figma.code`
  icon={${iconCode}}` : ''}${tagsCode ? figma.code`
  tags={<>${tagsCode}</>}` : ''}${title ? `
  title="${title}"` : ''}${disabled ? `
  disabled` : `
  href="/detalle"`}${statusCode ? figma.code`
  status={${statusCode}}` : ''}${actionCode ? figma.code`
  action={${actionCode}}` : ''}
>
  ${description}
</Card>`,
  imports: ['import { Card } from "@/components/ui/Card"'],
  id: 'vertical-card',
  metadata: { nestable: false },
}
