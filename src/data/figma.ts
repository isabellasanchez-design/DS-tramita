const FILE_KEY = "SC8TToMduSMVIUatN8VZY1";

export function figmaLink(nodeId: string) {
  return `https://www.figma.com/design/${FILE_KEY}/D.S.-Tramita?node-id=${nodeId.replace(
    ":",
    "-"
  )}`;
}

export const figmaPages = {
  color: "9:12",
  typography: "9:9",
  margin: "961:104567",
  buttons: "10:299",
  checkbox: "67:1603",
  chips: "129:12608",
  icons: "10:801",
  radioButton: "67:1963",
  switch: "67:2174",
  tags: "64:237",
} as const;
