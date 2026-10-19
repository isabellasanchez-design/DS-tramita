// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=959-99274
// source=src/components/ui/Tabs.tsx
// component=Tab
import figma from 'figma'
const instance = figma.selectedInstance

// En Figma cada pestaña es una instancia suelta; en código va dentro de <Tabs>,
// que decide cuál está seleccionada (State=Select) con defaultIndex o index.
const label = instance.getString('Tap text')

export default {
  example: figma.code`<Tab label="${label}">
  {/* Contenido de la sección */}
</Tab>`,
  imports: ['import { Tab, Tabs } from "@/components/ui/Tabs"'],
  id: 'tab',
  metadata: { nestable: true },
}
