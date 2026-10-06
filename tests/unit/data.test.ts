import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { contact } from '../../app/data/contact'
import { site } from '../../app/data/site'
import { joinPhrases } from '../../app/utils/phrases'

type Messages = { [key: string]: string | Messages }

function readMessages(locale: 'th' | 'en'): Messages {
  return JSON.parse(readFileSync(new URL(`../../i18n/locales/${locale}.json`, import.meta.url), 'utf8'))
}

/** Every message as [dotted key, text], e.g. ['pages.home.title', 'Home']. */
function entriesOf(messages: Messages, prefix = ''): [string, string][] {
  return Object.entries(messages).flatMap(([key, value]): [string, string][] =>
    typeof value === 'string' ? [[`${prefix}${key}`, value]] : entriesOf(value, `${prefix}${key}.`))
}

function keysOf(messages: Messages): string[] {
  return entriesOf(messages).map(([key]) => key)
}

const th = readMessages('th')
const en = readMessages('en')

describe('site', () => {
  it('is served under /Business-site/', () => {
    expect(new URL(site.url).pathname).toBe('/Business-site/')
  })

  it('lists five pages with unique names and paths ending in /', () => {
    expect(site.nav).toHaveLength(5)
    expect(new Set(site.nav.map(item => item.page)).size).toBe(site.nav.length)
    for (const item of site.nav) expect(item.path).toMatch(/\/$/)
  })

  it('shows the fictional-brand line word for word (N10)', () => {
    expect(joinPhrases(site.disclaimer)).toBe('เว็บไซต์ตัวอย่างเพื่อแสดงผลงาน · แบรนด์และข้อมูลเป็นสมมติ')
  })
})

describe('locale messages', () => {
  it('have the same keys in Thai and English, apart from the English-only translation of N10', () => {
    const englishOnly = ['footer.disclaimerTranslation']
    expect(keysOf(th).sort()).toEqual(keysOf(en).filter(key => !englishOnly.includes(key)).sort())
  })

  it('have a menu label, a title and a description for every page', () => {
    const keys = new Set([...keysOf(th), ...keysOf(en)])
    for (const { page } of site.nav) {
      for (const key of [`nav.${page}`, `pages.${page}.title`, `pages.${page}.description`]) {
        expect(keys, key).toContain(key)
      }
    }
  })

  it('contain no "@", "{", "}", "|" or "$", which vue-i18n reads as message syntax', () => {
    for (const [key, text] of [...entriesOf(th), ...entriesOf(en)]) {
      expect(text, key).not.toMatch(/[@{}|$]/)
    }
  })
})

describe('contact (D-002)', () => {
  it('uses the placeholder phone number and a reserved email domain', () => {
    expect(contact.phoneDisplay).toBe('02-000-0000')
    expect(contact.phoneHref).toBe('tel:+6620000000')
    expect(contact.email).toMatch(/\.example$/)
  })

  it('sends every booking and LINE button to the booking form', () => {
    expect(contact.bookingPath).toBe('/contact/#booking')
    expect(contact.line.href).toBe(contact.bookingPath)
  })

  it('has a LINE label in both languages and no link to LINE', () => {
    expect(contact.line.label.th).not.toBe('')
    expect(contact.line.label.en).not.toBe('')
    expect(JSON.stringify(contact)).not.toContain('line.me')
  })
})
