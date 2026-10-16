import type { AboutContent, Localized, LocalizedPhrases, PageHeadText, PageName, SectionText } from '../types/content'
import { photos } from './photos'

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

/** The about page (spec 3): the shop's story next to a photo, then the team (app/data/team.ts). */
export const about = {
  story: {
    eyebrow: { th: 'เรื่องราวของเรา', en: 'Our story' },
    title: { th: ['เริ่มจากมือคู่เดียว ', 'กับลูกประคบที่ห่อเอง'], en: 'It started with one pair of hands and a home-made compress' },
    paragraphs: [
      {
        th: 'นวลไพลเริ่มจากห้องนวดเล็ก ๆ สองเตียงของคุณนวลจันทร์ หมอนวดแผนไทยที่ทำงานมากว่า 20 ปี ทุกเช้าเธอห่อลูกประคบเองด้วยไพล ขมิ้น และตะไคร้สด ก่อนเปิดร้านรับลูกค้าคนแรก',
        en: 'Nuanplai began as a small room with two massage beds, run by Nuanchan, a Thai massage therapist with more than 20 years of practice. Every morning she wrapped her own compresses with fresh plai, turmeric and lemongrass before the first guest arrived.',
      },
      {
        th: 'วันนี้ร้านมีห้องนวด 6 ห้องและหมอนวด 4 คน แต่เรายังทำแบบเดิม: ถามก่อนทุกครั้งว่าแรงไปไหม ใช้สมุนไพรสดทุกวัน และให้เวลากับลูกค้าแต่ละคนเต็มที่ ไม่เร่งรอบ',
        en: 'Today we have six rooms and four therapists, and we still work the same way: we ask whether the pressure is right, use fresh herbs every day, and give every guest their full time, never rushing.',
      },
      {
        th: 'เราอยากให้ทุกคนที่เดินเข้ามา ไม่ว่าจะเป็นคนในละแวกนี้หรือนักท่องเที่ยว ได้พักจริง ๆ สักชั่วโมง แล้วกลับออกไปพร้อมร่างกายที่เบาลง',
        en: 'Whether you live nearby or are visiting, we want you to really rest for an hour and leave feeling lighter.',
      },
    ],
    photo: photos.about,
  },
  team: {
    eyebrow: { th: 'ทีมของเรา', en: 'Our team' },
    title: { th: ['หมอนวด', 'ของเรา'], en: 'Our therapists' },
    text: {
      th: 'ทุกคนผ่านหลักสูตรนวดแผนไทย และดูแลลูกค้าของนวลไพลมาหลายปี',
      en: 'Every one of them is certified in Thai massage and has looked after our guests for years.',
    },
  },
} satisfies AboutContent

/** The line under the gallery grid (spec 2, Gallery): the photos are stock photos, not the shop. */
export const galleryNote: Localized = {
  th: 'ภาพประกอบจาก Unsplash / Pexels — ไม่ใช่ร้านจริง',
  en: 'Illustrative photos from Unsplash / Pexels — not a real shop',
}
