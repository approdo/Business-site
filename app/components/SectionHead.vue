<script setup lang="ts">
import type { SectionText } from '~/types/content'

/** The centred label, heading and ornament above a section of the home page (spec 2). */
defineProps<{
  section: SectionText
  /** The heading's id, for the section's aria-labelledby. */
  headingId: string
}>()

const localized = useLocalized()
</script>

<template>
  <div class="mx-auto mb-10 max-w-[640px] text-center">
    <SectionEyebrow>{{ localized(section.eyebrow) }}</SectionEyebrow>
    <h2
      :id="headingId"
      class="mt-2.5 text-[clamp(28px,5vw,40px)]"
    >
      <PhraseText :text="localized(section.title)" />
    </h2>
    <p
      v-if="section.text"
      class="mt-3 text-text-muted"
    >
      {{ localized(section.text) }}
    </p>
    <OrnamentDivider class="mx-auto" />
  </div>
</template>
