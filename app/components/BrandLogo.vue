<script setup lang="ts">
import { site } from '~/data/site'

/**
 * The word mark: the Thai brand name in the heading font, with a small Latin line under it.
 * It is the same in both languages, like a logo, so the Thai name is marked `lang="th"`.
 * It renders no link; the element around it makes it one.
 */
defineProps<{
  /** In the header the Latin line is hidden below 480px, where the header row is full (spec 2). */
  compact?: boolean
  /** Light colours for the dark footer. */
  onDark?: boolean
}>()
</script>

<template>
  <span class="flex flex-col leading-[1.1]">
    <span
      lang="th"
      class="font-heading text-[24px] font-semibold"
      :class="onDark ? 'text-on-deep' : 'text-text'"
    >{{ site.name.th }}</span>
    <span
      class="mt-1 text-[10px] tracking-[0.22em]"
      :class="[onDark ? 'text-on-deep-muted' : 'text-text-muted', compact ? 'max-[479px]:hidden' : '']"
    >{{ site.logoSubtitle }}</span>
  </span>
</template>
