import type { SpecGroup } from "@/components/doc/DocBlocks";

export const popupDefinition =
  "Ventana modal que interrumpe la tarea para pedir una confirmación, mostrar el resultado de una acción importante o aceptar términos. Bloquea el resto de la pantalla hasta que se cierra.";

export const popupCaseInfo: { tone: string; when: string }[] = [
  { tone: "Default", when: "Confirmar una acción o pedir información adicional." },
  { tone: "Success", when: "Confirmar que una acción importante terminó bien (p. ej. trámite radicado)." },
  { tone: "Warning", when: "Advertir antes de una acción con consecuencias (salir sin guardar)." },
  { tone: "Error", when: "Avisar que algo falló y qué hacer, o confirmar una acción destructiva." },
];

export const popupSpecs: SpecGroup[] = [
  {
    element: "Contenedor",
    rows: [
      { name: "Ancho", value: "480px" },
      { name: "Radio", value: "24px" },
      { name: "Padding", value: "40px" },
      { name: "Sombra", value: "0 8px 32px rgba(0,0,0,.2)" },
      { name: "Espacio entre bloques", value: "16px" },
    ],
  },
  {
    element: "Contenido",
    rows: [
      { name: "Ícono", value: "Círculo 48px, ícono 32px; color según Case" },
      { name: "Título", value: "Roboto Bold 24px; color según Case" },
      { name: "Texto", value: "Roboto Regular 16px · #484956" },
      { name: "Términos", value: "Checkbox + Roboto 14px #5c5d70" },
      { name: "Botones", value: "Primary, Outline y Link · 12px entre sí" },
      { name: "Cerrar", value: "X 24px a 24px del borde" },
    ],
  },
  {
    element: "Con marca",
    rows: [{ name: "Franja", value: "68px · degradado #1a1f6b → #2830a6 · logotipo blanco · X blanca" }],
  },
];

export const popupUsage: string[] = [
  "Solo cuando la persona debe decidir o enterarse antes de seguir. Para confirmaciones que no bloquean, usar un Toast.",
  "Vertical para mensajes cortos con botones a lo ancho (más cómodo en móvil); Horizontal cuando hay más texto.",
  "El botón principal dice la acción (\"Eliminar solicitud\"), no \"Aceptar\".",
  "Con términos y condiciones, el botón principal se habilita al marcar el checkbox.",
  "Con marca para mensajes institucionales o de bienvenida.",
];

export const popupAccessibility: string[] = [
  "Usa <dialog> con showModal(): el foco queda dentro, el resto de la página queda inerte y Escape lo cierra.",
  "El título es el nombre del diálogo (aria-labelledby) y el texto su descripción (aria-describedby).",
  "Al abrir, el foco va al primer elemento enfocable; al cerrar, vuelve al botón que lo abrió.",
  "La X tiene nombre accesible \"Cerrar\". Si se oculta, Escape sigue cerrando.",
];

export const popupReactUsage = `import { Popup } from "@/components/ui/Popup";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Eliminar solicitud</Button>
<Popup
  open={open}
  onClose={() => setOpen(false)}
  tone="Error"
  icon={<TrashIcon />}
  title="¿Eliminar la solicitud?"
  primaryAction={{ label: "Eliminar", onClick: eliminar }}
  secondaryAction={{ label: "Cancelar", onClick: () => setOpen(false) }}
>
  Se borrarán los datos y documentos cargados. Esta acción no se puede deshacer.
</Popup>`;
