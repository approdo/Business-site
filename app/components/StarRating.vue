<script setup lang="ts">
/**
 * Five stars drawn as SVG, the first `rating` of them in gold (spec 2, ReviewCard).
 * It is one image with a text alternative, "5 out of 5 stars", not five ★ characters:
 * gold text would be below 4.5:1 on the card.
 */
const props = defineProps<{ rating: number }>()

const { t } = useI18n()

// A five-pointed star in a 24 × 24 box (outer radius 10, inner radius 4, centred at 12, 12).
const STAR_POINTS = '12,2 14.35,8.76 21.51,8.91 15.8,13.24 17.88,20.09 12,16 6.12,20.09 8.2,13.24 2.49,8.91 9.65,8.76'

const stars = computed(() => [1, 2, 3, 4, 5].map(position => position <= props.rating))
</script>

<template>
  <svg
    role="img"
    :aria-label="t('reviews.rating', { rating })"
    viewBox="0 0 120 24"
    width="100"
    height="20"
  >
    <polygon
      v-for="(filled, index) in stars"
      :key="index"
      :points="STAR_POINTS"
      :transform="`translate(${index * 24} 0)`"
      :class="filled ? 'fill-gold' : 'fill-line'"
    />
  </svg>
</template>
