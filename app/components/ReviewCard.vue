<script setup lang="ts">
import type { Review } from '~/types/content'

/** A customer review (spec 2): stars, the quote, and the customer's letter avatar, name and service. */
defineProps<{ review: Review }>()

const localized = useLocalized()
</script>

<template>
  <figure class="relative h-full rounded-card border border-line bg-card px-[26px] py-7 before:absolute before:top-1 before:right-5 before:font-heading before:text-[72px] before:leading-none before:text-accent-soft before:content-['“']">
    <StarRating :rating="review.rating" />
    <blockquote class="relative mt-2.5 mb-[18px] text-[17px]">
      {{ localized(review.quote) }}
    </blockquote>
    <figcaption class="flex items-center gap-3 text-[14px] text-text-muted">
      <LetterAvatar :letter="localized(review.initial)" />
      <span>
        <strong class="block text-[15px] font-semibold text-text">{{ localized(review.name) }}</strong>
        {{ localized(review.service) }}
      </span>
    </figcaption>
  </figure>
</template>
