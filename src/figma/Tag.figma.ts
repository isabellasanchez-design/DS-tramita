// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=64-284
// source=src/components/ui/Tag.tsx
// component=Tag
import figma from 'figma'
const instance = figma.selectedInstance

const label = instance.getString('Tag text')
const tagCase = instance.getEnum('Case', {
  'Success': 'Success',
  'Error': 'Error',
  'Pending Info': 'Pending Info',
  'Waiting': 'Waiting',
  'Warning': 'Warning',
  'Marca': 'Marca',
})
// La propiedad se llama "Tyoe" en Figma.
const type = instance.getEnum('Tyoe', {
  'Filled': 'Filled',
  'Contrast': 'Contrast',
  'Text': 'Text',
  'Edge': 'Edge',
})
const size = instance.getEnum('Size', {
  'XS': 'XS',
  'S': 'S',
})
const iconLeft = instance.getBoolean('icon-left')
const iconRight = instance.getBoolean('icon-right')
let iconCode
if (iconLeft || iconRight) {
  const icon = instance.getInstanceSwap('Instancia')
  if (icon && icon.type === 'INSTANCE') {
    iconCode = icon.executeTemplate().example
  }
}

export default {
  example: figma.code`<Tag
  tagCase="${tagCase}"
  type="${type}"
  size="${size}"${iconLeft ? '' : `
  iconLeft={false}`}${iconRight ? `
  iconRight` : ''}${iconCode ? figma.code`
  icon={${iconCode}}` : ''}
>
  ${label}
</Tag>`,
  imports: ['import { Tag } from "@/components/ui/Tag"'],
  id: 'tag',
  metadata: { nestable: true },
}
