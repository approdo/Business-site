<script setup lang="ts">
usePageHead('contact')

const { t } = useI18n()
</script>

<template>
  <PagePlaceholder page="contact">
    <!--
      Every "Book now" and LINE button leads here (D-002). The id stays on this wrapper, which
      will hold both the form and its thank-you message, so the link always has a target (G-021).
    -->
    <div
      id="booking"
      class="mt-10 rounded-card border border-border p-6"
    >
      <h2 class="text-[24px] font-bold text-brand-900">
        {{ t('booking.title') }}
      </h2>
      <p class="mt-2 text-ink-muted">
        {{ t('booking.placeholder') }}
      </p>
    </div>
  </PagePlaceholder>
</template>
