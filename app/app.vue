<script setup lang="ts">
import { site } from '~/data/site'

// <html lang>, the hreflang links to the same page in the other language, and og:locale (D-004).
const i18nHead = useLocaleHead()

// @nuxtjs/i18n writes the Thai home page as '.../Business-site', without the '/' that GitHub Pages
// redirects to; give the canonical and hreflang links the URL that is served as it is.
const siteUrlWithoutSlash = site.url.replace(/\/$/, '')
const i18nLinks = computed(() => i18nHead.value.link?.map(link =>
  link.href === siteUrlWithoutSlash ? { ...link, href: site.url } : link))

useHead(() => ({
  htmlAttrs: i18nHead.value.htmlAttrs,
  link: i18nLinks.value,
  meta: i18nHead.value.meta,
  titleTemplate: (title?: string) => (title ? `${title} · ${site.name}` : site.name),
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
