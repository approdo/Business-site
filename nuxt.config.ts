import tailwindcss from '@tailwindcss/vite'
import { site } from './app/data/site'

// GitHub Pages serves this project under a sub-path, '/Business-site/'.
// It is taken from the site URL and set here on purpose, not through NUXT_APP_BASE_URL:
// Git Bash on Windows rewrites environment values that start with '/' into Windows paths.
const siteUrl = new URL(site.url)
const baseURL = siteUrl.pathname

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxtjs/i18n'],
  components: [
    // Icon components go by their file name (IconMenu), without the folder prefix (IconsIconMenu).
    { path: '~/components/icons', pathPrefix: false },
    '~/components',
  ],
  devtools: { enabled: true },
  app: {
    baseURL,
    head: {
      link: [
        // Nuxt does not add the base URL to files in public/, so join it by hand (G-020).
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` },
        { rel: 'apple-touch-icon', href: `${baseURL}apple-touch-icon.png` },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  experimental: {
    // Static pages without data fetching: skip the separate _payload.json request.
    payloadExtraction: false,
  },
  compatibilityDate: '2026-09-27',
  vite: {
    plugins: [tailwindcss()],
  },
  typescript: {
    // `npm run typecheck` also checks the tests and the test runner configs.
    nodeTsConfig: {
      include: ['../tests/**/*', '../vitest.config.ts', '../playwright.config.ts'],
    },
  },
  eslint: {
    // Also check formatting (2-space indent, single quotes, no semicolons).
    config: { stylistic: true },
  },
  fonts: {
    // Self-hosted at build time, so visitors never connect to Google Fonts.
    // Only three weights are loaded, to keep the font files small on phones (spec 1):
    // body text 400 and 600, headings 600.
    families: [
      { name: 'Noto Sans Thai', weights: [400, 600] },
      { name: 'Noto Serif Thai', weights: [600] },
    ],
    defaults: {
      styles: ['normal'],
      subsets: ['thai', 'latin'],
      preload: true,
    },
  },
  // Two languages, each with its own URLs (D-004): Thai at /Business-site/<page>/,
  // English at /Business-site/en/<page>/. `nuxt generate` writes the pages of both.
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'th',
    locales: [
      { code: 'th', language: 'th', file: 'th.json' },
      { code: 'en', language: 'en', file: 'en.json' },
    ],
    // A static site has no server to redirect by the browser's language: every visitor gets the
    // language of the URL they opened and switches with the button in the header.
    detectBrowserLanguage: false,
    // Links end with '/', like the folders that `nuxt generate` writes (services/index.html),
    // so GitHub Pages serves them without a redirect.
    trailingSlash: true,
    // Origin for the absolute URLs in the hreflang links; the base path is added by the router.
    baseUrl: siteUrl.origin,
  },
})
