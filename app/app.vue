<script setup lang="ts">
import { site } from '~/data/site'

const localized = useLocalized()

// <html lang>, the canonical link, the hreflang links to the same page in the other language,
// og:url and og:locale (D-004). All of them start with site.url (D-010).
const i18nHead = useLocaleHead()

// @nuxtjs/i18n writes the Thai home page as '.../Business-site', without the '/' that GitHub Pages
// redirects to; give the canonical and hreflang links and og:url the URL that is served as it is.
const siteUrlWithoutSlash = site.url.replace(/\/$/, '')
function withSlash<T>(url: T) {
  return url === siteUrlWithoutSlash ? site.url : url
}
const i18nLinks = computed(() => i18nHead.value.link?.map(link => ({ ...link, href: withSlash(link.href) })))
const i18nMeta = computed(() => i18nHead.value.meta?.map(meta => ({ ...meta, content: withSlash(meta.content) })))

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nLinks.value,
  meta: i18nMeta.value,
  titleTemplate: (title?: string) => (title ? `${title} · ${localized(site.name)}` : localized(site.name)),
}))

// The link preview (made by scripts/generate-brand-images.mjs), the same for every page.
// Open Graph needs an absolute URL; site.url already ends with the base path.
useSeoMeta({
  ogType: 'website',
  ogSiteName: () => localized(site.name),
  ogImage: `${site.url}og-image.png`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: () => `${localized(site.name)} · ${site.logoSubtitle}`,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
