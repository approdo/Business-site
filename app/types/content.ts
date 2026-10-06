/**
 * Shapes of the site data in app/data/.
 *
 * Every data file ends with `satisfies <Type>`, so a missing or misspelled field
 * fails `npm run typecheck` before it can reach the page.
 */

/** Codes of the site's languages (nuxt.config.ts > i18n.locales). Thai is the default (D-004). */
export type LocaleCode = 'th' | 'en'

/**
 * Text written once per language (D-004): `{ th: 'จองคิว', en: 'Book now' }`.
 * Show it with useLocalized() (app/composables/useLocalized.ts), which picks the current language.
 */
export type Localized<T = string> = Record<LocaleCode, T>

/**
 * Thai text whose line breaks are controlled (Landing-page D-009, lesson G-007).
 *
 * - A string: the browser may break the line anywhere its Thai dictionary allows.
 * - A list of phrases: the line may break only between two phrases, never inside one.
 *   The phrases are joined exactly as written, so a space between two phrases goes at
 *   the end of the first one: ['เว็บไซต์ตัวอย่าง', 'เพื่อแสดงผลงาน · ', 'แบรนด์และข้อมูล'].
 *
 * Show it with the <PhraseText> component. Where plain text is needed (<title>, meta tags,
 * aria-label, <option>), use joinPhrases() from app/utils/phrases.ts.
 */
export type ThaiText = string | readonly string[]

/** The pages of the site, in menu order. Each name is also the key of its texts in i18n/locales/. */
export type PageName = 'home' | 'services' | 'about' | 'gallery' | 'contact'

/** A page in the menu. `path` is the Thai (default) path; English paths get the /en prefix. */
export interface NavItem {
  page: PageName
  path: `/${string}`
}

export interface Site {
  /** Brand name, shown in the header, the footer and the page titles. */
  name: string
  /** Absolute URL of the live site, ending with '/'. Its path is also the Nuxt base URL. */
  url: string
  nav: NavItem[]
  /** Says that the brand and its data are fictional. The same Thai line on every page (N10). */
  disclaimer: ThaiText
}

export interface Contact {
  phoneDisplay: string
  phoneHref: `tel:${string}`
  email: string
  /** Where every "จองคิว" (book now) button leads: the booking form on the contact page (D-002). */
  bookingPath: `/${string}#${string}`
  line: {
    /** Where the LINE button leads. A path in this site, or the client's own LINE link. */
    href: string
    label: Localized
  }
}
