<script setup lang="ts">
import { contact } from '~/data/contact'
import { home } from '~/data/home'

/** The top of the home page (spec 3): heading, booking buttons, opening hours and the arched photo. */
const { t } = useI18n()
const localePath = useLocalePath()
const localized = useLocalized()
const { bookingTo } = useContactLinks()

const hero = home.hero
</script>

<template>
  <section
    class="pt-8 pb-14 lg:pt-14 lg:pb-[88px]"
    aria-labelledby="hero-title"
  >
    <div class="page-container grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
      <div>
        <SectionEyebrow>{{ localized(hero.eyebrow) }}</SectionEyebrow>
        <h1
          id="hero-title"
          class="mt-3.5 mb-[18px] text-[clamp(34px,7.5vw,60px)] [&_em]:text-accent [&_em]:not-italic"
        >
          <PhraseText
            :text="localized(hero.title)"
            :accent="hero.titleAccent ? localized(hero.titleAccent) : undefined"
          />
        </h1>
        <p class="mb-7 max-w-[34em] text-[18px] text-text-muted">
          {{ localized(hero.lead) }}
        </p>
        <div class="flex flex-wrap gap-3">
          <BaseButton :to="bookingTo">
            {{ t('header.booking') }}
          </BaseButton>
          <BaseButton
            :to="localePath('/services/')"
            variant="outline"
          >
            {{ t('home.seeServices') }}
          </BaseButton>
        </div>
        <p class="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[15px] text-text-muted">
          <span>
            {{ localized(contact.hours.open) }}
            <strong class="font-semibold whitespace-nowrap text-text">{{ localized(contact.hours.time) }}</strong>
          </span>
          <span>
            {{ t('call') }}
            <a
              :href="contact.phoneHref"
              class="font-semibold whitespace-nowrap text-text"
            >{{ contact.phoneDisplay }}</a>
          </span>
        </p>
      </div>

      <figure class="relative w-[min(100%,460px)] justify-self-center lg:justify-self-end">
        <!-- A gold arch drawn a little behind and below the photo. -->
        <span
          class="absolute inset-[14px_-14px_-14px_14px] rounded-arch border-[1.5px] border-gold"
          aria-hidden="true"
        />
        <SitePhoto
          :photo="hero.photo"
          sizes="(min-width: 492px) 460px, calc(100vw - 32px)"
          priority
          class="relative aspect-[4/5] w-full rounded-arch object-cover"
        />
        <!-- A note card on the photo; not a caption of it. -->
        <p class="absolute bottom-7 -left-2 max-w-[220px] rounded-[14px] bg-card px-4 py-3.5 text-[14px] leading-normal shadow-card">
          <strong class="block font-heading text-[16px] font-semibold text-accent">
            <PhraseText :text="localized(hero.note.title)" />
          </strong>
          {{ localized(hero.note.text) }}
        </p>
      </figure>
    </div>
  </section>
</template>
