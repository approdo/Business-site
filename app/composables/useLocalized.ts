import type { LocaleCode, Localized } from '~/types/content'

/**
 * Returns a function that picks the current language's text from `{ th, en }` data (D-004):
 *
 *   const localized = useLocalized()
 *   localized(contact.line.label) // the Thai label on Thai pages, 'LINE (demo)' on English pages
 *
 * The two languages may hold different types, e.g. Thai phrases (string[]) and an English string.
 */
export function useLocalized() {
  const { locale } = useI18n()
  return <T extends Localized<unknown>>(text: T): T[LocaleCode] => text[locale.value as LocaleCode]
}
