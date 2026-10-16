<script setup lang="ts">
import { galleryNote } from '~/data/pages'
import { galleryPhotos } from '~/data/photos'

/**
 * The gallery (spec 2, Gallery and Lightbox): square thumbnails in a grid, each a button that opens
 * the whole photo in a lightbox. The lightbox is a native <dialog> opened with showModal(), so the
 * browser keeps the focus inside it and closes it on Escape; no lightbox library is used (N2).
 *
 * - Opening moves the focus to the close button; closing (Escape, the close button or a click
 *   outside the photo) puts it back on the thumbnail that opened the lightbox.
 * - The arrow keys and the previous / next buttons go through the photos, wrapping around.
 * - The large photo is in the page only while the lightbox shows it, so it loads when opened.
 */
const { t } = useI18n()
const localized = useLocalized()
const photoUrl = usePhotoUrl()

const dialog = useTemplateRef<HTMLDialogElement>('dialog')
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')
const grid = useTemplateRef<HTMLUListElement>('grid')

/** The photo whose thumbnail opened the lightbox: the focus goes back to it on close. */
const openedIndex = ref<number | null>(null)
/** The photo shown in the lightbox, or null while it is closed. */
const currentIndex = ref<number | null>(null)
const current = computed(() => (currentIndex.value === null ? undefined : galleryPhotos[currentIndex.value]))

/** "Unsplash" or "Pexels", for the credit under the photo. */
const currentSource = computed(() => current.value?.credit.license.replace(/ License$/, ''))

function open(index: number) {
  openedIndex.value = index
  currentIndex.value = index
  dialog.value?.showModal()
  closeButton.value?.focus()
}

function close() {
  // The dialog's close event (onClose) does the rest, also when Escape closed it.
  dialog.value?.close()
}

function onClose() {
  const index = openedIndex.value
  currentIndex.value = null
  openedIndex.value = null
  if (index !== null) grid.value?.querySelector<HTMLButtonElement>(`[data-photo-index="${index}"]`)?.focus()
}

/** Shows the previous (-1) or next (+1) photo; after the last photo comes the first again. */
function step(offset: number) {
  if (currentIndex.value === null) return
  const total = galleryPhotos.length
  currentIndex.value = (currentIndex.value + offset + total) % total
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') step(-1)
  else if (event.key === 'ArrowRight') step(1)
  else return
  event.preventDefault()
}

// A click on the dark area around the photo closes the lightbox. Clicks on the backdrop also
// reach the <dialog> element itself.
function onDialogClick(event: MouseEvent) {
  const target = event.target
  if (target instanceof Element && target.closest('img, figcaption, button, p')) return
  close()
}

// From here on the thumbnails open the lightbox; the end-to-end tests wait for this mark.
onMounted(() => {
  grid.value?.setAttribute('data-hydrated', '')
})

// The round 48px buttons of the lightbox, light on the dark background (ghost-light, spec 2).
const iconButtonClass = 'inline-grid size-12 shrink-0 cursor-pointer place-items-center rounded-full border-[1.5px] border-on-deep-muted text-on-deep transition-[color,background-color] duration-200 hover:bg-on-deep hover:text-deep'
</script>

<template>
  <div>
    <ul
      ref="grid"
      role="list"
      :aria-label="t('gallery.listLabel')"
      class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4"
    >
      <li
        v-for="(photo, index) in galleryPhotos"
        :key="photo.id"
      >
        <!-- The button is named by the photo's alt text. -->
        <button
          type="button"
          :data-photo-index="index"
          aria-haspopup="dialog"
          class="block w-full cursor-zoom-in rounded-card"
          @click="open(index)"
        >
          <img
            :src="photoUrl(photo.thumb)"
            :width="photo.thumb.width"
            :height="photo.thumb.height"
            :alt="localized(photo.alt)"
            loading="lazy"
            decoding="async"
            class="aspect-square w-full rounded-card object-cover"
          >
        </button>
      </li>
    </ul>
    <p class="mt-6 text-center text-[14px] text-text-muted">
      {{ localized(galleryNote) }}
    </p>

    <!--
      Full screen below 768px, a centred box from 768px. `open:flex` sets the layout only while it is
      open: a closed <dialog> must keep the browser's display: none. `on-dark`: light gold focus rings.
    -->
    <dialog
      ref="dialog"
      aria-labelledby="lightbox-caption"
      class="on-dark m-0 h-dvh max-h-none w-full max-w-none flex-col bg-deeper p-0 text-on-deep backdrop:bg-deeper/85 open:flex md:m-auto md:h-auto md:max-h-[calc(100dvh-32px)] md:w-[min(92vw,1100px)] md:rounded-card"
      @close="onClose"
      @keydown="onKeydown"
      @click="onDialogClick"
    >
      <div class="flex items-center justify-between gap-4 p-2 pl-5 md:p-3 md:pl-6">
        <p
          v-if="current"
          class="text-[15px] text-on-deep-muted tabular-nums"
        >
          {{ t('gallery.counter', { current: (currentIndex ?? 0) + 1, total: galleryPhotos.length }) }}
        </p>
        <button
          ref="closeButton"
          type="button"
          :class="iconButtonClass"
          class="ml-auto"
          :aria-label="t('gallery.close')"
          @click="close"
        >
          <IconX class="size-6" />
        </button>
      </div>

      <figure
        v-if="current"
        class="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-4 md:px-6"
      >
        <img
          :key="current.id"
          :src="photoUrl(current.full)"
          :width="current.full.width"
          :height="current.full.height"
          :alt="localized(current.alt)"
          class="h-auto max-h-[calc(100dvh-240px)] w-auto max-w-full object-contain md:max-h-[calc(100dvh-260px)]"
        >
        <!-- Read out again when the arrows change the photo. -->
        <figcaption
          id="lightbox-caption"
          aria-live="polite"
          class="max-w-[60ch] text-center text-[15px] leading-normal"
        >
          {{ localized(current.alt) }}
          <span class="mt-1 block text-[14px] text-on-deep-muted">
            {{ t('gallery.credit', { photographer: current.credit.photographer, source: currentSource }) }}
          </span>
        </figcaption>
      </figure>

      <div class="flex justify-center gap-4 p-3 md:p-4">
        <button
          type="button"
          :class="iconButtonClass"
          :aria-label="t('gallery.previous')"
          @click="step(-1)"
        >
          <IconChevronRight class="size-6 rotate-180" />
        </button>
        <button
          type="button"
          :class="iconButtonClass"
          :aria-label="t('gallery.next')"
          @click="step(1)"
        >
          <IconChevronRight class="size-6" />
        </button>
      </div>
    </dialog>
  </div>
</template>
