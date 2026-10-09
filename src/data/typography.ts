export type TypeSpec = {
  token: string;
  label: string;
  size: number;
  weight: "Bold" | "Regular";
};

export const headingFamily = "Sora";
export const bodyFamily = "Roboto";

export const headings: TypeSpec[] = [
  { token: "SORA/H1/BOLD", label: "H1", size: 48, weight: "Bold" },
  { token: "SORA/H2/BOLD", label: "H2", size: 40, weight: "Bold" },
  { token: "SORA/H3/BOLD", label: "H3", size: 32, weight: "Bold" },
  { token: "SORA/H4/BOLD", label: "H4", size: 24, weight: "Bold" },
  { token: "SORA/H4/REGULAR", label: "H4", size: 24, weight: "Regular" },
  { token: "SORA/H5/BOLD", label: "H5", size: 20, weight: "Bold" },
  { token: "SORA/H5/REGULAR", label: "H5", size: 20, weight: "Regular" },
];

export const body: TypeSpec[] = [
  { token: "ROBOTO/H1/BOLD", label: "Large", size: 18, weight: "Bold" },
  { token: "ROBOTO/H2/BOLD", label: "Base", size: 16, weight: "Bold" },
  { token: "ROBOTO/H3/BOLD", label: "Small", size: 14, weight: "Bold" },
  { token: "ROBOTO/H4/BOLD", label: "Extra small", size: 12, weight: "Bold" },
  { token: "ROBOTO/H1/REGULAR", label: "Large", size: 18, weight: "Regular" },
  { token: "ROBOTO/H2/REGULAR", label: "Base", size: 16, weight: "Regular" },
  { token: "ROBOTO/H3/REGULAR", label: "Small", size: 14, weight: "Regular" },
  { token: "ROBOTO/H4/REGULAR", label: "Extra small", size: 12, weight: "Regular" },
];

export const bodyUsage = [
  "Nombres de personas",
  "Nombres de lugares",
  "Descripciones de eventos",
  "Labels de campos",
  "Mensajes del sistema",
  "Títulos y encabezados",
];
