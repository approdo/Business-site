<script setup lang="ts">
import type { PageName } from '~/types/content'

/** The page head and a note for a page whose content is not built yet (BS-005 replaces it). */
defineProps<{ page: Exclude<PageName, 'home'> }>()

const { t } = useI18n()
</script>

<template>
  <div>
    <PageHead :page="page" />
    <section class="page-container pb-16">
      <p class="text-center text-text-muted">
        {{ t('placeholder') }}
      </p>
      <slot />
    </section>
  </div>
</template>
