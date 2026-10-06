# Business-site (demo)

A five-page website in Thai and English for a made-up Thai massage & spa shop. It is a portfolio
demo: the brand and every detail on the site are fictional.

> Work in progress: this is the skeleton (pages, header, footer, two languages). The design,
> content and images come next. This README is completed with the content.

Planned live site: <https://0984043505frong.github.io/Business-site/>

## Stack

Nuxt 4 + Tailwind CSS 4, `@nuxt/fonts` and `@nuxtjs/i18n`, generated as a static site for
GitHub Pages. Started from the [Landing-page](https://github.com/0984043505Frong/Landing-page)
project and stripped down.

## Run it

Needs Node 22 (`.nvmrc`).

```sh
npm ci
npm run dev          # development server: http://localhost:3000/Business-site/
npm run generate     # static site in .output/public
npm run preview      # serve that build: http://localhost:4174/Business-site/
npm run lint
npm run typecheck
npm run test:unit
npm run test:e2e     # needs `npm run generate` first and `npx playwright install chromium` once
```

## Where things are

- Pages: `app/pages/` (Thai at `/Business-site/<page>/`, English at `/Business-site/en/<page>/`).
- Texts of both languages: `i18n/locales/th.json` and `en.json`.
- Site URL, menu and the demo notice in the footer: `app/data/site.ts`.
- Phone, email, booking and LINE links: `app/data/contact.ts` (see `TODO(line)` there).
- Colours and fonts: `app/assets/css/theme.css`.

© 2026 0984043505Frong
