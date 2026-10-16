// Makes the WebP photos in public/images/ from the originals listed in app/data/photos.ts.
//
//   npm run photos
//
// 1. Downloads each original JPEG (about 2000px wide) once, into .cache/photos/ (not committed).
// 2. Crops it from the centre to each file's width × height and saves it as WebP.
//
// The resizing and the WebP encoding are done by the Chromium that the e2e tests use
// (@playwright/test; install it once with `npx playwright install chromium`), so the project
// needs no image library. Look at the new files before committing them, and keep CREDITS.md
// in step with app/data/photos.ts.
import { createHash } from 'node:crypto'
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'
// Node 22.18+ strips TypeScript types on import, so this reads the same data as the site.
import { galleryPhotos, photos } from '../app/data/photos.ts'

const cacheDir = new URL('../.cache/photos/', import.meta.url)
const imagesDir = new URL('../public/images/', import.meta.url)

// WebP quality, 0–1. Photos shown in the page are kept small for phones; the lightbox copies
// are larger but load only when a visitor opens one.
const QUALITY = 0.72
// A photo shown in the page should stay under this size (BS-004 scope); the script warns above it.
const PAGE_PHOTO_WARN_BYTES = 150 * 1024

/**
 * Every file to make: { file, width, height, download, wholePhoto }.
 * `wholePhoto` marks the gallery copies that must keep the whole original (no cropping).
 */
const jobs = [
  ...Object.values(photos).flatMap(photo =>
    photo.files.map(file => ({ ...file, download: photo.credit.download, wholePhoto: false }))),
  ...galleryPhotos.flatMap(photo => [
    { ...photo.thumb, download: photo.credit.download, wholePhoto: false },
    { ...photo.full, download: photo.credit.download, wholePhoto: true },
  ]),
]

/** Downloads an original once and returns its bytes. */
async function original(url) {
  const name = `${createHash('sha256').update(url).digest('hex').slice(0, 16)}.jpg`
  const cached = new URL(name, cacheDir)
  try {
    return await readFile(cached)
  }
  catch {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`)
    const bytes = Buffer.from(await response.arrayBuffer())
    await writeFile(cached, bytes)
    return bytes
  }
}

/**
 * Runs in Chromium: decodes the JPEG, crops it from the centre to width × height
 * ("object-fit: cover") and encodes it as WebP. Returns the original size and the WebP as base64.
 */
async function resizeInBrowser({ jpegBase64, width, height, quality }) {
  const bytes = Uint8Array.from(atob(jpegBase64), char => char.charCodeAt(0))
  const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/jpeg' }))

  const scale = Math.max(width / bitmap.width, height / bitmap.height)
  const sourceWidth = width / scale
  const sourceHeight = height / scale
  const canvas = new OffscreenCanvas(width, height)
  const context = canvas.getContext('2d')
  context.imageSmoothingQuality = 'high'
  context.drawImage(bitmap, (bitmap.width - sourceWidth) / 2, (bitmap.height - sourceHeight) / 2,
    sourceWidth, sourceHeight, 0, 0, width, height)

  const webp = new Uint8Array(await (await canvas.convertToBlob({ type: 'image/webp', quality })).arrayBuffer())
  let binary = ''
  for (let i = 0; i < webp.length; i += 0x8000) binary += String.fromCharCode(...webp.subarray(i, i + 0x8000))
  return { originalWidth: bitmap.width, originalHeight: bitmap.height, webpBase64: btoa(binary) }
}

await mkdir(cacheDir, { recursive: true })
await mkdir(new URL('gallery/', imagesDir), { recursive: true })

const problems = []
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  for (const job of jobs) {
    const jpeg = await original(job.download)
    const result = await page.evaluate(resizeInBrowser, {
      jpegBase64: jpeg.toString('base64'),
      width: job.width,
      height: job.height,
      quality: QUALITY,
    })

    // A gallery copy must show the whole photo: its shape has to match the original's.
    const originalRatio = result.originalWidth / result.originalHeight
    if (job.wholePhoto && Math.abs(job.width / job.height - originalRatio) > 0.01) {
      const longSide = 1600
      const suggested = originalRatio >= 1
        ? `${longSide} × ${Math.round(longSide / originalRatio)}`
        : `${Math.round(longSide * originalRatio)} × ${longSide}`
      problems.push(`${job.file}: the original is ${result.originalWidth} × ${result.originalHeight}; set its size to ${suggested}`)
      continue
    }

    const webp = Buffer.from(result.webpBase64, 'base64')
    if (webp.toString('ascii', 8, 12) !== 'WEBP') throw new Error(`${job.file}: Chromium did not return a WebP image`)
    const target = new URL(job.file, imagesDir)
    await writeFile(target, webp)

    const { size } = await stat(target)
    const warning = !job.wholePhoto && size > PAGE_PHOTO_WARN_BYTES ? '  <- larger than 150 kB' : ''
    console.log(`public/images/${job.file}  ${job.width}×${job.height}  ${(size / 1024).toFixed(1)} kB${warning}`)
  }
}
finally {
  await browser.close()
}

if (problems.length > 0) {
  console.error(`\nNot written — fix the sizes in app/data/photos.ts and run again:\n${problems.join('\n')}`)
  process.exit(1)
}
