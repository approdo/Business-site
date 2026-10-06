import type { Site } from '../types/content'

// Besides the pages, this file is loaded by nuxt.config.ts, playwright.config.ts and
// scripts/stage-preview.mjs (plain Node). Keep it free of runtime imports so that
// all of them can read it as it is.
export const site = {
  // TODO(brand): placeholder until the design is chosen (BS-001); BS-004 sets the brand name.
  name: 'Demo Spa',
  // The one place for the site URL: its path ('/Business-site/') becomes the Nuxt base URL.
  url: 'https://0984043505frong.github.io/Business-site/',
  // The five pages, in menu order. Their names and texts are in i18n/locales/.
  nav: [
    { page: 'home', path: '/' },
    { page: 'services', path: '/services/' },
    { page: 'about', path: '/about/' },
    { page: 'gallery', path: '/gallery/' },
    { page: 'contact', path: '/contact/' },
  ],
  // Shown word for word in the footer of every page, in both languages (N10). English pages add
  // a translation after it (footer.disclaimerTranslation in i18n/locales/en.json).
  // Joined, the phrases give back the exact line.
  disclaimer: ['เว็บไซต์ตัวอย่าง', 'เพื่อแสดงผลงาน · ', 'แบรนด์และข้อมูล', 'เป็นสมมติ'],
} satisfies Site
