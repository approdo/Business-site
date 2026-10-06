<script setup lang="ts">
import type { PageName } from '~/types/content'

/** Heading and a note for a page whose content is not built yet (BS-004, BS-005 replace it). */
defineProps<{ page: PageName }>()

const { t } = useI18n()
</script>

<template>
  <section class="page-container py-12">
    <h1 class="text-[32px] leading-tight font-bold text-brand-900">
      {{ t(`pages.${page}.title`) }}
    </h1>
    <p class="mt-4 text-ink-muted">
      {{ t('placeholder') }}
    </p>
    <slot />
  </section>
</template>
