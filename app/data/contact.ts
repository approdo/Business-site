import type { Contact } from '../types/content'

// All contact details of the site live in this file only (D-002).
// They are placeholders for a fictional brand: the phone number is not a real line and
// `.example` is a reserved domain (RFC 2606). Replace them with the client's own details.
export const contact = {
  phoneDisplay: '02-000-0000',
  phoneHref: 'tel:+6620000000',
  email: 'hello@nuanplai.example',
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
} satisfies Contact
