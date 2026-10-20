export type CssRule = { selector: string; lines: { property: string; value: string }[] };

export function getCssText(rules: CssRule[]): string {
  return rules
    .map(({ selector, lines }) => {
      const body = lines.map((line) => `  ${line.property}: ${line.value};`).join("\n");
      return `${selector} {\n${body}\n}`;
    })
    .join("\n\n");
}

/** Convierte CSS escrito como texto (sin @media ni anidación) en reglas para CssCodeBlock. */
export function parseCss(text: string): CssRule[] {
  const rules: CssRule[] = [];
  const pattern = /([^{}]+)\{([^{}]*)\}/g;
  for (const [, selector, body] of text.matchAll(pattern)) {
    const lines = body
      .split(";")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const i = line.indexOf(":");
        return { property: line.slice(0, i).trim(), value: line.slice(i + 1).trim() };
      });
    rules.push({ selector: selector.trim().replace(/\s+/g, " "), lines });
  }
  return rules;
}
