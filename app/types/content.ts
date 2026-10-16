/**
 * Shapes of the site data in app/data/.
 *
 * Every data file is checked against these types (`satisfies <Type>`, or a type annotation where
 * pages need the general type), so a missing or misspelled field fails `npm run typecheck`
 * before it can reach the page.
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

/** A heading or short line in both languages: Thai as phrases (G-007), English as a plain string. */
export type LocalizedPhrases = Localized<ThaiText>

/** The pages of the site, in menu order. Each name is also the key of its texts in i18n/locales/. */
export type PageName = 'home' | 'services' | 'about' | 'gallery' | 'contact'

/** A page in the menu. `path` is the Thai (default) path; English paths get the /en prefix. */
export interface NavItem {
  page: PageName
  path: `/${string}`
}

export interface Site {
  /** Brand name, shown in the header, the footer and the page titles. */
  name: Localized
  /** The Latin line under the Thai logo, the same in both languages. */
  logoSubtitle: string
  /** Absolute URL of the live site, ending with '/'. Its path is also the Nuxt base URL. */
  url: string
  nav: NavItem[]
  /** Says that the brand and its data are fictional. The same Thai line on every page (N10). */
  disclaimer: ThaiText
}

export interface OpeningHours {
  /** Which days the shop is open, as shown before the time: 'เปิดทุกวัน' / 'Open every day'. */
  open: Localized
  /** Opening and closing time, kept on one line: '10:00–22:00 น.'. */
  time: Localized
  /** The last time a massage can start. */
  lastBooking: Localized
}

/**
 * The map on the contact page (D-003).
 * - 'illustration': a drawn map with no real place, and no request to Google (the default).
 * - 'google': a Google Maps embed of `embedUrl`, loaded lazily in an <iframe> named by `title`.
 */
export interface MapConfig {
  mode: 'illustration' | 'google'
  /** The `src` of a Google Maps "Embed a map" code: https://www.google.com/maps/embed?pb=... */
  embedUrl: string
  /** The iframe's title, which screen readers announce: what the map shows. */
  title: Localized
}

export interface Contact {
  phoneDisplay: string
  phoneHref: `tel:${string}`
  email: string
  /** A line in place of the street address of this fictional brand. */
  address: Localized
  hours: OpeningHours
  /** Where every "จองคิว" (book now) button leads: the booking form on the contact page (D-002). */
  bookingPath: `/${string}#${string}`
  line: {
    /** Where the LINE button leads. A path in this site, or the client's own LINE link. */
    href: string
    label: Localized
  }
  map: MapConfig
}

/** A therapist on the about page. Made up, and shown with a letter avatar instead of a photo (N12). */
export interface TeamMember {
  id: string
  name: Localized
  /** The letter in the round avatar. Thai names can start with a vowel sign, so it is written out. */
  initial: Localized
  role: Localized
  /** Years of experience, shown as "ประสบการณ์ 12 ปี" / "12 years of experience". */
  years: number
  /** What the therapist is best at, shown after the years. Thai as phrases, so a line breaks only between them. */
  specialty: LocalizedPhrases
}

/** Where a photo comes from. Every photo has a row in CREDITS.md as well. */
export interface PhotoCredit {
  photographer: string
  /** The photo's page on Unsplash or Pexels. */
  page: `https://${string}`
  license: 'Unsplash License' | 'Pexels License'
  /** The original JPEG (about 2000px wide) that scripts/fetch-photos.mjs downloads. */
  download: `https://${string}`
}

/** One WebP file in public/images/, cropped from the centre of the original to width × height. */
export interface PhotoFile {
  /** Path inside public/images/, e.g. 'svc-thai.webp' or 'gallery/foot-thumb.webp'. */
  file: string
  width: number
  height: number
}

/** A photo shown in a page. */
export interface Photo {
  /** Copies with the same aspect ratio, smallest first; together they make the `srcset`. */
  files: [PhotoFile, ...PhotoFile[]]
  alt: Localized
  credit: PhotoCredit
}

/** A photo of the gallery: a square thumbnail in the grid and the whole photo in the lightbox. */
export interface GalleryPhoto {
  id: string
  thumb: PhotoFile
  /** The uncropped photo, at most 1600px on its long side. Loaded only when the lightbox opens. */
  full: PhotoFile
  alt: Localized
  credit: PhotoCredit
}

/** The texts above a section: a small label, the heading and an optional line under it. */
export interface SectionText {
  eyebrow: Localized
  title: LocalizedPhrases
  text?: Localized
}

/** The heading block at the top of a page; its small label is the page's menu name. */
export interface PageHeadText {
  title: LocalizedPhrases
  lead: Localized
}

export interface HomeContent {
  hero: {
    eyebrow: Localized
    title: LocalizedPhrases
    /** Words of the title shown in the accent colour. Must appear in the title as written. */
    titleAccent?: Localized
    lead: Localized
    /** The small card on the photo. */
    note: { title: LocalizedPhrases, text: Localized }
    photo: Photo
  }
  featured: SectionText
  why: SectionText & {
    photo: Photo
    reasons: { title: Localized, text: Localized }[]
  }
  reviews: SectionText
}

/** One length of a service and its price. */
export interface ServiceOption {
  minutes: number
  /** In Thai baht, everything included. */
  price: number
}

export interface ServiceItem {
  /** Unique across all categories. */
  id: string
  name: Localized
  description: Localized
  /** Shortest first. The home page shows the first one as "from … baht". */
  options: [ServiceOption, ...ServiceOption[]]
  /** Packages: what the package is made of. */
  includes?: Localized
  /** Shown as one of the three cards on the home page, with this photo. */
  featured?: { photo: Photo }
}

export interface ServiceCategory {
  /** Also the id of the category's section on the services page (#thai). */
  id: string
  /** A short name that fits on one line, also used for the category links. */
  name: Localized
  description: Localized
  items: [ServiceItem, ...ServiceItem[]]
}

export interface Review {
  id: string
  /** The customer's name as shown, e.g. 'คุณพิมพ์ชนก'. Made up (N12). */
  name: Localized
  /** The letter in the round avatar. Thai names can start with a vowel sign, so it is written out. */
  initial: Localized
  /** The service the customer had. */
  service: Localized
  quote: Localized
  /** Stars out of 5. */
  rating: 1 | 2 | 3 | 4 | 5
}

export interface AboutContent {
  story: {
    eyebrow: Localized
    title: LocalizedPhrases
    /** Two or three paragraphs. */
    paragraphs: Localized[]
    photo: Photo
  }
  /** The heading above the team cards; the team itself is in app/data/team.ts. */
  team: SectionText
}

/**
 * Texts of the booking form on the contact page (N8). The checks themselves are in
 * app/utils/validateBooking.ts; each error code they return has a message here.
 */
export interface BookingFormContent {
  title: LocalizedPhrases
  intro: Localized
  requiredNote: Localized
  /** Read by screen readers after a required field's label, in place of the visible "*". */
  requiredLabel: Localized
  optionalLabel: Localized
  fields: {
    name: { label: Localized }
    phone: { label: Localized }
    service: { label: Localized, placeholder: Localized }
    message: { label: Localized, placeholder: Localized }
  }
  notSureLabel: Localized
  errors: { [Field in BookingField]: { [Code in BookingErrorCodes[Field]]: LocalizedPhrases } }
  submitLabel: Localized
  success: {
    title: LocalizedPhrases
    message: Localized
    /** N8: says that nothing was sent. */
    note: LocalizedPhrases
    resetLabel: Localized
  }
}

/** Values typed into the booking form. */
export interface BookingRequest {
  name: string
  phone: string
  /** A service id from app/data/services.ts, or NOT_SURE_SERVICE_ID. */
  service: string
  message: string
}

export type BookingField = keyof BookingRequest

/** What can be wrong with a required text field that has a minimum and a maximum length. */
export type TextLengthError = 'required' | 'tooShort' | 'tooLong'

/** What can be wrong with each field. */
export interface BookingErrorCodes {
  name: TextLengthError
  phone: 'required' | 'invalid'
  service: 'required' | 'invalid'
  message: 'tooLong'
}

/** One error code per invalid field. Valid fields are left out, so `{}` means the form is valid. */
export type BookingErrors = { [Field in BookingField]?: BookingErrorCodes[Field] }
