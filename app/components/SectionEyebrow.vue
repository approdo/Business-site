<script setup lang="ts">
/** The small gold label above a heading, with a short line in front of it (spec 1, "eyebrow"). */
defineProps<{
  /** Light gold on the dark booking band; dark gold (gold-ink) everywhere else. */
  onDark?: boolean
}>()
</script>

<template>
  <p
    class="inline-flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.08em] before:h-px before:w-7 before:shrink-0 before:bg-current before:content-['']"
    :class="onDark ? 'text-gold-light' : 'text-gold-ink'"
  >
    <slot />
  </p>
</template>
