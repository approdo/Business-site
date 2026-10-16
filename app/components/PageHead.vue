<script setup lang="ts">
import { pageHeads } from '~/data/pages'
import type { PageName } from '~/types/content'

/**
 * The heading block at the top of a page (spec 3): the page's menu name as a small label, the <h1>,
 * a lead paragraph and the ornament. Left-aligned on phones, centred from 768px.
 */
const props = defineProps<{ page: Exclude<PageName, 'home'> }>()

const { t } = useI18n()
const localized = useLocalized()
const head = computed(() => pageHeads[props.page])
</script>

<template>
  <div class="py-12 md:py-[72px] md:text-center">
    <div class="page-container">
      <SectionEyebrow>{{ t(`nav.${page}`) }}</SectionEyebrow>
      <h1 class="mt-2.5 text-[clamp(32px,6vw,48px)]">
        <PhraseText :text="localized(head.title)" />
      </h1>
      <p class="mt-3 max-w-[34em] text-[18px] text-text-muted md:mx-auto">
        {{ localized(head.lead) }}
      </p>
      <OrnamentDivider class="md:mx-auto" />
    </div>
  </div>
</template>
