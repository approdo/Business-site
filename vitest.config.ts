import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

// Unit tests cover plain TypeScript (form logic and content data) and the few components that
// need nothing from Nuxt (MapEmbed), so they run in Node without starting Nuxt. The Vue plugin
// compiles those .vue files. Browser tests live in tests/e2e and run with Playwright.
export default defineConfig({
  plugins: [vue()],
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
})
