// url=https://www.figma.com/design/SC8TToMduSMVIUatN8VZY1/D.S.-Tramita?node-id=581-13974
// source=src/components/ui/Uploader.tsx
// component=Uploader
import figma from 'figma'
const instance = figma.selectedInstance

// Copia del set usada en la documentación de Figma: sin nombre de documento
// ni interruptores por acción.
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
const fileName = 'Nombre documento.pdf'

export default {
  example: figma.code`<Uploader
  label="Nombre del documento"
  status="${status}"${status === 'empty' ? `
  accept=".pdf,.jpg,.png"
  onSelect={(files) => subir(files[0])}` : `
  fileName="${fileName}"`}${status === 'uploading' ? `
  progress={progreso}` : ''}${showError ? `
  error={{ title: "Nombre del error", description: "Qué pasó y qué hacer." }}` : ''}${actions && status !== 'empty' ? `
  onView={ver}` : ''}${actions && true ? `
  onReplace={reemplazar}` : ''}${actions && true ? `
  onDelete={eliminar}` : ''}${removable ? `
  onRemove={quitar}` : ''}
/>`,
  imports: ['import { Uploader } from "@/components/ui/Uploader"'],
  id: 'uploader-documentacion',
  metadata: { nestable: true },
}
