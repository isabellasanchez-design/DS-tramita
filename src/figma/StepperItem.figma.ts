// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1302-5370
// source=src/components/ui/Stepper.tsx
// component=Stepper
import figma from 'figma'
const instance = figma.selectedInstance

// En Figma cada paso es una instancia; en código el Stepper recibe la lista
// de pasos y el actual. Las líneas de los extremos las pone el Stepper solo.
const name = instance.getString('Step name')
const state = instance.getEnum('Propiedad 1', { 'Completed': 'completado', 'Current': 'actual', 'Active': 'pendiente' })

export default {
  example: figma.code`// Paso "${name}" (${state})
<Stepper steps={["${name}", /* … */]} current={0} />`,
  imports: ['import { Stepper } from "@/components/ui/Stepper"'],
  id: 'stepper-item',
  metadata: { nestable: true },
}
