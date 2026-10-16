This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Versionamiento

La versión del D.S. y la de cada documento se calculan solas desde el historial de git en cada `npm run dev` y `npm run build` (`scripts/versions.mjs` → `src/data/versions.generated.json`, que no se versiona). Se muestran en el encabezado de cada documento, con su historial, y en las tarjetas del índice.

Escribe los commits con [Conventional Commits](https://www.conventionalcommits.org/es/) y usa como scope el slug del documento:

| Commit | Efecto |
| --- | --- |
| `feat(botones): agregar tamaño XL` | minor de Botones y del D.S. |
| `fix(colores,tipografia): corregir contraste` | patch de ambos documentos y del D.S. |
| `docs(checkbox): ampliar lineamientos` | patch de Checkbox, de Inputs y del D.S. |
| `feat(botones)!: renombrar variantes` | major (también `BREAKING CHANGE:` en el cuerpo) |
| `chore: …`, `ci: …`, `build: …`, `test: …` | no cambian versiones |
| commit sin prefijo | patch del D.S. y de los documentos cuyos archivos toque |

- Un documento pasa a `v1.0.0` con su primer cambio; antes aparece como **Borrador**. El D.S. arranca en `v0.1.0`.
- `src/data/doc-sources.ts` dice qué archivos pertenecen a cada documento, así un cambio en ellos lo versiona aunque el commit no traiga scope.
- Para ver las versiones sin levantar el sitio: `npm run versions`.
