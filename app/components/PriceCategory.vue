<script setup lang="ts">
import type { ServiceCategory } from '~/types/content'
import { formatNumber } from '~/utils/numbers'

/**
 * One category of the price list (spec 2, PriceList): its heading and description, then a card per
 * service with every length and price. Everything comes from app/data/services.ts, so a new service
 * or category shows up here without changing this component.
 */
defineProps<{ category: ServiceCategory }>()

const { t } = useI18n()
const localized = useLocalized()
</script>

<template>
  <div class="page-container">
    <div class="mb-8 max-w-[640px]">
      <h2
        :id="`${category.id}-title`"
        class="text-[clamp(28px,5vw,40px)]"
      >
        {{ localized(category.name) }}
      </h2>
      <p class="mt-2 text-text-muted">
        {{ localized(category.description) }}
      </p>
    </div>

    <ul
      role="list"
      class="grid gap-6 md:grid-cols-2"
    >
      <li
        v-for="item in category.items"
        :key="item.id"
        class="rounded-card border border-line bg-card p-6"
      >
        <h3 class="text-[20px]">
          {{ localized(item.name) }}
        </h3>
        <p class="mt-1.5 text-[15px] text-text-muted">
          {{ localized(item.description) }}
        </p>
        <p
          v-if="item.includes"
          class="mt-2 text-[14px] text-text-muted"
        >
          <span class="font-semibold text-text">{{ t('services.includes') }}</span>
          {{ localized(item.includes) }}
        </p>
        <ul
          role="list"
          class="mt-4"
        >
          <li
            v-for="option in item.options"
            :key="option.minutes"
            class="flex items-baseline justify-between gap-4 border-t border-dashed border-line py-2.5 last:pb-0"
          >
            <span class="whitespace-nowrap">{{ t('services.minutes', { minutes: option.minutes }) }}</span>
            <strong class="font-heading text-[20px] font-semibold whitespace-nowrap text-accent">
              {{ t('services.price', { price: formatNumber(option.price) }) }}
            </strong>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
