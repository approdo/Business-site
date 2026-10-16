<script setup lang="ts">
import { home } from '~/data/home'
import { reviews } from '~/data/reviews'

/** Customer reviews on the home page, from app/data/reviews.ts. */
</script>

<template>
  <section
    class="section-padding"
    aria-labelledby="reviews-title"
  >
    <div class="page-container">
      <SectionHead
        :section="home.reviews"
        heading-id="reviews-title"
      />
      <ul
        role="list"
        class="grid gap-[22px] md:grid-cols-3"
      >
        <li
          v-for="review in reviews"
          :key="review.id"
        >
          <ReviewCard :review="review" />
        </li>
      </ul>
    </div>
  </section>
</template>
