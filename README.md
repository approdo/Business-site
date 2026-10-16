# Business-site (demo)

A five-page website in Thai and English for a made-up Thai massage & spa shop, Nuanplai (นวลไพล).
It is a portfolio demo: the brand and every detail on the site are fictional.

> Work in progress: the home and services pages are done; about, gallery and contact come next.
> This README is completed with them.

Planned live site: <https://approdo.github.io/Business-site/>

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

Images (need internet and the Playwright Chromium; look at the results before committing):

```sh
npm run photos        # downloads the photos in app/data/photos.ts, writes WebP files to public/images/
npm run brand-images  # favicon, apple-touch-icon and link-preview image from the theme colours
```

## Where things are

- Pages: `app/pages/` (Thai at `/Business-site/<page>/`, English at `/Business-site/en/<page>/`).
- Services and prices: `app/data/services.ts` — the services page and the three home-page cards
  (`featured`) are built from it.
- Home page texts and reviews: `app/data/home.ts`, `app/data/reviews.ts`; page headings and the
  booking band: `app/data/pages.ts`.
- Short interface texts of both languages: `i18n/locales/th.json` and `en.json`.
- Site URL, menu and the demo notice in the footer: `app/data/site.ts`.
- Phone, email, opening hours, booking and LINE links: `app/data/contact.ts` (see `TODO(line)` there).
- Colours, fonts, corner radii: `app/assets/css/theme.css`.
- Photos: `app/data/photos.ts` and `public/images/`; credits in [CREDITS.md](CREDITS.md).

© 2026 0984043505Frong
