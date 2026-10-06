import type { PageName } from '~/types/content'

/**
 * Sets the <title> and the description of a page in the current language.
 * The texts are `pages.<page>.title` and `pages.<page>.description` in i18n/locales/;
 * app.vue adds the brand name to the title.
 */
export function usePageHead(page: PageName) {
  const { t } = useI18n()
  useSeoMeta({
    title: () => t(`pages.${page}.title`),
    description: () => t(`pages.${page}.description`),
  })
}
