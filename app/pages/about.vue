<script setup lang="ts">
import { about } from '~/data/pages'
import { team } from '~/data/team'

usePageHead('about')

const { t } = useI18n()
const localized = useLocalized()
const story = about.story
</script>

<template>
  <div>
    <PageHead page="about" />

    <!-- The story next to an arched photo; on narrower screens the text comes first (spec 3). -->
    <section
      class="pb-[72px] lg:pb-24"
      aria-labelledby="story-title"
    >
      <div class="page-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <div>
          <SectionEyebrow>{{ localized(story.eyebrow) }}</SectionEyebrow>
          <h2
            id="story-title"
            class="mt-2.5 mb-5 text-[clamp(28px,5vw,40px)]"
          >
            <PhraseText :text="localized(story.title)" />
          </h2>
          <p
            v-for="(paragraph, index) in story.paragraphs"
            :key="index"
            class="mt-4 max-w-[38em] first-of-type:mt-0"
          >
            {{ localized(paragraph) }}
          </p>
        </div>

        <div class="relative w-[min(100%,420px)] justify-self-center">
          <!-- A gold arch drawn a little behind and below the photo, as on the home page. -->
          <span
            class="absolute inset-[14px_-14px_-14px_14px] rounded-arch border-[1.5px] border-gold"
            aria-hidden="true"
          />
          <SitePhoto
            :photo="story.photo"
            class="relative aspect-[3/4] w-full rounded-arch object-cover"
          />
        </div>
      </div>
    </section>

    <!-- The team: letter avatars instead of photos of people (N12). -->
    <section
      class="section-padding bg-surface"
      aria-labelledby="team-title"
    >
      <div class="page-container">
        <SectionHead
          :section="about.team"
          heading-id="team-title"
        />
        <ul
          role="list"
          class="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <li
            v-for="member in team"
            :key="member.id"
            class="flex flex-col items-center rounded-card border border-line bg-card px-6 py-8 text-center"
          >
            <LetterAvatar
              :letter="localized(member.initial)"
              size="large"
            />
            <h3 class="mt-4 text-[20px]">
              {{ localized(member.name) }}
            </h3>
            <p class="text-text-muted">
              {{ localized(member.role) }}
            </p>
            <p class="mt-2 text-[14px]">
              <span class="whitespace-nowrap">{{ t('about.experience', { years: member.years }) }}</span>
              ·
              <PhraseText :text="localized(member.specialty)" />
            </p>
          </li>
        </ul>
      </div>
    </section>

    <BookingBand />
  </div>
</template>
