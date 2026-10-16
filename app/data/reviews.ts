import type { Review } from '../types/content'

// Reviews on the home page. The customers and their words are made up for this demo brand;
// there are no photos of them (N12).
export const reviews = [
  {
    id: 'pimchanok',
    name: { th: 'คุณพิมพ์ชนก', en: 'Pimchanok' },
    initial: { th: 'พ', en: 'P' },
    service: { th: 'นวดแผนไทย 120 นาที', en: 'Traditional Thai massage, 120 min' },
    quote: {
      th: 'นวดไทยมือหนักกำลังดี หมอถามก่อนตลอดว่าแรงไปไหม ออกมาตัวเบามาก คืนนั้นนอนหลับยาวถึงเช้า',
      en: 'Just the right pressure, and the therapist kept checking it wasn\'t too strong. I felt so light afterwards and slept right through the night.',
    },
    rating: 5,
  },
  {
    id: 'thanakorn',
    name: { th: 'คุณธนากร', en: 'Thanakorn' },
    initial: { th: 'ธ', en: 'T' },
    service: { th: 'นวดไทย + ประคบสมุนไพร', en: 'Thai massage with herbal compress' },
    quote: {
      th: 'ลูกประคบหอมไพลมาก ร้อนกำลังดี ไหล่ที่ตึงมาเป็นเดือนคลายลงเยอะ จองรอบหน้าไว้แล้ว',
      en: 'The compress smelled wonderful and was just hot enough. Shoulders that had been stiff for a month loosened up a lot. I\'ve already booked again.',
    },
    rating: 5,
  },
  {
    id: 'emma',
    name: { th: 'คุณเอมมา', en: 'Emma' },
    initial: { th: 'E', en: 'E' },
    service: { th: 'นวดน้ำมันอโรมา 90 นาที', en: 'Aromatherapy oil massage, 90 min' },
    quote: {
      th: 'ห้องเงียบ กลิ่นหอมอ่อน ๆ นวดน้ำมันแล้วเผลอหลับไปเลย จองผ่านเว็บง่าย ได้คิวตรงเวลา',
      en: 'A quiet room with a soft scent. I fell asleep during the oil massage. Booking online was easy and they took me right on time.',
    },
    rating: 5,
  },
] satisfies Review[]
