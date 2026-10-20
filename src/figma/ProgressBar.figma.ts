// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1325-9653
// source=src/components/ui/ProgressBar.tsx
// component=ProgressBar
import figma from 'figma'
const instance = figma.selectedInstance

// En código el valor es libre (0–100); Figma solo tiene estos pasos.
const value = instance.getEnum('Progress', {
  '100%': 100,
  '75%': 75,
  '66%': 66,
  '50%': 50,
  '33%': 33,
  '25%': 25,
  '5%': 5,
  '0%': 0,
})
const size = instance.getEnum('Size', { 'S': 'S', 'XS': 'XS' })

export default {
  example: figma.code`<ProgressBar value={${value}}${size === 'S' ? '' : ' size="XS"'} label="Avance" />`,
  imports: ['import { ProgressBar } from "@/components/ui/ProgressBar"'],
  id: 'progress-bar',
  metadata: { nestable: true },
}
