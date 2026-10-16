<script setup lang="ts">
import { home } from '~/data/home'
import { serviceCategories } from '~/data/services'

/** The three services marked `featured` in app/data/services.ts, as cards on the home page. */
const { t } = useI18n()
const localePath = useLocalePath()

const featured = serviceCategories
  .flatMap(category => category.items)
  .flatMap(item => (item.featured ? [{ item, photo: item.featured.photo }] : []))
</script>

<template>
  <section
    class="section-padding"
    aria-labelledby="featured-title"
  >
    <div class="page-container">
      <SectionHead
        :section="home.featured"
        heading-id="featured-title"
      />
      <ul
        role="list"
        class="grid gap-7 md:grid-cols-3 md:gap-6"
      >
        <li
          v-for="{ item, photo } in featured"
          :key="item.id"
          class="flex"
        >
          <ServiceCard
            :service="item"
            :photo="photo"
            class="w-full"
          />
        </li>
      </ul>
      <div class="mt-9 flex justify-center">
        <BaseButton
          :to="localePath('/services/')"
          variant="outline"
        >
          {{ t('services.seeAll') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>
