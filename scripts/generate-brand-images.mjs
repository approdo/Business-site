// Makes the site's icons and link-preview image (G-020):
//
//   public/favicon.svg           browser tab icon: a terracotta arch with a gold diamond
//   public/apple-touch-icon.png  180×180 home-screen icon for iPhone and iPad, fully opaque
//   public/og-image.png          1200×630 preview shown when a link to the site is shared
//
// Colours are read from app/assets/css/theme.css and text from app/data/site.ts. After changing
// the brand there, run `npm run brand-images`, look at the three files and commit them.
//
// The arch is the shape of the photo frames of design A (--radius-arch) and the diamond is the
// ornament under its headings. The favicon has no letters: a tab icon cannot load web fonts.
//
// The PNG files are rendered by the Chromium that the e2e tests use (@playwright/test; install it
// once with `npx playwright install chromium`). Rendering needs internet: the page loads the
// site's fonts, Noto Serif Thai and Noto Sans Thai, from Google Fonts. Only this script does that;
// the site itself serves its own copy of the fonts.
import { readFile, stat, writeFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'
// Node 22.18+ strips TypeScript types on import, so this reads the same data as the site.
import { site } from '../app/data/site.ts'

const publicDir = new URL('../public/', import.meta.url)
const themeCss = await readFile(new URL('../app/assets/css/theme.css', import.meta.url), 'utf8')

/** Reads a colour token, e.g. themeColor('accent') returns '#a4471f'. */
function themeColor(name) {
  const match = themeCss.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{3,8});`))
  if (!match) throw new Error(`--color-${name} is missing from app/assets/css/theme.css`)
  return match[1]
}

const color = {
  bg: themeColor('bg'),
  accent: themeColor('accent'),
  gold: themeColor('gold'),
  goldLight: themeColor('gold-light'),
  deep: themeColor('deep'),
  onDeep: themeColor('on-deep'),
  onDeepMuted: themeColor('on-deep-muted'),
}

function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// ---------------------------------------------------------------------------------------------
// favicon.svg — an arch (a rectangle with a round top) in terracotta, with a cream diamond in it.
// Plain shapes, so it stays sharp at 16px.
// ---------------------------------------------------------------------------------------------
function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <!-- ${escapeHtml(site.name.en)} mark. Made by scripts/generate-brand-images.mjs: change the script, not this file. -->
  <path d="M4 31V15a12 12 0 0 1 24 0v16z" fill="${color.accent}"/>
  <path d="M16 13l5 5-5 5-5-5z" fill="${color.bg}"/>
</svg>
`
}

// ---------------------------------------------------------------------------------------------
// PNG files: small HTML pages rendered by Chromium, with the site's fonts.
// ---------------------------------------------------------------------------------------------
const FONT_STYLESHEET = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;600&family=Noto+Serif+Thai:wght@600&display=block'

function htmlPage(styles, body) {
  return `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="${FONT_STYLESHEET}">
<style>
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 100%; height: 100%; }
  body { font-family: 'Noto Sans Thai', sans-serif; }
  .serif { font-family: 'Noto Serif Thai', serif; font-weight: 600; }
  ${styles}
</style>
</head>
<body>${body}</body>
</html>`
}

// iOS rounds the corners of home-screen icons itself, and fills transparent pixels with black.
// So the icon is a full cream square with the terracotta arch and the first letter of the brand.
const appleTouchIcon = {
  file: 'apple-touch-icon.png',
  width: 180,
  height: 180,
  html: htmlPage(`
    body { display: grid; place-items: center; background: ${color.bg}; }
    .arch {
      display: grid; place-items: center; width: 116px; height: 136px; margin-top: 12px;
      border-radius: 999px 999px 14px 14px; background: ${color.accent};
      color: ${color.bg}; font-size: 84px; line-height: 1; padding-top: 22px;
    }
  `, `<span class="arch serif">${escapeHtml([...site.name.th][0])}</span>`),
}

// Link preview: the word mark on the dark teak of the booking band, with its faint gold circles.
// Everything sits in the middle, because some apps crop the preview to a square.
// No people, phone numbers, LINE ID or QR code (N12, D-002).
const ogImage = {
  file: 'og-image.png',
  width: 1200,
  height: 630,
  maxBytes: 300 * 1024,
  html: htmlPage(`
    body {
      position: relative; overflow: hidden; display: grid; place-content: center; justify-items: center;
      background: ${color.deep}; text-align: center;
    }
    .circle { position: absolute; width: 520px; height: 520px; border-radius: 50%; border: 2px solid ${color.gold}59; }
    .circle.one { left: -220px; top: -260px; }
    .circle.two { right: -220px; bottom: -280px; }
    .name { color: ${color.onDeep}; font-size: 150px; line-height: 1.3; }
    .subtitle { margin-top: 8px; color: ${color.goldLight}; font-size: 26px; font-weight: 600; letter-spacing: .22em; }
    .ornament { margin-top: 36px; width: 144px; height: 28px; }
  `, `
    <span class="circle one"></span><span class="circle two"></span>
    <h1 class="name serif">${escapeHtml(site.name.th)}</h1>
    <p class="subtitle">${escapeHtml(site.logoSubtitle)}</p>
    <svg class="ornament" viewBox="0 0 72 14" aria-hidden="true">
      <path d="M0 7h26M46 7h26" stroke="${color.gold}"/><path d="M36 1l6 6-6 6-6-6z" fill="${color.gold}"/>
    </svg>
  `),
}

/** Throws if the fonts did not load, instead of saving an image in a fallback font. */
async function waitForFonts(page) {
  const loaded = await page.evaluate(async (checks) => {
    await document.fonts.ready
    const faces = []
    for (const [font, text] of checks) faces.push(...await document.fonts.load(font, text))
    return faces.length > 0 && faces.every(face => face.status === 'loaded')
  }, [['600 16px "Noto Serif Thai"', site.name.th], ['600 16px "Noto Sans Thai"', site.logoSubtitle]])
  if (!loaded) throw new Error('The fonts did not load from Google Fonts. Check the internet connection.')
}

async function renderPng(browser, image) {
  const page = await browser.newPage({ viewport: { width: image.width, height: image.height }, deviceScaleFactor: 1 })
  await page.setContent(image.html, { waitUntil: 'load' })
  await waitForFonts(page)
  const png = await page.screenshot({ type: 'png' })
  await page.close()

  // A PNG of colour type 2 (RGB) has no alpha channel, so no pixel can be transparent.
  const colorType = png[25]
  if (colorType !== 2) throw new Error(`${image.file}: expected an RGB PNG without alpha (colour type 2), got ${colorType}`)
  if (image.maxBytes && png.length > image.maxBytes) throw new Error(`${image.file}: ${png.length} bytes, more than ${image.maxBytes}`)
  return png
}

async function save(file, content) {
  const url = new URL(file, publicDir)
  await writeFile(url, content)
  const { size } = await stat(url)
  console.log(`public/${file}  ${(size / 1024).toFixed(1)} kB`)
}

await save('favicon.svg', faviconSvg())

const browser = await chromium.launch()
try {
  for (const image of [appleTouchIcon, ogImage]) {
    await save(image.file, await renderPng(browser, image))
  }
}
finally {
  await browser.close()
}
