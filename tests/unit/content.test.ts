import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { bookingForm } from '../../app/data/bookingForm'
import { home } from '../../app/data/home'
import { about } from '../../app/data/pages'
import { galleryPhotos, photos } from '../../app/data/photos'
import { reviews } from '../../app/data/reviews'
import { serviceCategories } from '../../app/data/services'
import { team } from '../../app/data/team'
import type { Localized, PhotoFile } from '../../app/types/content'
import { joinPhrases } from '../../app/utils/phrases'

// Rules of the content data, not its numbers (G-018): the tests keep passing when a service,
// review or photo is added, and fail when one is incomplete.

const imagesDir = new URL('../../public/images/', import.meta.url)
const credits = readFileSync(new URL('../../CREDITS.md', import.meta.url), 'utf8')

function expectBothLanguages(text: Localized<unknown>, label: string) {
  for (const value of [text.th, text.en]) {
    const plain = typeof value === 'string' ? value : joinPhrases(value as string[])
    expect(plain.trim(), label).not.toBe('')
  }
}

const allItems = serviceCategories.flatMap(category => category.items)

describe('services (N11)', () => {
  it('has at least one category, and every category at least one item', () => {
    expect(serviceCategories.length).toBeGreaterThan(0)
    for (const category of serviceCategories) expect(category.items.length, category.id).toBeGreaterThan(0)
  })

  it('uses unique category ids that work as page anchors, and unique item ids', () => {
    const categoryIds = serviceCategories.map(category => category.id)
    expect(new Set(categoryIds).size).toBe(categoryIds.length)
    for (const id of categoryIds) expect(id).toMatch(/^[a-z][a-z0-9-]*$/)
    const itemIds = allItems.map(item => item.id)
    expect(new Set(itemIds).size).toBe(itemIds.length)
  })

  it('names and describes every category and item in Thai and English', () => {
    for (const category of serviceCategories) {
      expectBothLanguages(category.name, `${category.id} name`)
      expectBothLanguages(category.description, `${category.id} description`)
    }
    for (const item of allItems) {
      expectBothLanguages(item.name, `${item.id} name`)
      expectBothLanguages(item.description, `${item.id} description`)
      if (item.includes) expectBothLanguages(item.includes, `${item.id} includes`)
    }
  })

  it('gives every item whole, positive lengths and prices, shortest first', () => {
    for (const item of allItems) {
      const minutes = item.options.map(option => option.minutes)
      expect(minutes, item.id).toEqual([...minutes].sort((a, b) => a - b))
      expect(new Set(minutes).size, item.id).toBe(minutes.length)
      for (const option of item.options) {
        expect(Number.isInteger(option.minutes) && option.minutes > 0, item.id).toBe(true)
        expect(Number.isInteger(option.price) && option.price > 0, item.id).toBe(true)
      }
    }
  })

  it('features exactly three items on the home page, each with a photo', () => {
    const featured = allItems.filter(item => item.featured)
    expect(featured).toHaveLength(3)
    for (const item of featured) expect(item.featured?.photo.files.length, item.id).toBeGreaterThan(0)
  })
})

describe('reviews', () => {
  it('have unique ids, every text in both languages and a rating from 1 to 5', () => {
    expect(new Set(reviews.map(review => review.id)).size).toBe(reviews.length)
    for (const review of reviews) {
      for (const field of [review.name, review.initial, review.service, review.quote]) expectBothLanguages(field, review.id)
      expect(review.rating).toBeGreaterThanOrEqual(1)
      expect(review.rating).toBeLessThanOrEqual(5)
    }
  })

  it('show a single letter in each avatar', () => {
    for (const review of reviews) {
      expect([...review.initial.th], review.id).toHaveLength(1)
      expect([...review.initial.en], review.id).toHaveLength(1)
    }
  })
})

describe('home', () => {
  it('has the accent words of the hero heading inside the heading', () => {
    const { title, titleAccent } = home.hero
    expect(joinPhrases(title.th)).toContain(titleAccent.th)
    expect(title.en).toContain(titleAccent.en)
  })
})

describe('about (AC1, N12)', () => {
  it('tells the story in both languages', () => {
    expectBothLanguages(about.story.title, 'story title')
    expect(about.story.paragraphs.length).toBeGreaterThan(0)
    for (const paragraph of about.story.paragraphs) expectBothLanguages(paragraph, 'story paragraph')
  })

  it('lists the team with unique ids, every text in both languages and whole years of experience', () => {
    expect(team.length).toBeGreaterThan(0)
    expect(new Set(team.map(member => member.id)).size).toBe(team.length)
    for (const member of team) {
      for (const field of [member.name, member.initial, member.role, member.specialty]) expectBothLanguages(field, member.id)
      expect(Number.isInteger(member.years) && member.years > 0, member.id).toBe(true)
    }
  })

  it('shows a single letter in each team avatar, never a photo', () => {
    for (const member of team) {
      expect([...member.initial.th], member.id).toHaveLength(1)
      expect([...member.initial.en], member.id).toHaveLength(1)
      expect(member, member.id).not.toHaveProperty('photo')
    }
  })
})

describe('gallery (AC2)', () => {
  it('has 8 to 12 photos with unique ids', () => {
    expect(galleryPhotos.length).toBeGreaterThanOrEqual(8)
    expect(galleryPhotos.length).toBeLessThanOrEqual(12)
    expect(new Set(galleryPhotos.map(photo => photo.id)).size).toBe(galleryPhotos.length)
  })
})

describe('booking form texts (N8)', () => {
  it('have every label and every error message in both languages', () => {
    const { fields, errors } = bookingForm
    for (const field of Object.values(fields)) for (const text of Object.values(field)) expectBothLanguages(text, 'field')
    for (const messages of Object.values(errors)) for (const text of Object.values(messages)) expectBothLanguages(text, 'error')
  })

  it('say word for word on Thai pages that nothing was sent', () => {
    expect(joinPhrases(bookingForm.success.note.th)).toBe('(เว็บไซต์ตัวอย่าง — ข้อมูลในฟอร์มไม่ได้ถูกส่งจริง)')
  })
})

/** Every file under public/images/ (paths with '/', e.g. 'gallery/foot.webp'); folders have no extension. */
function imageFiles(): string[] {
  return readdirSync(imagesDir, { recursive: true, encoding: 'utf8' })
    .map(path => path.replace(/\\/g, '/'))
    .filter(path => /\.\w+$/.test(path))
}

const allPhotos = [...Object.values(photos), ...galleryPhotos]
const photoFiles: PhotoFile[] = [
  ...Object.values(photos).flatMap(photo => photo.files),
  ...galleryPhotos.flatMap(photo => [photo.thumb, photo.full]),
]

describe('photos (N9)', () => {
  it('are all WebP files that exist in public/images/', () => {
    for (const { file } of photoFiles) {
      expect(file).toMatch(/\.webp$/)
      expect(existsSync(new URL(file, imagesDir)), file).toBe(true)
    }
  })

  it('have alt text in both languages', () => {
    for (const photo of allPhotos) expectBothLanguages(photo.alt, photo.credit.page)
  })

  it('list srcset copies smallest first, all of the same shape', () => {
    for (const photo of Object.values(photos)) {
      const widths = photo.files.map(file => file.width)
      expect(widths).toEqual([...widths].sort((a, b) => a - b))
      const ratios = photo.files.map(file => (file.width / file.height).toFixed(2))
      expect(new Set(ratios).size, photo.files[0].file).toBe(1)
    }
  })

  it('come from Unsplash or Pexels, never Unsplash+', () => {
    for (const { credit } of allPhotos) {
      expect(credit.page).toMatch(/^https:\/\/(unsplash\.com|www\.pexels\.com)\//)
      expect(credit.download).not.toContain('plus.unsplash.com')
    }
  })
})

describe('CREDITS.md', () => {
  it('has a row for every image file in public/images/', () => {
    const files = imageFiles()
    expect(files.length).toBeGreaterThan(0)
    for (const file of files) expect(credits, file).toContain(`\`${file}\``)
  })

  it('names the photographer and links the source of every photo', () => {
    for (const { credit } of allPhotos) {
      const row = credits.split('\n').find(line => line.includes(credit.page))
      expect(row, credit.page).toBeDefined()
      expect(row).toContain(credit.photographer)
      expect(row).toContain(credit.license)
    }
  })
})
