import type { SpecGroup } from "@/components/doc/DocBlocks";

export const paginationDefinition =
  "Controles para moverse entre las páginas de una lista o tabla de resultados, por ejemplo el listado de solicitudes.";

export const paginationStates: { figma: string; when: string }[] = [
  { figma: "next page", when: "Primera página: solo aparece Siguiente." },
  { figma: "previous and next page", when: "Páginas intermedias: aparecen Anterior y Siguiente." },
  { figma: "previous page", when: "Última página: solo aparece Anterior." },
];

export const paginationSpecs: SpecGroup[] = [
  {
    element: "Botones",
    rows: [
      { name: "Página actual", value: "Button Outline" },
      { name: "Otras páginas", value: "Button Tertiary" },
      { name: "Anterior / Siguiente", value: "Button Outline con CaretCircleLeft / CaretCircleRight" },
      { name: "Números visibles", value: "3" },
      { name: "Espacio entre botones", value: "4px" },
    ],
  },
];

export const paginationUsage: string[] = [
  "Para listas largas que se cargan por partes: solicitudes, trámites, documentos.",
  "Ubicarla debajo de la lista, alineada a la izquierda o centrada, siempre en el mismo lugar.",
  "Al cambiar de página, llevar el foco o el scroll al inicio de la lista.",
  "Si la lista es corta (una sola página) no se muestra.",
];

export const paginationAccessibility: string[] = [
  "Va dentro de un <nav aria-label=\"Paginación\">, con los botones en una lista.",
  "La página actual lleva aria-current=\"page\"; los lectores la anuncian como \"página actual\".",
  "Cada número tiene nombre completo: \"Página 2\" en vez de solo \"2\".",
  "Si hay dos paginaciones en la misma pantalla, cada una necesita un aria-label distinto.",
];

export const paginationReactUsage = `import { Pagination } from "@/components/ui/Pagination";

const [page, setPage] = useState(1);

<Pagination page={page} totalPages={12} onPageChange={setPage} />`;
