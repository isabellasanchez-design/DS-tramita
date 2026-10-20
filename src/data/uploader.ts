import type { SpecGroup } from "@/components/doc/DocBlocks";

export const uploaderDefinition =
  "Campo para adjuntar documentos a un trámite. Muestra la zona para elegir o arrastrar el archivo y, después, el estado del documento: cargando, cargado, en revisión, aprobado o con error.";

export const uploaderStates: { figma: string; code: string; when: string; look: string }[] = [
  { figma: "Default", code: "empty", when: "Aún no hay documento.", look: "Zona punteada #c5c1d1 sobre #f3f4f9." },
  { figma: "Progress bar", code: "uploading", when: "El archivo se está subiendo.", look: "Barra de progreso #2dd07a." },
  { figma: "Loaded", code: "loaded", when: "Se subió y aún se puede cambiar.", look: "Borde #c5c1d1, ícono relleno." },
  { figma: "Review", code: "review", when: "La entidad lo está revisando.", look: "Borde #1e5cae." },
  { figma: "Charged", code: "charged", when: "Aprobado.", look: "Borde y ícono verdes." },
  { figma: "Error", code: "error", when: "Fue rechazado o falló la carga.", look: "Borde #bb7d11 y descripción del error." },
];

export const uploaderSpecs: SpecGroup[] = [
  {
    element: "Contenedor",
    rows: [
      { name: "Fondo", value: "Blanco, radio 8px, padding 8px" },
      { name: "Sombra", value: "4px 4px 4px rgba(0,0,0,.04)" },
      { name: "Caja interna", value: "Radio 4px, padding 16px, borde 1px según estado" },
    ],
  },
  {
    element: "Contenido",
    rows: [
      { name: "Ícono (vacío)", value: "FileText Duotone 32px en caja de 40px #e4e5f4" },
      { name: "Ícono (con documento)", value: "FileText 24px en caja de 32px, color según estado" },
      { name: "Nombre", value: "Roboto Bold 14px · #202025" },
      { name: "Detalle", value: "Roboto 12px · #484956" },
      { name: "Acciones", value: "Íconos 16px #52565c con tooltip" },
      { name: "Error", value: "Línea #d6c2fd · título SemiBold y texto 12px #9a3412" },
    ],
  },
];

export const uploaderContrastNote =
  "Accesibilidad pendiente: la barra de progreso (#2dd07a sobre #dedce5, 1,49:1) y el borde punteado de la zona vacía (#c5c1d1 sobre #f3f4f9, 1,6:1) no cumplen WCAG 1.4.11. Figma tampoco define estado de foco; el código usa el del navegador. Se corrige primero en Figma y luego en código, como una versión nueva.";

export const uploaderUsage: string[] = [
  "Un Uploader por documento requerido, con su nombre como label (\"RUT actualizado\").",
  "Indicar siempre formatos y peso máximo antes de que la persona elija el archivo.",
  "Validar formato y peso al elegirlo y mostrar el error en el mismo Uploader.",
  "En Error, la descripción dice qué pasó y qué hacer (\"El PDF está protegido con contraseña; súbelo sin contraseña\").",
];

export const uploaderAccessibility: string[] = [
  "Usa el <input type=\"file\"> nativo: se llega con Tab y se abre con Enter o Espacio. Arrastrar y soltar es un atajo, no la única forma.",
  "El input tiene nombre con el documento que se pide y la instrucción.",
  "La carga usa role=\"progressbar\" con su porcentaje; el estado del documento se anuncia con role=\"status\".",
  "Cada acción (ver, reemplazar, eliminar) es un botón con nombre y tooltip.",
];

export const uploaderReactUsage = `import { Uploader } from "@/components/ui/Uploader";

<Uploader
  label="RUT actualizado"
  status={estado}          // empty · uploading · loaded · review · charged · error
  accept=".pdf,.jpg,.png"
  onSelect={(files) => subir(files[0])}
  fileName={archivo?.name}
  progress={progreso}
  error={{ title: "Documento rechazado", description: "El RUT debe tener menos de 30 días." }}
  onView={ver}
  onReplace={reemplazar}
  onDelete={eliminar}
/>`;
