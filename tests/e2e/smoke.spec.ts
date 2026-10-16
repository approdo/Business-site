import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import { site } from '../../app/data/site'

// Every page in both languages (D-004): Thai without a prefix, English under /en/.
// The site path without its trailing slash, '/Business-site', to put in front of a page path.
const sitePath = new URL(site.url).pathname.replace(/\/$/, '')
const N10 = 'เว็บไซต์ตัวอย่างเพื่อแสดงผลงาน · แบรนด์และข้อมูลเป็นสมมติ'
const readMessages = (locale: 'th' | 'en') =>
  JSON.parse(readFileSync(new URL(`../../i18n/locales/${locale}.json`, import.meta.url), 'utf8'))
const messages = { th: readMessages('th'), en: readMessages('en') }

const routes = site.nav.flatMap(({ page, path }) => [
  { page, locale: 'th' as const, path, otherPath: `/en${path}` },
  { page, locale: 'en' as const, path: `/en${path}`, otherPath: path },
])

for (const route of routes) {
  test(`${route.locale} ${route.page} (${route.path}) loads with its header and footer`, async ({ page }) => {
    const failedRequests: string[] = []
    page.on('response', (response) => {
      if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`)
    })

    // Relative to the preview URL, which ends with /Business-site/ (playwright.config.ts).
    const response = await page.goto(`.${route.path}`, { waitUntil: 'networkidle' })

    expect(response?.status()).toBe(200)
    expect(new URL(page.url()).pathname).toBe(`${sitePath}${route.path}`)
    await expect(page.locator('html')).toHaveAttribute('lang', route.locale)
    await expect(page.locator('h1')).toHaveCount(1)

    // The language switch leads to the same page in the other language.
    const languageSwitch = page.locator('#site-header a[hreflang]')
    await expect(languageSwitch).toHaveAttribute('href', `${sitePath}${route.otherPath}`)

    // "จองคิว" in the header leads to the booking form in the same language (D-002).
    const bookingPath = route.locale === 'th' ? '/contact/#booking' : '/en/contact/#booking'
    const bookingButton = page.locator('#site-header').getByRole('link', { name: messages[route.locale].header.booking, exact: true })
    await expect(bookingButton).toHaveAttribute('href', `${sitePath}${bookingPath}`)

    // N10, word for word, on every page; English pages add a translation after it.
    await expect(page.locator('#site-disclaimer')).toHaveText(N10)
    if (route.locale === 'en') await expect(page.locator('#site-footer')).toContainText('Demo website')

    expect(failedRequests).toEqual([])
  })
}

test('the language switch keeps the visitor on the same page', async ({ page }) => {
  await page.goto('./services/')
  await page.locator('#site-header a[hreflang="en"]').click()
  await expect(page).toHaveURL(/\/Business-site\/en\/services\/$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')

  await page.locator('#site-header a[hreflang="th"]').click()
  await expect(page).toHaveURL(/\/Business-site\/services\/$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'th')
})
