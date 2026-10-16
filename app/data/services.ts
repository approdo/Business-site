import type { ServiceCategory } from '../types/content'
import { photos } from './photos'

// Services and prices (N11). The services page shows every category and item from this list,
// in this order; the home page shows the three items marked `featured`.
//
// To add a service, add an item to its category: a unique `id`, the name and description in both
// languages, and one or more `options` (minutes, price in baht), shortest first. To add a category,
// add an object with a unique `id`; its section on the services page gets that id (#thai).
// Prices are made up for this demo brand.
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'thai',
    name: { th: 'นวดไทย', en: 'Thai massage' },
    description: {
      th: 'กดจุดและยืดเหยียดตามแนวเส้นแบบไทยดั้งเดิม ใส่ชุดนวดที่ร้านเตรียมไว้ให้',
      en: 'Traditional pressure and stretching along the body\'s energy lines, in loose clothes we provide.',
    },
    items: [
      {
        id: 'thai-traditional',
        name: { th: 'นวดแผนไทย', en: 'Traditional Thai massage' },
        description: {
          th: 'กดจุดและยืดเหยียดตามแนวเส้นแบบไทยดั้งเดิม คลายความตึงจากการนั่งทำงานนาน ๆ ตัวเบา นอนหลับสบาย',
          en: 'Pressure points and stretches in the traditional Thai way. Eases the stiffness of long days at a desk, so you feel light and sleep well.',
        },
        options: [
          { minutes: 60, price: 400 },
          { minutes: 90, price: 550 },
          { minutes: 120, price: 700 },
        ],
        featured: { photo: photos.serviceThai },
      },
      {
        id: 'thai-herbal-compress',
        name: { th: 'นวดไทย + ประคบสมุนไพร', en: 'Thai massage with herbal compress' },
        description: {
          th: 'นวดไทยต่อด้วยลูกประคบไพลนึ่งร้อน ช่วยลดอาการปวดเมื่อยและคลายกล้ามเนื้อส่วนลึก หอมสมุนไพรติดตัว',
          en: 'Thai massage followed by a hot steamed plai compress that soothes aches and deep muscles, and leaves a soft herbal scent.',
        },
        options: [
          { minutes: 90, price: 900 },
          { minutes: 120, price: 1100 },
        ],
        featured: { photo: photos.serviceCompress },
      },
      {
        id: 'foot-reflexology',
        name: { th: 'นวดฝ่าเท้า', en: 'Foot reflexology' },
        description: {
          th: 'แช่เท้าน้ำอุ่นสมุนไพร แล้วกดจุดฝ่าเท้าด้วยไม้นวด เหมาะกับวันที่เดินมาทั้งวัน',
          en: 'A warm herbal foot bath, then pressure points on the soles with a wooden stick. Good after a day on your feet.',
        },
        options: [
          { minutes: 45, price: 300 },
          { minutes: 60, price: 350 },
        ],
      },
      {
        id: 'neck-shoulder',
        name: { th: 'นวดคอ บ่า ไหล่', en: 'Neck and shoulder massage' },
        description: {
          th: 'เน้นคอ บ่า ไหล่ และหลังส่วนบน สำหรับคนที่ใช้คอมพิวเตอร์หรือมือถือนาน ๆ',
          en: 'Focused on the neck, shoulders and upper back, for long hours at a computer or phone.',
        },
        options: [
          { minutes: 30, price: 250 },
          { minutes: 60, price: 400 },
        ],
      },
    ],
  },
  {
    id: 'oil',
    name: { th: 'นวดน้ำมัน', en: 'Oil massage' },
    description: {
      th: 'ลงน้ำหนักนุ่มนวลต่อเนื่องด้วยน้ำมันอุ่น เลือกกลิ่นได้ก่อนเริ่มนวด',
      en: 'Long, smooth strokes with warm oil. Choose your scent before we start.',
    },
    items: [
      {
        id: 'aroma-oil',
        name: { th: 'นวดน้ำมันอโรมา', en: 'Aromatherapy oil massage' },
        description: {
          th: 'น้ำมันหอมระเหยอุ่น ๆ เลือกกลิ่นได้ 4 แบบ ลงน้ำหนักนุ่มนวลต่อเนื่องทั้งตัว เหมาะกับวันที่อยากพักจริง ๆ',
          en: 'Warm essential oil in one of four scents, with gentle, flowing strokes over the whole body. For the days you really need a rest.',
        },
        options: [
          { minutes: 60, price: 750 },
          { minutes: 90, price: 1000 },
          { minutes: 120, price: 1300 },
        ],
        featured: { photo: photos.serviceOil },
      },
      {
        id: 'deep-tissue-oil',
        name: { th: 'นวดน้ำมันคลายกล้ามเนื้อ', en: 'Deep tissue oil massage' },
        description: {
          th: 'ลงน้ำหนักลึกกว่านวดอโรมา เน้นจุดที่ตึงจากการออกกำลังกายหรือทำงานหนัก',
          en: 'Firmer than the aromatherapy massage, focused on muscles tight from sport or hard work.',
        },
        options: [
          { minutes: 60, price: 850 },
          { minutes: 90, price: 1150 },
        ],
      },
      {
        id: 'hot-stone',
        name: { th: 'นวดหินร้อน', en: 'Hot stone massage' },
        description: {
          th: 'นวดน้ำมันร่วมกับหินร้อนที่วางตามแนวหลัง ความร้อนช่วยให้กล้ามเนื้อคลายตัวเร็วขึ้น',
          en: 'Oil massage with warm stones along the back; the heat helps the muscles let go faster.',
        },
        options: [
          { minutes: 90, price: 1400 },
        ],
      },
    ],
  },
  {
    id: 'facial',
    name: { th: 'สปาหน้า', en: 'Facials' },
    description: {
      th: 'ดูแลผิวหน้าด้วยสมุนไพรไทยและการนวดหน้าที่ช่วยให้ผ่อนคลาย',
      en: 'Skin care with Thai herbs and a relaxing face massage.',
    },
    items: [
      {
        id: 'herbal-facial',
        name: { th: 'สปาหน้าสมุนไพรไทย', en: 'Thai herbal facial' },
        description: {
          th: 'ล้างหน้า ขัดผิวด้วยขมิ้นและน้ำผึ้ง พอกหน้าสมุนไพร และนวดหน้า',
          en: 'Cleansing, a turmeric and honey scrub, an herbal mask and a face massage.',
        },
        options: [
          { minutes: 60, price: 900 },
        ],
      },
      {
        id: 'face-head-massage',
        name: { th: 'นวดหน้าและศีรษะ', en: 'Face and head massage' },
        description: {
          th: 'นวดกดจุดบนใบหน้า ขมับ และศีรษะ ช่วยคลายความเครียดและอาการตาล้า',
          en: 'Pressure points on the face, temples and scalp to ease stress and tired eyes.',
        },
        options: [
          { minutes: 30, price: 350 },
          { minutes: 60, price: 600 },
        ],
      },
    ],
  },
  {
    id: 'package',
    name: { th: 'แพ็กเกจ', en: 'Packages' },
    description: {
      th: 'รวมหลายบริการไว้ในครั้งเดียว ราคาถูกกว่าจองแยก',
      en: 'Several treatments in one visit, for less than booking them one by one.',
    },
    items: [
      {
        id: 'package-relax',
        name: { th: 'แพ็กเกจผ่อนคลาย', en: 'Relax package' },
        description: {
          th: 'เริ่มด้วยนวดไทยคลายเส้น แล้วต่อด้วยนวดน้ำมันอโรมาทั้งตัว',
          en: 'Thai massage to loosen up, then a full-body aromatherapy oil massage.',
        },
        options: [
          { minutes: 120, price: 1500 },
        ],
        includes: {
          th: 'นวดแผนไทย 60 นาที + นวดน้ำมันอโรมา 60 นาที',
          en: 'Traditional Thai massage 60 min + aromatherapy oil massage 60 min',
        },
      },
      {
        id: 'package-nuanplai',
        name: { th: 'แพ็กเกจนวลไพล', en: 'Nuanplai signature package' },
        description: {
          th: 'ครบทั้งตัวและผิวหน้า สำหรับวันที่อยากให้รางวัลตัวเอง',
          en: 'Body and face, for the day you want to treat yourself.',
        },
        options: [
          { minutes: 180, price: 2400 },
        ],
        includes: {
          th: 'ขัดผิวสมุนไพร 30 นาที + นวดน้ำมันอโรมา 90 นาที + สปาหน้าสมุนไพรไทย 60 นาที',
          en: 'Herbal body scrub 30 min + aromatherapy oil massage 90 min + Thai herbal facial 60 min',
        },
      },
    ],
  },
]
