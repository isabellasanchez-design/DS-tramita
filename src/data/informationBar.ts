import type { SpecGroup } from "@/components/doc/DocBlocks";

export const informationBarDefinition =
  "Barra de ancho completo, arriba de la página, para avisos generales que aplican a toda la plataforma: mantenimientos programados, cambios de horario de atención o novedades de Tramita.";

export const informationBarSpecs: SpecGroup[] = [
  {
    element: "Barra",
    rows: [
      { name: "Fondo", value: "Degradado 90° #4ad16f → #1a1f6b" },
      { name: "Padding", value: "12px 32px · móvil 12px 16px" },
      { name: "Espacio entre contenido y cerrar", value: "16px" },
    ],
  },
  {
    element: "Contenido",
    rows: [
      { name: "Ícono", value: "16px · blanco" },
      { name: "Texto", value: "Roboto Regular 16px · blanco" },
      { name: "Espacio ícono–texto", value: "8px" },
    ],
  },
];

export const informationBarContrastNote =
  "Accesibilidad pendiente: el texto blanco empieza sobre el extremo verde del degradado (#4ad16f, 1,97:1), que no cumple WCAG 1.4.3. Se corrige primero en Figma y luego en código, como una versión nueva.";

export const informationBarUsage: string[] = [
  "Una sola barra a la vez, arriba de todo el contenido.",
  "Para avisos que aplican a toda la plataforma. Si el mensaje es sobre una sección o un trámite, usar un Alert junto a ese contenido.",
  "Texto de una línea en escritorio; en móvil puede ocupar dos.",
  "Si se puede cerrar, recordar que la persona la cerró y no volver a mostrarla en la sesión.",
];

export const informationBarAccessibility: string[] = [
  "Si la barra está desde que carga la página no necesita role. Si aparece después, usar role=\"status\".",
  "El botón de cerrar es un <button> con aria-label=\"Cerrar\".",
  "Al cerrarla, mover el foco al inicio del contenido principal si estaba en el botón X.",
];

export const informationBarReactUsage = `import { InformationBar } from "@/components/ui/InformationBar";

<InformationBar onClose={() => setVisible(false)}>
  El sábado 25 de octubre la plataforma no estará disponible de 6:00 a 10:00 a. m.
</InformationBar>`;
