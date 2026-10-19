import type { SpecGroup } from "@/components/doc/DocBlocks";

export const cardDefinition =
  "Contenedor que agrupa información de un mismo tema (un trámite, un documento, un servicio) con imagen, título, descripción y una acción. Puede llevar a una página de detalle.";

export const cardStateInfo: { status: string; visual: string; when: string }[] = [
  { status: "Default", visual: "Fondo blanco, sombra suave.", when: "En reposo." },
  { status: "Hover", visual: "Fondo #e4e5f4.", when: "Cursor encima de una tarjeta con enlace." },
  { status: "Press", visual: "Borde #2a32a2.", when: "Mientras se hace clic." },
  { status: "Disabled", visual: "Fondo #ebebed, borde #9496a8, sin sombra ni acción.", when: "El contenido no está disponible." },
];

export const cardSpecs: SpecGroup[] = [
  {
    element: "Contenedor",
    rows: [
      { name: "Radio", value: "16px" },
      { name: "Padding", value: "24px" },
      { name: "Sombra", value: "0 4px 16px rgba(0,0,0,.07)" },
      { name: "Ancho (Figma)", value: "Vertical 410px · Horizontal 599px" },
    ],
  },
  {
    element: "Contenido",
    rows: [
      { name: "Imagen", value: "Radio 12px · 170px de alto (vertical) · 196×226px (horizontal)" },
      { name: "Icon Button", value: "Medium · 48px" },
      { name: "Título", value: "Roboto Bold 18px · #2a32a2" },
      { name: "Descripción", value: "Roboto Regular 14px · #484956" },
      { name: "Espacios", value: "20px entre bloques · 8px entre tags, título y descripción" },
      { name: "Pie", value: "24px arriba · Tag de estado y Button Outline" },
    ],
  },
  {
    element: "Icon Button",
    rows: [
      { name: "Small", value: "32px · ícono 20px" },
      { name: "Medium", value: "48px · ícono 32px" },
      { name: "Large", value: "64px · ícono 48px" },
      { name: "Colores", value: "Fondo #e4e5f4 · ícono #2a32a2" },
    ],
  },
];

export const cardFocusNote =
  "Figma no define estado de foco para la Card; el código usa el indicador del navegador sobre el título. Conviene diseñarlo.";

export const cardUsage: string[] = [
  "Vertical para grillas de opciones (servicios, trámites disponibles); Horizontal para listas donde la imagen acompaña.",
  "Toda la tarjeta lleva a un solo destino. La acción del pie es opcional y debe hacer algo distinto a abrir la tarjeta.",
  "Testimonial card para opiniones de usuarios, con calificación opcional.",
  "Mantener la misma altura de imagen y longitud de texto en una misma grilla.",
];

export const cardAccessibility: string[] = [
  "Cada Card es un <article> con su título como encabezado.",
  "Con enlace, el título es el <a> y su área cubre la tarjeta: el lector anuncia solo el título, no todo el contenido.",
  "La acción del pie es un botón aparte, alcanzable con Tab después del enlace.",
  "Imagen decorativa: alt vacío. Imagen informativa: alt que la describa.",
  "La calificación del Testimonial card se anuncia como \"Calificación: 3 de 5\".",
];

export const cardReactUsage = `import { Card } from "@/components/ui/Card";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

<Card
  image={{ src: "/servicio.png", alt: "" }}
  icon={<PaperclipIcon />}
  tags={<Tag tagCase="Marca" size="S">Nuevo</Tag>}
  title="Registro de marca"
  href="/tramites/registro-de-marca"
  status={<Tag tagCase="Success">Disponible</Tag>}
  action={<Button variant="Outline">Iniciar trámite</Button>}
>
  Protege el nombre y logo de tu empresa ante la SIC.
</Card>

<TestimonialCard
  rating={4}
  title="Trámite rápido"
  author={{ name: "Ana Restrepo", role: "Emprendedora", avatarSrc: "/ana.png" }}
>
  Registré mi empresa en dos días sin ir a ninguna oficina.
</TestimonialCard>`;
