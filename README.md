# Business-site (demo)

A five-page website in Thai and English for a made-up Thai massage & spa shop, Nuanplai (นวลไพล):
home, services & prices, about us, gallery and contact.
It is a portfolio demo: the brand, people, prices, reviews, phone number and address are fictional,
and the photos are stock photos, not a real shop.

- Live site: <https://approdo.github.io/Business-site/>
- Repository: <https://github.com/approdo/Business-site>

## Stack

Nuxt 4 + Tailwind CSS 4, `@nuxt/fonts` and `@nuxtjs/i18n`, generated as a static site for
GitHub Pages under the sub-path `/Business-site/`. Thai pages are at `/Business-site/<page>/`,
English pages at `/Business-site/en/<page>/`. No backend: the booking form only checks what is typed.
Started from the [Landing-page](https://github.com/0984043505Frong/Landing-page) project and stripped down.

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

Pushing to `main` runs the same checks on GitHub Actions and publishes the site to GitHub Pages
(`.github/workflows/deploy.yml`).

## Change the content

Everything a visitor reads is in `app/data/` (both languages side by side, `{ th, en }`) or in
`i18n/locales/th.json` and `en.json` (short interface texts). Pages and components hold no text.

| What | Where |
|---|---|
| Services, lengths and prices | `app/data/services.ts` — the services page and the three home-page cards (`featured`) are built from it, and so is the list in the booking form |
| Team | `app/data/team.ts` — name, avatar letter, role, years of experience, specialty |
| Opening hours, phone, email, booking and LINE links, map | `app/data/contact.ts` |
| Home page texts and reviews | `app/data/home.ts`, `app/data/reviews.ts` |
| Page headings, about-page story, booking band | `app/data/pages.ts` |
| Booking form labels and error messages | `app/data/bookingForm.ts` (the checks: `app/utils/validateBooking.ts`) |
| Site URL, menu, the demo notice in the footer | `app/data/site.ts` |
| Photos | `app/data/photos.ts`, files in `public/images/` |

Thai headings are written as lists of phrases, e.g. `['หมอนวด', 'ของเรา']`: a line may break only
between two phrases, never in the middle of a word.

### Colours and fonts

All colours, fonts, corner radii and shadows are tokens in `app/assets/css/theme.css`. Change a value
there and rebuild; every page follows.

### Show the shop on Google Maps

The contact page shows a drawn sample map with no real place on it, and makes no request to Google.
To show the client's shop instead, follow `TODO(map)` in `app/data/contact.ts`: on Google Maps choose
**Share → Embed a map**, copy the address inside `src="..."`, set it as `map.embedUrl` and set
`map.mode` to `'google'`. The map then loads lazily in an `<iframe>`.

### Add the real LINE account

The LINE buttons are labelled "(ตัวอย่าง)" / "(demo)" and lead to the booking form, because this
fictional brand has no LINE account. Follow `TODO(line)` in `app/data/contact.ts`: set `line.href`
to the client's LINE Official Account link (`https://lin.ee/...`) and remove "(demo)" from the label.
Web links there open in a new tab.

### Receive the booking form

The form checks the name, phone number and chosen service, then shows a thank-you message;
nothing is sent. To receive the requests, follow `TODO(formspree)` in `app/utils/submitBooking.ts`
(for example a [Formspree](https://formspree.io) form) and change the form in
`app/components/BookingForm.vue` from `method="dialog"` to `method="post"` with the form's `action`.

## Photos and credits

Photos are from Unsplash and Pexels, under their own free licenses. Every file, its photographer
and its source are listed in [CREDITS.md](CREDITS.md). To change a photo, edit `app/data/photos.ts`,
then (with internet and the Playwright Chromium):

```sh
npm run photos        # downloads the originals, writes cropped WebP files to public/images/
npm run brand-images  # favicon, apple-touch-icon and link-preview image from the theme colours
```

Look at the new files and update `CREDITS.md` before committing.

Other third-party parts: icons from [Lucide](https://lucide.dev) and the LINE icon from
[Simple Icons](https://simpleicons.org) (licences in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md));
fonts Noto Sans Thai and Noto Serif Thai (SIL Open Font License 1.1), downloaded by `@nuxt/fonts`
at build time and served by the site itself.

## Licence

© 2026 0984043505Frong. All rights reserved.

There is no LICENSE file in this repository, on purpose: you are welcome to read the code, but
using, copying or selling it needs the author's permission. The photos, icons and fonts keep their
own licences.
