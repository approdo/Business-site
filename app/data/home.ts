import type { HomeContent } from '../types/content'
import { photos } from './photos'

// Texts of the home page. The three service cards come from app/data/services.ts (`featured`),
// the reviews from app/data/reviews.ts. Thai headings are lists of phrases (G-007, spec 5).
export const home = {
  hero: {
    eyebrow: { th: 'นวดแผนไทย & สปา', en: 'Thai massage & spa' },
    title: {
      th: ['มือที่นุ่มนวล ', 'กลิ่นไพลที่อบอุ่น'],
      en: 'Gentle hands and the warm scent of plai',
    },
    titleAccent: { th: 'กลิ่นไพล', en: 'scent of plai' },
    lead: {
      th: 'นวดแผนไทยและสปาโดยหมอนวดประสบการณ์กว่า 10 ปี ใช้ลูกประคบไพลที่ห่อสดทุกเช้า ในห้องที่เงียบ สะอาด และหอมสมุนไพรอ่อน ๆ',
      en: 'Thai massage and spa treatments by therapists with more than 10 years of experience, with plai herbal compresses wrapped fresh every morning, in quiet, clean rooms with a soft scent of herbs.',
    },
    note: {
      title: { th: ['ลูกประคบ', 'ห่อสดทุกเช้า'], en: 'Compresses wrapped fresh every morning' },
      text: { th: 'ไพล ขมิ้น ตะไคร้ ใบมะขาม', en: 'Plai, turmeric, lemongrass, tamarind leaves' },
    },
    photo: photos.hero,
  },
  featured: {
    eyebrow: { th: 'บริการแนะนำ', en: 'Our favourites' },
    title: {
      th: ['3 บริการ ', 'ที่ลูกค้าเลือกบ่อยที่สุด'],
      en: 'The three treatments our guests choose most',
    },
  },
  why: {
    eyebrow: { th: 'ทำไมต้องนวลไพล', en: 'Why Nuanplai' },
    title: {
      th: ['ใส่ใจทุกรายละเอียด ', 'ตั้งแต่ก้าวแรกที่เข้าร้าน'],
      en: 'Care in every detail, from the moment you walk in',
    },
    photo: photos.why,
    reasons: [
      {
        title: { th: 'หมอนวดประสบการณ์ 10 ปีขึ้นไป', en: 'Therapists with 10+ years of experience' },
        text: {
          th: 'ทุกคนผ่านหลักสูตรนวดไทย และฝึกกับร้านอีก 3 เดือนก่อนรับลูกค้าจริง',
          en: 'Every therapist is certified in Thai massage and trains with us for three more months before seeing guests.',
        },
      },
      {
        title: { th: 'ลูกประคบห่อสดทุกเช้า', en: 'Compresses wrapped fresh every morning' },
        text: {
          th: 'ใช้ไพล ขมิ้น ตะไคร้ และใบมะขามสด ไม่ใช้ลูกประคบแห้งค้างคืน',
          en: 'Fresh plai, turmeric, lemongrass and tamarind leaves — never yesterday\'s dried compresses.',
        },
      },
      {
        title: { th: 'สะอาดทุกเตียง ทุกรอบ', en: 'A clean bed for every guest' },
        text: {
          th: 'เปลี่ยนผ้าปูและผ้าขนหนูใหม่ทุกครั้ง ห้องนวดเปิดระบายอากาศทุกชั่วโมง',
          en: 'Fresh sheets and towels every time, and the rooms are aired every hour.',
        },
      },
      {
        title: { th: 'ราคาชัดเจน ไม่มีบวกเพิ่ม', en: 'Clear prices, nothing added' },
        text: {
          th: 'ราคาบนเว็บคือราคาที่จ่ายจริง ไม่มีค่าบริการแอบแฝง',
          en: 'The price on this site is the price you pay, with no hidden service charge.',
        },
      },
    ],
  },
  reviews: {
    eyebrow: { th: 'เสียงจากลูกค้า', en: 'What our guests say' },
    title: {
      th: ['กลับมาอีก ', 'เพราะรู้สึกดีจริง'],
      en: 'They come back because it feels good',
    },
  },
} satisfies HomeContent
