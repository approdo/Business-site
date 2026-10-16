<script setup lang="ts">
import { home } from '~/data/home'
import { thaiNumeral } from '~/utils/numbers'

/** "Why Nuanplai" on the home page (spec 3): an arched photo and four numbered reasons. */
const localized = useLocalized()
const why = home.why
</script>

<template>
  <section
    class="section-padding bg-surface"
    aria-labelledby="why-title"
  >
    <div class="page-container grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-[72px]">
      <SitePhoto
        :photo="why.photo"
        class="aspect-[3/4] w-[min(100%,420px)] justify-self-center rounded-arch object-cover"
      />
      <div>
        <SectionEyebrow>{{ localized(why.eyebrow) }}</SectionEyebrow>
        <h2
          id="why-title"
          class="mt-2.5 mb-6 text-[clamp(28px,5vw,40px)]"
        >
          <PhraseText :text="localized(why.title)" />
        </h2>
        <ol
          role="list"
          class="grid gap-[22px]"
        >
          <li
            v-for="(reason, index) in why.reasons"
            :key="index"
            class="grid grid-cols-[52px_1fr] gap-4"
          >
            <!-- Thai digits are a decoration; the list itself gives the order. -->
            <span
              class="grid size-[52px] place-items-center rounded-full border-[1.5px] border-gold font-heading text-[22px] text-accent"
              aria-hidden="true"
            >{{ thaiNumeral(index + 1) }}</span>
            <div>
              <h3 class="text-[20px]">
                {{ localized(reason.title) }}
              </h3>
              <p class="mt-1 text-text-muted">
                {{ localized(reason.text) }}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>
