<script setup lang="ts">
import type { Photo, ServiceItem } from '~/types/content'
import { formatNumber } from '~/utils/numbers'

/**
 * One of the three featured services on the home page (spec 2): arched photo, name, description
 * and the shortest option as "from … baht". The card is not a link; the button under the cards
 * leads to the full price list.
 */
const props = defineProps<{
  service: ServiceItem
  photo: Photo
}>()

const { t } = useI18n()
const localized = useLocalized()

const shortest = computed(() => props.service.options[0])
</script>

<template>
  <article class="flex flex-col overflow-hidden rounded-arch bg-card shadow-card">
    <SitePhoto
      :photo="photo"
      class="aspect-[4/3] w-full rounded-arch object-cover"
    />
    <div class="flex flex-1 flex-col gap-2.5 px-6 pt-[22px] pb-[26px]">
      <h3 class="text-[24px]">
        {{ localized(service.name) }}
      </h3>
      <p class="text-text-muted">
        {{ localized(service.description) }}
      </p>
      <p class="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 border-t border-dashed border-line pt-3">
        <strong class="font-heading text-[22px] font-semibold whitespace-nowrap text-accent">
          {{ t('services.startingAt', { price: formatNumber(shortest.price) }) }}
        </strong>
        <span class="text-[14px] whitespace-nowrap text-text-muted">
          {{ t('services.minutes', { minutes: shortest.minutes }) }}
        </span>
      </p>
    </div>
  </article>
</template>
