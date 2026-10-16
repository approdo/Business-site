import type { TeamMember } from '../types/content'

// The therapists on the about page, in this order. The names and details are made up for this
// demo brand, and each person is shown with a letter avatar instead of a photo (N12).
// To add a person, add an object with a unique `id`; the about page shows every entry.
export const team = [
  {
    id: 'nuanchan',
    name: { th: 'นวลจันทร์', en: 'Nuanchan' },
    initial: { th: 'น', en: 'N' },
    role: { th: 'ผู้ก่อตั้ง · หมอนวดอาวุโส', en: 'Founder · senior therapist' },
    years: 22,
    specialty: { th: ['ถนัดนวดไทย', 'และประคบสมุนไพร'], en: 'Thai massage and herbal compresses' },
  },
  {
    id: 'somsri',
    name: { th: 'สมศรี', en: 'Somsri' },
    initial: { th: 'ส', en: 'S' },
    role: { th: 'หมอนวด', en: 'Therapist' },
    years: 15,
    specialty: { th: ['ถนัดนวดฝ่าเท้า'], en: 'Foot reflexology' },
  },
  {
    id: 'malai',
    name: { th: 'มาลัย', en: 'Malai' },
    initial: { th: 'ม', en: 'M' },
    role: { th: 'หมอนวด', en: 'Therapist' },
    years: 12,
    specialty: { th: ['ถนัดนวดน้ำมันอโรมา'], en: 'Aromatherapy oil massage' },
  },
  {
    id: 'preecha',
    name: { th: 'ปรีชา', en: 'Preecha' },
    initial: { th: 'ป', en: 'P' },
    role: { th: 'หมอนวด', en: 'Therapist' },
    years: 10,
    specialty: { th: ['ถนัดนวดคลายกล้ามเนื้อ', 'และหินร้อน'], en: 'Deep tissue and hot stone massage' },
  },
] satisfies TeamMember[]
