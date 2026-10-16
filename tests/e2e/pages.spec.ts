import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { serviceCategories } from '../../app/data/services'
import { site } from '../../app/data/site'

const th = JSON.parse(readFileSync(new URL('../../i18n/locales/th.json', import.meta.url), 'utf8'))

// Images and <head> of every page in both languages (BS-004, BS-005), and the content of the home
// and services pages. Counts come from the data files, so adding a service or a category needs no
// change here (G-018). The booking links and id="booking" are checked in flows.spec.ts.

const pages = site.nav.flatMap(({ page, path }) => [
  { name: `th ${page}`, path: `.${path}` },
  { name: `en ${page}`, path: `./en${path}` },
])

const featuredCount = serviceCategories.flatMap(category => category.items).filter(item => item.featured).length
const itemCount = serviceCategories.reduce((count, category) => count + category.items.length, 0)

/** The URL on the preview server of a file the page refers to, also for absolute site URLs (og:image). */
function previewUrl(page: Page, href: string) {
  return new URL(href.replace(site.url, new URL(site.url).pathname), page.url()).href
}

for (const { name, path } of pages) {
  test(`${name}: every image is a WebP with size, alt text and lazy loading below the hero (N9)`, async ({ page }) => {
    await page.goto(path)
    const images = await page.locator('img').evaluateAll(elements => elements.map(img => ({
      src: img.getAttribute('src') ?? '',
      width: img.getAttribute('width'),
      height: img.getAttribute('height'),
      alt: img.getAttribute('alt'),
      loading: img.getAttribute('loading'),
      fetchpriority: img.getAttribute('fetchpriority'),
    })))

    for (const image of images) {
      expect(image.src, image.src).toMatch(/\.webp$/)
      expect(Number(image.width), image.src).toBeGreaterThan(0)
      expect(Number(image.height), image.src).toBeGreaterThan(0)
      expect(image.alt?.trim(), image.src).toBeTruthy()
      // Only the hero photo loads right away; it asks for a high priority.
      if (image.src.includes('/hero-')) expect(image.fetchpriority).toBe('high')
      else expect(image.loading, image.src).toBe('lazy')
    }
  })

  test(`${name}: the icons and the link preview in <head> exist (G-020)`, async ({ page, request }) => {
    await page.goto(path)
    const hrefs = [
      ...await page.locator('head link[rel="icon"], head link[rel="apple-touch-icon"]').evaluateAll(links => links.map(link => link.getAttribute('href') ?? '')),
      await page.locator('head meta[property="og:image"]').getAttribute('content') ?? '',
    ]
    expect(hrefs).toHaveLength(3)
    for (const href of hrefs) {
      const response = await request.get(previewUrl(page, href))
      expect(response.status(), href).toBe(200)
    }
  })

  test(`${name}: the canonical link and og:url start with the site URL (D-010)`, async ({ page }) => {
    await page.goto(path)
    const canonical = await page.locator('head link[rel="canonical"]').getAttribute('href')
    expect(canonical?.startsWith(site.url)).toBe(true)
    await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute('content', canonical ?? '')
  })
}

test('the home page shows a card for every featured service, and a link to all prices', async ({ page }) => {
  await page.goto('./')
  await expect(page.locator('#featured-title')).toBeVisible()
  await expect(page.locator('section[aria-labelledby="featured-title"] article')).toHaveCount(featuredCount)
  await page.getByRole('link', { name: th.services.seeAll }).click()
  await expect(page).toHaveURL(/\/Business-site\/services\/$/)
})

test('the services page shows every category and service from the data, with working category links', async ({ page }) => {
  await page.goto('./services/')
  for (const category of serviceCategories) {
    await expect(page.locator(`section#${category.id}`)).toHaveCount(1)
  }
  await expect(page.locator('section[id] h3')).toHaveCount(itemCount)

  const lastCategory = serviceCategories.at(-1)!
  await page.locator(`nav a[href="#${lastCategory.id}"]`).click()
  await expect(page).toHaveURL(new RegExp(`/Business-site/services/#${lastCategory.id}$`))
  await expect(page.locator(`#${lastCategory.id}-title`)).toBeInViewport()
})
