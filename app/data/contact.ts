import type { Contact } from '../types/content'

// All contact details of the site live in this file only (D-002).
// They are placeholders for a fictional brand: the phone number is not a real line and
// `.example` is a reserved domain (RFC 2606). Replace them with the client's own details.
export const contact = {
  phoneDisplay: '02-000-0000',
  phoneHref: 'tel:+6620000000',
  email: 'hello@nuanplai.example',
  // A fictional brand has no shop to visit, so no street, district or city is given.
  address: {
    th: 'ที่อยู่ตัวอย่าง — แบรนด์สมมติ ไม่มีหน้าร้านจริง',
    en: 'Sample address — a fictional brand with no real shop',
  },
  hours: {
    open: { th: 'เปิดทุกวัน', en: 'Open every day' },
    time: { th: '10:00–22:00 น.', en: '10:00–22:00' },
    lastBooking: { th: '20:30 น.', en: '20:30' },
  },
  // Every "จองคิว" (book now) button leads here, in the visitor's language.
  bookingPath: '/contact/#booking',
  // TODO(line): Demo brand with no LINE account, so the LINE button must not link to any LINE ID,
  // LINE URL or QR code (D-002). It leads to the booking form like the "จองคิว" buttons.
  // When reusing this template for a client, set `href` to the client's LINE Official Account
  // link (https://lin.ee/...) and drop "(ตัวอย่าง)" / "(demo)" from the label.
  // Links that start with http(s) open in a new tab (app/utils/links.ts).
  line: {
    href: '/contact/#booking',
    label: { th: 'LINE (ตัวอย่าง)', en: 'LINE (demo)' },
  },
  // TODO(map): The contact page shows a drawn sample map with no real place on it, and makes no
  // request to Google (D-003). To show the client's shop on Google Maps instead:
  // 1. Open the shop on https://www.google.com/maps, choose Share > Embed a map, and copy the
  //    address in src="..." of the code (it starts with https://www.google.com/maps/embed?pb=).
  // 2. Set `embedUrl` to that address and `mode` to 'google'.
  // The map then loads in an <iframe> when it scrolls into view (app/components/MapEmbed.vue).
  map: {
    mode: 'illustration',
    embedUrl: '',
    title: { th: 'แผนที่ร้านนวลไพลบน Google Maps', en: 'Map of Nuanplai on Google Maps' },
  },
} satisfies Contact
