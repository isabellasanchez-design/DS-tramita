// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=581-13042
// source=src/components/ui/Uploader.tsx
// component=Uploader
import figma from 'figma'
const instance = figma.selectedInstance

// Variable (Desktop/Mobile) no tiene prop: el componente es responsive.
const status = instance.getEnum('Estado', {
  'Default': 'empty',
  'Progress bar': 'uploading',
  'Loaded': 'loaded',
  'Review': 'review',
  'Charged': 'charged',
  'Error': 'error',
})
const actions = instance.getBoolean('Actionable behaviors')
const showError = status === 'error' && instance.getBoolean('Descripción')
const removable = status === 'empty' && instance.getBoolean('Eliminar adjunto')
const fileName = instance.getString('Document name')

export default {
  example: figma.code`<Uploader
  label="Nombre del documento"
  status="${status}"${status === 'empty' ? `
  accept=".pdf,.jpg,.png"
  onSelect={(files) => subir(files[0])}` : `
  fileName="${fileName}"`}${status === 'uploading' ? `
  progress={progreso}` : ''}${showError ? `
  error={{ title: "Nombre del error", description: "Qué pasó y qué hacer." }}` : ''}${actions && status !== 'empty' && instance.getBoolean('Ver') ? `
  onView={ver}` : ''}${actions && instance.getBoolean('Remplazar') ? `
  onReplace={reemplazar}` : ''}${actions && instance.getBoolean('Eliminar') ? `
  onDelete={eliminar}` : ''}${removable ? `
  onRemove={quitar}` : ''}
/>`,
  imports: ['import { Uploader } from "@/components/ui/Uploader"'],
  id: 'uploader',
  metadata: { nestable: true },
}
