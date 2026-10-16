<script setup lang="ts">
import type { Photo } from '~/types/content'

/**
 * A photo from app/data/photos.ts, as one <img> with its width, height and alt text in the
 * current language (N9). Photos load lazily unless `priority` is set, which is for the one photo
 * at the top of a page (the hero): it loads right away and before other images.
 */
const props = withDefaults(defineProps<{
  photo: Photo
  /** The `sizes` attribute: how wide the photo is shown. Needed when the photo has several files. */
  sizes?: string
  priority?: boolean
}>(), {
  sizes: undefined,
  priority: false,
})

const photoUrl = usePhotoUrl()
const localized = useLocalized()

const smallest = computed(() => props.photo.files[0])
const srcset = computed(() => (props.photo.files.length > 1
  ? props.photo.files.map(file => `${photoUrl(file)} ${file.width}w`).join(', ')
  : undefined))
</script>

<template>
  <img
    :src="photoUrl(smallest)"
    :srcset="srcset"
    :sizes="srcset ? sizes : undefined"
    :width="smallest.width"
    :height="smallest.height"
    :alt="localized(photo.alt)"
    :loading="priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    decoding="async"
  >
</template>
