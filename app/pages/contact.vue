<script setup lang="ts">
import { contact } from '~/data/contact'
import { site } from '~/data/site'

usePageHead('contact')

const { t } = useI18n()
const localized = useLocalized()
const { lineProps } = useContactLinks()
</script>

<template>
  <div>
    <PageHead page="contact" />

    <!--
      Below 1024px one column: details, form, map. From 1024px two columns: details above the map
      on the left, the form on the right (spec 3).
    -->
    <div class="page-container grid gap-10 pb-[72px] lg:grid-cols-2 lg:items-start lg:pb-24">
      <section
        class="rounded-card border border-line bg-card p-6 md:p-8 lg:col-start-1 lg:row-start-1"
        aria-labelledby="hours-title"
      >
        <h2
          id="hours-title"
          class="flex items-center gap-2.5 text-[24px]"
        >
          <IconClock class="size-6 shrink-0 text-gold-ink" />
          {{ t('hours.title') }}
        </h2>
        <p class="mt-3">
          {{ localized(contact.hours.open) }}
          <strong class="font-semibold whitespace-nowrap">{{ localized(contact.hours.time) }}</strong>
        </p>
        <p class="text-text-muted">
          {{ t('hours.lastBooking') }}
          <span class="whitespace-nowrap">{{ localized(contact.hours.lastBooking) }}</span>
        </p>

        <h2 class="mt-8 text-[24px]">
          {{ t('contact.channelsTitle') }}
        </h2>
        <div class="mt-4 flex flex-wrap gap-3">
          <BaseButton
            :href="contact.phoneHref"
            variant="outline"
          >
            <IconPhone class="size-5 shrink-0" />
            {{ t('call') }} {{ contact.phoneDisplay }}
          </BaseButton>
          <!-- Leads to the form on this page until the client's LINE link is set (D-002, TODO(line)). -->
          <BaseButton
            v-bind="lineProps"
            variant="outline"
          >
            <IconLine class="size-5 shrink-0" />
            {{ localized(contact.line.label) }}
          </BaseButton>
        </div>
        <!-- The address of a reserved demo domain, so it is shown as text, not as a link (spec 2). -->
        <p class="mt-5 flex items-center gap-2">
          <IconMail class="size-5 shrink-0 text-gold-ink" />
          <span class="sr-only">{{ t('contact.emailLabel') }}</span>
          <span class="break-all">{{ contact.email }}</span>
        </p>
        <p class="mt-2 text-[14px] text-text-muted">
          {{ localized(contact.address) }}
        </p>
      </section>

      <!-- Every "Book now" and LINE button leads here (D-002); the id stays in both states of the form (G-021). -->
      <div
        id="booking"
        class="rounded-card border border-line bg-card p-6 shadow-card md:p-10 lg:col-start-2 lg:row-span-2 lg:row-start-1"
      >
        <BookingForm />
      </div>

      <section
        class="lg:col-start-1 lg:row-start-2"
        aria-labelledby="map-title"
      >
        <h2
          id="map-title"
          class="sr-only"
        >
          {{ t('contact.mapTitle') }}
        </h2>
        <MapEmbed
          :mode="contact.map.mode"
          :embed-url="contact.map.embedUrl"
          :title="localized(contact.map.title)"
          :label="t('contact.mapLabel')"
          :badge="t('contact.mapBadge')"
          :pin-label="localized(site.name)"
        />
      </section>
    </div>
  </div>
</template>
