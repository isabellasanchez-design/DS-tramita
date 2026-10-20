// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=1315-7460
// source=src/components/ui/ComposeEmail.tsx
// component=ComposeEmail
import figma from 'figma'
const instance = figma.selectedInstance

// Compose Email no tiene propiedades en Figma: se leen sus textos.
const text = (name: string) => {
  const layer = instance.findText(name)
  return layer && layer.type === 'TEXT' ? layer.textContent : ''
}
const step = text('Paso 2 de 3')
const criteria = instance
  .findLayers((node) => node.type === 'TEXT' && node.name === 'Chip name', { traverseInstances: true })
  .map((node) => (node.type === 'TEXT' ? node.textContent : ''))
  .filter(Boolean)

export default {
  example: figma.code`<ComposeEmail
  step="${step}"
  criteria={${JSON.stringify(criteria)}}
  recipients="711 destinatarios"
  onEditRecipients={editarDestinatarios}
  subject={asunto}
  onSubjectChange={setAsunto}
  variables={[
    { label: "Prestador", token: "{{nombre_prestador}}" },
    { label: "Vencimiento", token: "{{fecha_vencimiento}}" },
  ]}
  onSaveDraft={guardarBorrador}
  onSend={enviar}
/>`,
  imports: ['import { ComposeEmail } from "@/components/ui/ComposeEmail"'],
  id: 'compose-email',
  metadata: { nestable: false },
}
