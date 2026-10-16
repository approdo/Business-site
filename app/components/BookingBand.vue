<script setup lang="ts">
import { contact } from '~/data/contact'
import { bookingBand } from '~/data/pages'

/**
 * The dark band at the end of the home, services, about and gallery pages (spec 2): booking, LINE and
 * phone buttons with the opening hours. It has no id="booking": that id belongs to the booking form
 * on the contact page only, where every booking button leads (G-021).
 */
const { t } = useI18n()
const localized = useLocalized()
const { bookingTo, lineProps } = useContactLinks()
</script>

<template>
  <!-- `on-dark`: focus rings are light gold on this dark background (main.css). -->
  <section
    class="on-dark section-padding relative overflow-hidden bg-deep text-center text-on-deep"
    aria-labelledby="booking-band-title"
  >
    <!-- Two faint gold circles in opposite corners. -->
    <span
      class="absolute -top-[180px] -left-40 size-[360px] rounded-full border border-gold/35"
      aria-hidden="true"
    />
    <span
      class="absolute -right-40 -bottom-[200px] size-[360px] rounded-full border border-gold/35"
      aria-hidden="true"
    />

    <div class="page-container relative">
      <SectionEyebrow on-dark>
        {{ localized(bookingBand.eyebrow) }}
      </SectionEyebrow>
      <h2
        id="booking-band-title"
        class="mt-2.5 text-[clamp(30px,5.5vw,44px)]"
      >
        <PhraseText :text="localized(bookingBand.title)" />
      </h2>
      <p class="mx-auto mt-3.5 mb-7 max-w-[560px] text-on-deep-muted">
        {{ localized(bookingBand.text) }}
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <BaseButton :to="bookingTo">
          {{ t('header.booking') }}
        </BaseButton>
        <BaseButton
          v-bind="lineProps"
          variant="ghost-light"
        >
          <IconLine class="size-5 shrink-0" />
          {{ localized(contact.line.label) }}
        </BaseButton>
        <BaseButton
          :href="contact.phoneHref"
          variant="ghost-light"
        >
          <IconPhone class="size-5 shrink-0" />
          {{ t('call') }} {{ contact.phoneDisplay }}
        </BaseButton>
      </div>
      <p class="mt-[22px] text-[15px] text-on-deep-muted">
        {{ localized(contact.hours.open) }}
        <span class="whitespace-nowrap">{{ localized(contact.hours.time) }}</span>
        ·
        {{ t('hours.lastBooking') }}
        <span class="whitespace-nowrap">{{ localized(contact.hours.lastBooking) }}</span>
      </p>
    </div>
  </section>
</template>
