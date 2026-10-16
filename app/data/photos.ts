import type { GalleryPhoto, Photo, PhotoCredit } from '../types/content'

// Every photo of the site: stock photos that may be used commercially (N9), none showing a face.
// `scripts/fetch-photos.mjs` downloads each original and writes the WebP files listed here to
// public/images/; CREDITS.md lists them for people. To change a photo, edit it here, run
// `npm run photos`, look at the new files and update CREDITS.md.
//
// Like site.ts, this file is also read by plain Node (the script), so it only imports types.

const unsplash = (photographer: string, photoId: string, cdnId: string): PhotoCredit => ({
  photographer,
  page: `https://unsplash.com/photos/${photoId}`,
  license: 'Unsplash License',
  download: `https://images.unsplash.com/photo-${cdnId}?w=2000&q=85&fm=jpg`,
})

const pexels = (photographer: string, slug: string, id: number): PhotoCredit => ({
  photographer,
  page: `https://www.pexels.com/photo/${slug}-${id}/`,
  license: 'Pexels License',
  download: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2000`,
})

export const photos = {
  hero: {
    files: [
      { file: 'hero-640.webp', width: 640, height: 800 },
      { file: 'hero-920.webp', width: 920, height: 1150 },
    ],
    alt: {
      th: 'หมอนวดกำลังนวดเท้าด้วยน้ำมันในแสงแดดยามเย็น',
      en: 'A therapist massaging a foot with oil in warm evening light',
    },
    credit: unsplash('Filipp Romanovski', '20Xfu4OP0co', '1728497872660-cc6b16238c3a'),
  },
  serviceThai: {
    files: [{ file: 'svc-thai.webp', width: 640, height: 480 }],
    alt: {
      th: 'มือหมอนวดกดคลายกล้ามเนื้อบนหลัง',
      en: 'A therapist\'s hands pressing tight muscles on the back',
    },
    credit: unsplash('THLT LCX', 'nMG20MmJV-4', '1611073615452-4889cb93422e'),
  },
  serviceOil: {
    files: [{ file: 'svc-oil.webp', width: 640, height: 480 }],
    alt: {
      th: 'หมอนวดนวดหลังด้วยน้ำมันอโรมา',
      en: 'A therapist giving an aromatic oil massage on the back',
    },
    credit: unsplash('Massage a Domicile', '3aGV2ViCzrM', '1741522509407-41cfe73b0b75'),
  },
  serviceCompress: {
    files: [{ file: 'svc-compress.webp', width: 640, height: 480 }],
    alt: {
      th: 'ถาดลูกประคบสมุนไพร หินร้อน และเกลือขัดผิว',
      en: 'A tray with a herbal compress, hot stones and body scrub salts',
    },
    credit: unsplash('alan caishan', 'GIjZ_p0ziNE', '1544161558-d5fa96ee28c6'),
  },
  why: {
    files: [{ file: 'why.webp', width: 600, height: 800 }],
    alt: {
      th: 'เตียงนวดตกแต่งด้วยผ้าขนหนูพับและกลีบดอกไม้',
      en: 'A massage bed decorated with folded towels and flower petals',
    },
    credit: unsplash('Mayur Roxan', 'I9AKvh9NU18', '1787651343599-92563927b750'),
  },
  about: {
    files: [{ file: 'about.webp', width: 600, height: 800 }],
    alt: {
      th: 'ดอกกล้วยไม้และกลีบดอกไม้ลอยในขันทองเหลือง',
      en: 'Orchids and petals floating in brass bowls',
    },
    credit: pexels('Dale Mohagan', 'colorful-flower-bowls-in-golden-light', 38319521),
  },
} satisfies Record<string, Photo>

/** A gallery photo: `gallery/<id>-thumb.webp` (480 × 480) and `gallery/<id>.webp` (the whole photo). */
function galleryPhoto(id: string, full: { width: number, height: number }, alt: GalleryPhoto['alt'], credit: PhotoCredit): GalleryPhoto {
  return {
    id,
    thumb: { file: `gallery/${id}-thumb.webp`, width: 480, height: 480 },
    full: { file: `gallery/${id}.webp`, ...full },
    alt,
    credit,
  }
}

// In grid order, people and objects taking turns. `full` keeps the shape of the original,
// at most 1600px on its long side (the script stops if it would have to crop it).
export const galleryPhotos: GalleryPhoto[] = [
  galleryPhoto('herb-tray', { width: 1600, height: 1067 }, {
    th: 'ถาดลูกประคบ ตะไคร้ มะกรูด โป๊ยกั๊ก และเทียนหอม บนตอไม้ข้างหน้าต่าง',
    en: 'A herbal compress, lemongrass, makrut lime, star anise and a candle on a tray by the window',
  }, pexels('Anna Tarazevich', 'green-apple-beside-white-pillar-candle-on-brown-wooden-tray', 6560252)),
  galleryPhoto('thai-stretch', { width: 1600, height: 1067 }, {
    th: 'หมอนวดกดคลายบ่าให้ลูกค้าที่ใส่ชุดนวดไทย',
    en: 'A therapist pressing the shoulder of a client in Thai massage clothes',
  }, unsplash('Edward Muntinga', '8qwYA4INVCk', '1699523229208-be1e1dd9252d')),
  galleryPhoto('plumeria', { width: 1600, height: 900 }, {
    th: 'ดอกลีลาวดีสีขาวท่ามกลางใบเขียว',
    en: 'White plumeria flowers among green leaves',
  }, unsplash('Duy Le Duc', 'pIO70zv7R-w', '1758614256591-91deecdff2e7')),
  galleryPhoto('foot', { width: 1600, height: 1067 }, {
    th: 'หมอนวดยืดและกดคลายฝ่าเท้าแบบนวดไทย',
    en: 'A therapist stretching and pressing a foot in Thai massage',
  }, pexels('Tima Miroshnichenko', 'close-up-shot-of-a-person-doing-a-massage-on-a-foot', 6188032)),
  galleryPhoto('compress-hand', { width: 1067, height: 1600 }, {
    th: 'มือถือลูกประคบสมุนไพรกับต้นตะไคร้',
    en: 'A hand holding a herbal compress with lemongrass stalks',
  }, pexels('Anna Tarazevich', 'hand-relaxation-health-treatment', 6560280)),
  galleryPhoto('hot-stones', { width: 1200, height: 1600 }, {
    th: 'หินร้อนวางเรียงบนหลังระหว่างนวด',
    en: 'Hot stones placed along the back during a massage',
  }, unsplash('Taylor Heery', '_TyrA1RUaiI', '1696841212541-449ca29397cc')),
  galleryPhoto('mortar', { width: 1600, height: 1067 }, {
    th: 'ตำสมุนไพรในครกหินข้างกลีบกุหลาบแห้ง',
    en: 'Grinding herbs in a stone mortar beside dried rose petals',
  }, pexels('Yan Krukau', 'close-up-of-a-person-grinding-spices-in-a-mortar', 5480036)),
  galleryPhoto('compress-back', { width: 900, height: 1600 }, {
    th: 'หมอนวดกดลูกประคบสมุนไพรสองลูกบนหลัง',
    en: 'A therapist pressing two herbal compresses on the back',
  }, pexels('Aarón Lares', 'a-person-doing-back-massage', 7239303)),
  galleryPhoto('towels', { width: 1600, height: 1067 }, {
    th: 'ผ้าขนหนูสีขาวม้วนเรียงซ้อนกัน',
    en: 'A stack of rolled white towels',
  }, unsplash('iridial', '0Qv4fUvlSrI', '1787168295699-03aed18d17d4')),
  galleryPhoto('compress-leg', { width: 1600, height: 1067 }, {
    th: 'หมอนวดใช้ลูกประคบสมุนไพรอุ่นกดบนขา',
    en: 'A therapist pressing a warm herbal compress on the leg',
  }, pexels('Tima Miroshnichenko', 'person-s-hands-massaging-a-person-s-bare-back-with-fabric-balls', 6187852)),
  galleryPhoto('oil-table', { width: 1067, height: 1600 }, {
    th: 'ขวดน้ำมันนวด เทียน และไม้นวดบนโต๊ะกลม',
    en: 'Massage oil, a candle and a wooden massage tool on a round table',
  }, pexels('KoolShooters', 'brown-bottle-on-the-table', 6628485)),
  galleryPhoto('diffuser', { width: 1067, height: 1600 }, {
    th: 'ก้านไม้หอม ผ้าขนหนูม้วน และเทียนสองเล่ม',
    en: 'A reed diffuser, a rolled towel and two lit candles',
  }, unsplash('Mediamodifier', 'W7AyAs7azHc', '1620733723572-11c53f73a416')),
]
