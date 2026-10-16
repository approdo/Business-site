import type { BookingFormContent } from '../types/content'

// Texts of the booking form on the contact page (N8). The checks are in app/utils/validateBooking.ts,
// and the services to choose from come from app/data/services.ts. Thai headings and the longer error
// are lists of phrases: a line may break only between two phrases (G-007).
export const bookingForm = {
  title: { th: ['ฝากชื่อและเบอร์ ', 'แล้วเราโทรกลับ'], en: 'Leave your number and we\'ll call you back' },
  intro: {
    th: 'บอกบริการที่สนใจและเวลาที่สะดวก ร้านจะโทรกลับเพื่อยืนยันคิวในเวลาเปิด',
    en: 'Tell us the treatment you\'d like and when suits you. We\'ll call back during opening hours to confirm.',
  },
  requiredNote: { th: 'ช่องที่มีเครื่องหมาย * จำเป็นต้องกรอก', en: 'Fields marked * are required.' },
  requiredLabel: { th: '(จำเป็น)', en: '(required)' },
  optionalLabel: { th: '(ไม่บังคับ)', en: '(optional)' },
  fields: {
    name: { label: { th: 'ชื่อ', en: 'Name' } },
    phone: { label: { th: 'เบอร์โทร', en: 'Phone number' } },
    service: {
      label: { th: 'บริการที่สนใจ', en: 'Treatment' },
      placeholder: { th: 'เลือกบริการ', en: 'Choose a treatment' },
    },
    message: {
      label: { th: 'ข้อความ', en: 'Message' },
      placeholder: {
        th: 'เช่น วันและเวลาที่สะดวก หรือจุดที่ปวดเมื่อย',
        en: 'For example a day and time that suit you, or where it aches',
      },
    },
  },
  notSureLabel: { th: 'ยังไม่แน่ใจ — ขอคำแนะนำ', en: 'Not sure yet — please advise' },
  errors: {
    name: {
      required: { th: 'กรุณากรอกชื่อ', en: 'Please enter your name.' },
      tooShort: { th: 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร', en: 'Your name needs at least 2 characters.' },
      tooLong: { th: 'ชื่อต้องไม่เกิน 100 ตัวอักษร', en: 'Your name can have at most 100 characters.' },
    },
    phone: {
      required: { th: 'กรุณากรอกเบอร์โทร', en: 'Please enter your phone number.' },
      // Each example number stays in one phrase, so a line never breaks inside it.
      invalid: {
        th: ['กรุณากรอกเบอร์โทร', 'ให้ถูกต้อง ', 'เช่น 08x-xxx-xxxx ', 'หรือ 02-xxx-xxxx'],
        en: 'Please enter a Thai phone number, for example 08x-xxx-xxxx or +66 8x-xxx-xxxx.',
      },
    },
    service: {
      required: { th: 'กรุณาเลือกบริการที่สนใจ', en: 'Please choose a treatment.' },
      invalid: { th: 'กรุณาเลือกบริการจากรายการ', en: 'Please choose a treatment from the list.' },
    },
    message: {
      tooLong: { th: 'ข้อความต้องไม่เกิน 1,000 ตัวอักษร', en: 'Your message can have at most 1,000 characters.' },
    },
  },
  submitLabel: { th: 'ส่งข้อความ', en: 'Send message' },
  success: {
    title: { th: ['ขอบคุณ', 'ที่ติดต่อนวลไพล'], en: 'Thank you for contacting Nuanplai' },
    message: {
      th: 'ร้านจะโทรกลับเพื่อยืนยันคิวภายในวันเดียวกัน ในเวลาเปิด',
      en: 'We\'ll call you back the same day, during opening hours, to confirm your booking.',
    },
    // N8, word for word on Thai pages. Joined, the phrases give back the exact line.
    note: {
      th: ['(เว็บไซต์ตัวอย่าง — ', 'ข้อมูลในฟอร์ม', 'ไม่ได้ถูกส่งจริง)'],
      en: '(Demo website — the form data was not actually sent.)',
    },
    resetLabel: { th: 'ส่งอีกครั้ง', en: 'Send another message' },
  },
} satisfies BookingFormContent
