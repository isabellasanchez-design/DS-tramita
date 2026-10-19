export type CssRule = { selector: string; lines: { property: string; value: string }[] };

export function getCssText(rules: CssRule[]): string {
  return rules
    .map(({ selector, lines }) => {
      const body = lines.map((line) => `  ${line.property}: ${line.value};`).join("\n");
      return `${selector} {\n${body}\n}`;
    })
    .join("\n\n");
}
