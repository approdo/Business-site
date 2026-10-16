import { site } from '~/data/site'
import type { PageName } from '~/types/content'

/**
 * Sets the <title>, the description and their Open Graph copies for a page in the current language.
 * The texts are `pages.<page>.title` and `pages.<page>.description` in i18n/locales/;
 * app.vue adds the brand name to the title, and the shared Open Graph tags.
 */
export function usePageHead(page: PageName) {
  const { t } = useI18n()
  const localized = useLocalized()
  useSeoMeta({
    title: () => t(`pages.${page}.title`),
    description: () => t(`pages.${page}.description`),
    ogTitle: () => `${t(`pages.${page}.title`)} · ${localized(site.name)}`,
    ogDescription: () => t(`pages.${page}.description`),
  })
}
