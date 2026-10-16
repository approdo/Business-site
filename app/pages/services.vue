<script setup lang="ts">
import { priceNote } from '~/data/pages'
import { serviceCategories } from '~/data/services'

usePageHead('services')

const { t } = useI18n()
const localized = useLocalized()
</script>

<template>
  <div>
    <PageHead page="services" />

    <!-- Links to the categories below. They wrap onto more lines rather than scroll sideways (spec 3). -->
    <nav
      class="page-container pb-10"
      :aria-label="t('services.categoriesLabel')"
    >
      <ul
        role="list"
        class="flex flex-wrap gap-2.5 md:justify-center"
      >
        <li
          v-for="category in serviceCategories"
          :key="category.id"
        >
          <a
            :href="`#${category.id}`"
            class="inline-flex min-h-11 items-center rounded-button border border-line bg-card px-[18px] text-[15px] font-semibold no-underline transition-[border-color,color] duration-200 hover:border-text"
          >{{ localized(category.name) }}</a>
        </li>
      </ul>
    </nav>

    <section
      v-for="(category, index) in serviceCategories"
      :id="category.id"
      :key="category.id"
      class="section-padding"
      :class="index % 2 === 0 ? 'bg-surface' : 'bg-bg'"
      :aria-labelledby="`${category.id}-title`"
    >
      <PriceCategory :category="category" />
    </section>

    <p class="page-container pb-14 text-center text-text-muted">
      <PhraseText :text="localized(priceNote)" />
    </p>

    <BookingBand />
  </div>
</template>
