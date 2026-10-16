import type { LocalizedPhrases, PageHeadText, PageName, SectionText } from '../types/content'

// The heading block at the top of every page except the home page (spec 3). Its small label is the
// page's menu name (nav.<page> in i18n/locales/). Thai headings are lists of phrases (G-007).
export const pageHeads = {
  services: {
    title: { th: ['ราคาชัดเจน ', 'เลือกตามเวลาที่มี'], en: 'Clear prices for the time you have' },
    lead: {
      th: 'นวดไทย นวดน้ำมัน สปาหน้า และแพ็กเกจ เลือกความยาวได้ตามเวลาที่มี ราคาบนหน้านี้คือราคาที่จ่ายจริง',
      en: 'Thai massage, oil massage, facials and packages. Choose the length that fits your day; the price on this page is the price you pay.',
    },
  },
  about: {
    title: { th: ['ร้านเล็ก ๆ ', 'ที่ตั้งใจกับทุกมือที่นวด'], en: 'A small shop that cares about every massage' },
    lead: {
      th: 'เรื่องราวของนวลไพล และหมอนวดที่ดูแลคุณ',
      en: 'The story of Nuanplai and the therapists who look after you.',
    },
  },
  gallery: {
    title: { th: ['บรรยากาศ', 'ในร้านนวลไพล'], en: 'Inside Nuanplai' },
    lead: {
      th: 'ห้องนวด สมุนไพร และรายละเอียดเล็ก ๆ ที่เราใส่ใจ',
      en: 'Our rooms, our herbs and the small details we care about.',
    },
  },
  contact: {
    title: { th: ['จองคิว', 'หรือสอบถาม', 'ได้ทุกวัน'], en: 'Book or ask us, any day' },
    lead: {
      th: 'ส่งข้อความถึงเรา หรือโทรหาร้านได้ตามเวลาเปิด',
      en: 'Send us a message, or call the shop during opening hours.',
    },
  },
} satisfies Record<Exclude<PageName, 'home'>, PageHeadText>

/** The dark band with the booking buttons at the end of most pages (spec 2, BookingBand). */
export const bookingBand = {
  eyebrow: { th: 'จองล่วงหน้า', en: 'Book ahead' },
  title: { th: ['ถึงเวลาให้ร่างกาย ', 'ได้พักแล้ว'], en: 'Time to give your body a rest' },
  text: {
    th: 'จองคิวล่วงหน้าเพื่อเลือกเวลาและหมอนวดที่ต้องการ — วันเสาร์–อาทิตย์คิวเต็มเร็ว แนะนำให้จองก่อน 1 วัน',
    en: 'Book ahead to choose your time and therapist. Weekends fill up fast, so we suggest booking a day before.',
  },
} satisfies SectionText

/** A note under the price list (spec 3). */
export const priceNote: LocalizedPhrases = {
  th: ['ราคารวมทุกอย่างแล้ว ', 'ไม่มีบวกเพิ่ม'],
  en: 'Prices include everything. Nothing is added.',
}
