// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=129-4830
// source=src/components/ui/TestimonialCard.tsx
// component=TestimonialCard
import figma from 'figma'
const instance = figma.selectedInstance

// Las estrellas son instancias sin propiedad de valor: la calificación sale
// como ejemplo (3, la de Figma). El ícono UserCircle es el de por defecto.
const showRating = instance.getBoolean('Qualification')
const showTitle = instance.getBoolean('Title')
const showUser = instance.getBoolean('User')
const text = (name: string) => {
  const layer = instance.findText(name)
  return layer && layer.type === 'TEXT' ? layer.textContent : ''
}
const title = showTitle ? text('Title testimonial card') : ''
const name = showUser ? text('Heading') : ''
const role = showUser ? text('Text') : ''
const description = instance
  .findLayers((node) => node.type === 'TEXT')
  .map((node) => (node.type === 'TEXT' ? node : null))
  .find((node) => node && !['Title testimonial card', 'Heading', 'Text'].includes(node.name))

export default {
  example: figma.code`<TestimonialCard${showRating ? `
  rating={3}` : ''}${title ? `
  title="${title}"` : ''}${showUser ? `
  author={{ name: "${name}", role: "${role}", avatarSrc: "/avatar.png" }}` : ''}
>
  ${description ? description.textContent : ''}
</TestimonialCard>`,
  imports: ['import { TestimonialCard } from "@/components/ui/TestimonialCard"'],
  id: 'testimonial-card',
  metadata: { nestable: false },
}
