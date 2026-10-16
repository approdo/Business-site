import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import { bookingForm } from '../../app/data/bookingForm'
import { contact } from '../../app/data/contact'
import { about } from '../../app/data/pages'
import { galleryPhotos } from '../../app/data/photos'
import { serviceCategories } from '../../app/data/services'
import { site } from '../../app/data/site'
import { team } from '../../app/data/team'
import type { LocaleCode } from '../../app/types/content'
import { joinPhrases } from '../../app/utils/phrases'

// The main flows of the site (N17, BS-005): every page through the menu in both languages, the
// language switch on every page, the about page, the gallery lightbox, the contact page and its
// booking form. Counts come from the data files (G-018).

const sitePath = new URL(site.url).pathname.replace(/\/$/, '')
const readMessages = (locale: LocaleCode) =>
  JSON.parse(readFileSync(new URL(`../../i18n/locales/${locale}.json`, import.meta.url), 'utf8'))
const messages = { th: readMessages('th'), en: readMessages('en') }
const locales: LocaleCode[] = ['th', 'en']
const prefixOf = (locale: LocaleCode) => (locale === 'th' ? '' : '/en')

const routes = site.nav.flatMap(({ page, path }) => locales.map(locale => ({
  page,
  locale,
  path: `${prefixOf(locale)}${path}`,
  other: locale === 'th' ? 'en' as const : 'th' as const,
  otherPath: `${prefixOf(locale === 'th' ? 'en' : 'th')}${path}`,
})))

const pathname = (page: Page) => new URL(page.url()).pathname

// In-page links jump instead of gliding, so positions can be read right after a click (G-023).
test.use({ reducedMotion: 'reduce' })

/** The element is in the window and its top is not under the sticky header (G-023). */
async function expectBelowHeader(page: Page, selector: string) {
  await expect(page.locator(selector)).toBeInViewport()
  const { top, headerBottom } = await page.evaluate(target => ({
    top: document.querySelector(target)!.getBoundingClientRect().top,
    headerBottom: document.getElementById('site-header')!.getBoundingClientRect().bottom,
  }), selector)
  expect(top).toBeGreaterThanOrEqual(headerBottom - 1)
}

test.describe('menu and language switch', () => {
  for (const locale of locales) {
    test(`${locale}: the menu leads to each of the five pages`, async ({ page }) => {
      await page.goto(`.${prefixOf(locale)}/`)
      for (const item of site.nav) {
        const name = messages[locale].nav[item.page]
        await page.locator('#site-nav').getByRole('link', { name, exact: true }).click()
        await expect.poll(() => pathname(page)).toBe(`${sitePath}${prefixOf(locale)}${item.path}`)
        await expect(page.locator('h1')).toBeVisible()
        await expect(page.locator('#site-nav a[aria-current="page"]')).toHaveText(name)
      }
    })
  }

  for (const route of routes) {
    test(`${route.locale} ${route.page}: the language switch opens the same page in the other language`, async ({ page }) => {
      await page.goto(`.${route.path}`)
      await page.locator('#site-header a[hreflang]').click()
      await expect.poll(() => pathname(page)).toBe(`${sitePath}${route.otherPath}`)
      await expect(page.locator('html')).toHaveAttribute('lang', route.other)
    })

    test(`${route.locale} ${route.page}: every booking and LINE link leads to the booking form, every phone link to the demo number (D-002)`, async ({ page }) => {
      await page.goto(`.${route.path}`)
      const bookingHref = `${sitePath}${prefixOf(route.locale)}${contact.bookingPath}`
      for (const name of [messages[route.locale].header.booking, contact.line.label[route.locale]]) {
        const links = page.getByRole('link', { name, exact: true })
        expect(await links.count(), name).toBeGreaterThan(0)
        for (const href of await links.evaluateAll(elements => elements.map(link => link.getAttribute('href')))) {
          expect(href, name).toBe(bookingHref)
        }
      }
      for (const href of await page.locator('a[href^="tel:"]').evaluateAll(elements => elements.map(link => link.getAttribute('href')))) {
        expect(href).toBe(contact.phoneHref)
      }
      await expect(page.locator('a[href*="line.me"]')).toHaveCount(0)
      await expect(page.locator('#booking')).toHaveCount(route.page === 'contact' ? 1 : 0)
    })
  }
})

test.describe('phone width', () => {
  test.use({ viewport: { width: 375, height: 800 } })

  for (const route of routes) {
    test(`${route.locale} ${route.page}: nothing is wider than the 375px window (N4)`, async ({ page }) => {
      await page.goto(`.${route.path}`)
      await page.evaluate(() => document.fonts.ready)
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }))
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth)
    })
  }
})

test.describe('about (AC1)', () => {
  for (const locale of locales) {
    test(`${locale}: the story, and a letter avatar for each therapist with no photo of a person`, async ({ page }) => {
      await page.goto(`.${prefixOf(locale)}/about/`)
      const story = page.locator('section[aria-labelledby="story-title"]')
      await expect(story.locator('h2')).toHaveText(joinPhrases(about.story.title[locale]))
      for (const paragraph of about.story.paragraphs) await expect(story).toContainText(paragraph[locale])

      const cards = page.locator('section[aria-labelledby="team-title"] li')
      await expect(cards).toHaveCount(team.length)
      for (const [index, member] of team.entries()) {
        const card = cards.nth(index)
        await expect(card.locator('h3')).toHaveText(member.name[locale])
        await expect(card.locator('span[aria-hidden="true"]').first()).toHaveText(member.initial[locale])
      }
      await expect(page.locator('section[aria-labelledby="team-title"] img')).toHaveCount(0)
      // The only photo on the page is the story photo (flowers in brass bowls).
      await expect(page.locator('main img')).toHaveCount(1)
    })
  }
})

test.describe('gallery (AC2)', () => {
  const fullFile = (index: number) => galleryPhotos.at(index)!.full.file

  async function openGallery(page: Page, path = './gallery/') {
    const fullRequests: string[] = []
    page.on('request', (request) => {
      const file = new URL(request.url()).pathname.split('/images/')[1]
      if (file && galleryPhotos.some(photo => photo.full.file === file)) fullRequests.push(file)
    })
    await page.goto(path, { waitUntil: 'networkidle' })
    await page.locator('ul[data-hydrated]').waitFor()
    return fullRequests
  }

  test('shows every photo as a lazy WebP thumbnail button, and loads no large photo before one is opened', async ({ page }) => {
    const fullRequests = await openGallery(page)
    const buttons = page.locator('main button[aria-haspopup="dialog"]')
    await expect(buttons).toHaveCount(galleryPhotos.length)
    for (const [index, photo] of galleryPhotos.entries()) {
      const image = buttons.nth(index).locator('img')
      await expect(image).toHaveAttribute('src', new RegExp(`${photo.thumb.file}$`))
      await expect(image).toHaveAttribute('loading', 'lazy')
      await expect(buttons.nth(index)).toHaveAccessibleName(photo.alt.th)
    }
    expect(fullRequests).toEqual([])
  })

  test('the keyboard opens the lightbox, moves through the photos, and Escape closes it with the focus back on the photo', async ({ page }) => {
    const fullRequests = await openGallery(page)
    const dialog = page.locator('dialog')
    const counter = dialog.locator('p').first()
    const total = galleryPhotos.length
    const thumbnail = page.locator('[data-photo-index="1"]')

    await thumbnail.focus()
    await page.keyboard.press('Enter')
    await expect(dialog).toHaveAttribute('open', '')
    await expect(dialog.getByRole('button', { name: messages.th.gallery.close })).toBeFocused()
    await expect(dialog.locator('img')).toHaveAttribute('src', new RegExp(`${fullFile(1)}$`))
    await expect(dialog.locator('#lightbox-caption')).toContainText(galleryPhotos[1]!.alt.th)
    await expect(dialog.locator('#lightbox-caption')).toContainText(galleryPhotos[1]!.credit.photographer)
    await expect(counter).toHaveText(`2 / ${total}`)

    await page.keyboard.press('ArrowRight')
    await expect(counter).toHaveText(`3 / ${total}`)
    await expect(dialog.locator('img')).toHaveAttribute('src', new RegExp(`${fullFile(2)}$`))
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowLeft')
    await page.keyboard.press('ArrowLeft')
    // Before the first photo comes the last one.
    await expect(counter).toHaveText(`${total} / ${total}`)
    await expect(dialog.locator('img')).toHaveAttribute('src', new RegExp(`${fullFile(-1)}$`))

    await page.keyboard.press('Escape')
    await expect(dialog).not.toHaveAttribute('open')
    await expect(thumbnail).toBeFocused()
    await expect(dialog.locator('img')).toHaveCount(0)
    expect(fullRequests).toContain(fullFile(1))
  })

  test('the buttons move through the photos and close the lightbox, and so does a click beside the photo', async ({ page }) => {
    await openGallery(page, './en/gallery/')
    const dialog = page.locator('dialog')
    const thumbnail = page.locator('[data-photo-index="0"]')
    const total = galleryPhotos.length

    await thumbnail.click()
    await dialog.getByRole('button', { name: messages.en.gallery.next }).click()
    await expect(dialog.locator('p').first()).toHaveText(`2 / ${total}`)
    await expect(dialog.locator('#lightbox-caption')).toContainText(galleryPhotos[1]!.alt.en)
    await dialog.getByRole('button', { name: messages.en.gallery.previous }).click()
    await expect(dialog.locator('p').first()).toHaveText(`1 / ${total}`)
    await dialog.getByRole('button', { name: messages.en.gallery.close }).click()
    await expect(dialog).not.toHaveAttribute('open')
    await expect(thumbnail).toBeFocused()

    // From 768px the lightbox is a centred box; a click on the dark backdrop beside it closes it.
    await thumbnail.click()
    await expect(dialog).toHaveAttribute('open', '')
    await page.mouse.click(10, 360)
    await expect(dialog).not.toHaveAttribute('open')
    await expect(thumbnail).toBeFocused()
  })
})

test.describe('contact (AC3, AC5)', () => {
  test('the map is the drawn sample map, with no iframe and no request to Google', async ({ page }) => {
    const googleRequests: string[] = []
    page.on('request', (request) => {
      if (request.url().includes('google.')) googleRequests.push(request.url())
    })
    await page.goto('./contact/', { waitUntil: 'networkidle' })
    const map = page.getByRole('img', { name: messages.th.contact.mapLabel })
    await map.scrollIntoViewIfNeeded()
    await expect(map).toBeVisible()
    await expect(page.locator('iframe')).toHaveCount(0)
    expect(googleRequests).toEqual([])
  })

  for (const locale of locales) {
    test(`${locale}: the phone button calls the demo number and the LINE button brings the form into view`, async ({ page }) => {
      await page.goto(`.${prefixOf(locale)}/contact/`)
      const details = page.locator('section[aria-labelledby="hours-title"]')
      await expect(details.getByRole('link', { name: `${messages[locale].call} ${contact.phoneDisplay}` }))
        .toHaveAttribute('href', 'tel:+6620000000')
      await details.getByRole('link', { name: contact.line.label[locale], exact: true }).click()
      await expect.poll(() => new URL(page.url()).hash).toBe('#booking')
      await expectBelowHeader(page, '#booking')
    })
  }
})

test.describe('booking form (AC4, N8)', () => {
  async function openContact(page: Page, locale: LocaleCode) {
    await page.goto(`.${prefixOf(locale)}/contact/`)
    await page.locator('form[data-hydrated]').waitFor()
    return page.locator('#booking form')
  }

  for (const locale of locales) {
    test(`${locale}: an empty form shows an error under each required field and focuses the first one`, async ({ page }) => {
      const form = await openContact(page, locale)
      // A submit the page does not handle must not become a GET with the values in the URL (G-035).
      await expect(form).toHaveAttribute('method', 'dialog')
      await expect(form).toHaveAttribute('novalidate')

      await form.getByRole('button', { name: bookingForm.submitLabel[locale] }).click()
      await expect(page.locator('#f-name')).toBeFocused()
      for (const field of ['name', 'phone', 'service'] as const) {
        const control = page.locator(`#f-${field}`)
        await expect(control).toHaveAttribute('aria-invalid', 'true')
        await expect(control).toHaveAttribute('aria-describedby', new RegExp(`f-${field}-error`))
        await expect(page.locator(`#f-${field}-error`)).toHaveText(joinPhrases(bookingForm.errors[field].required[locale]))
      }
      await expect(page.locator('#f-message')).not.toHaveAttribute('aria-invalid')
      expect(new URL(page.url()).search).toBe('')

      // A wrong phone number gets its own message, which goes away once the number is fixed.
      await page.locator('#f-name').fill('สมชาย ใจดี')
      await page.locator('#f-phone').fill('12345')
      await form.getByRole('button', { name: bookingForm.submitLabel[locale] }).click()
      await expect(page.locator('#f-phone')).toBeFocused()
      await expect(page.locator('#f-phone-error')).toHaveText(joinPhrases(bookingForm.errors.phone.invalid[locale]))
      await page.locator('#f-phone').fill('02-000-0000')
      await expect(page.locator('#f-phone-error')).toHaveCount(0)
    })

    test(`${locale}: a valid request shows the thank-you message, sends nothing, and the booking links reach it before and after`, async ({ page }) => {
      const form = await openContact(page, locale)

      // Before sending, the header's booking button brings the form below the header.
      await page.locator('#site-header').getByRole('link', { name: messages[locale].header.booking, exact: true }).click()
      await expectBelowHeader(page, '#booking')

      const requests: string[] = []
      page.on('request', request => requests.push(request.url()))
      await page.locator('#f-name').fill('สมชาย ใจดี')
      await page.locator('#f-phone').fill('02-000-0000')
      await page.locator('#f-service').selectOption(serviceCategories[0]!.items[0]!.id)
      await page.locator('#f-message').fill('Saturday afternoon, please')
      await form.getByRole('button', { name: bookingForm.submitLabel[locale] }).click()

      const status = page.getByRole('status')
      await expect(status).toBeVisible()
      await expect(form).toBeHidden()
      await expect(status.locator('h2')).toHaveText(joinPhrases(bookingForm.success.title[locale]))
      await expect(status.locator('h2')).toBeFocused()
      await expect(status).toContainText(joinPhrases(bookingForm.success.note[locale]))
      // Nothing leaves the browser (TODO(formspree)). The wait gives a request, if the form made one, time to start.
      await page.waitForTimeout(500)
      expect(requests).toEqual([])
      expect(new URL(page.url()).search).toBe('')

      // After sending, the booking links still have a target: the thank-you message in the same card (G-021).
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.locator('#site-header').getByRole('link', { name: messages[locale].header.booking, exact: true }).click()
      await expectBelowHeader(page, '#booking')
      await expect(status).toBeInViewport()

      // "Send another message" brings back an empty form, ready to type into.
      await page.getByRole('button', { name: bookingForm.success.resetLabel[locale] }).click()
      await expect(form).toBeVisible()
      await expect(page.locator('#f-name')).toBeFocused()
      await expect(page.locator('#f-name')).toHaveValue('')
    })
  }
})
