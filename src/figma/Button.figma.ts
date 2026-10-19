// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=10-375
// source=src/components/ui/Button.tsx
// component=Button
import figma from 'figma'
const instance = figma.selectedInstance

// En Figma los nombres de los íconos están cruzados: "R-Icon" es el de la
// izquierda (CaretCircleLeft) y "L-Icon" el de la derecha.
// Hover y Focus son estados de interacción (:hover, :focus-visible); no tienen prop.
const variant = instance.getEnum('Type', {
  'Primary': 'Primary',
  'Secondary': 'Secondary',
  'Tertiary': 'Tertiary',
  'Outline': 'Outline',
  'link': 'Link',
  'Destructive': 'Destructive',
})
const disabled = instance.getEnum('Status', {
  'Default': false,
  'Hover': false,
  'Focus': false,
  'Disabled': true,
  'Loading': false,
})
const loading = instance.getEnum('Status', {
  'Default': false,
  'Hover': false,
  'Focus': false,
  'Disabled': false,
  'Loading': true,
})
const showText = instance.getBoolean('Text')
const label = instance.getString('Button text')

let iconLeftCode
if (!loading && instance.getBoolean('Show R-Icon')) {
  const icon = instance.getInstanceSwap('R-Icon')
  if (icon && icon.type === 'INSTANCE') {
    iconLeftCode = icon.executeTemplate().example
  }
}
let iconRightCode
if (!loading && instance.getBoolean('Show L-Icon')) {
  const icon = instance.getInstanceSwap('L-Icon')
  if (icon && icon.type === 'INSTANCE') {
    iconRightCode = icon.executeTemplate().example
  }
}

// Sin texto visible (solo ícono) el nombre accesible va en aria-label.
export default {
  example: figma.code`<Button${variant === 'Primary' ? '' : `
  variant="${variant}"`}${iconLeftCode ? figma.code`
  iconLeft={${iconLeftCode}}` : ''}${iconRightCode ? figma.code`
  iconRight={${iconRightCode}}` : ''}${disabled ? `
  disabled` : ''}${loading ? `
  loading` : ''}${showText ? '' : `
  aria-label="${label}"`}
${showText ? `>
  ${label}
</Button>` : '/>'}`,
  imports: ['import { Button } from "@/components/ui/Button"'],
  id: 'button',
  metadata: { nestable: true },
}
