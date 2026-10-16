<script setup lang="ts">
import { contact } from '~/data/contact'
import { site } from '~/data/site'
import { newTabAttributes } from '~/utils/links'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const localized = useLocalized()

// Footer links are 44px tall; they turn light and underlined on hover.
const linkClass = 'inline-flex min-h-11 items-center gap-2 no-underline hover:text-on-deep hover:underline hover:underline-offset-4'
const headingClass = 'mb-1 font-body text-[15px] font-semibold text-on-deep'
</script>

<template>
  <!-- `on-dark`: focus rings are light gold on this dark background (main.css). -->
  <footer
    id="site-footer"
    class="on-dark bg-deeper pt-14 pb-7 text-[15px] text-on-deep-muted"
  >
    <div class="page-container">
      <div class="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <NuxtLink
            :to="localePath('/')"
            class="inline-flex min-h-11 items-center no-underline"
          >
            <BrandLogo on-dark />
          </NuxtLink>
          <p class="mt-3">
            {{ t('footer.tagline') }}
          </p>
        </div>

        <nav aria-labelledby="footer-nav-title">
          <h2
            id="footer-nav-title"
            :class="headingClass"
          >
            {{ t('footer.navTitle') }}
          </h2>
          <ul role="list">
            <li
              v-for="item in site.nav"
              :key="item.page"
            >
              <NuxtLink
                :to="localePath(item.path)"
                :class="linkClass"
              >
                {{ t(`nav.${item.page}`) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <h2 :class="headingClass">
            {{ t('footer.contactTitle') }}
          </h2>
          <ul role="list">
            <li>
              <a
                :href="contact.phoneHref"
                :class="linkClass"
              >
                <IconPhone class="size-[18px] shrink-0 text-gold-light" />
                <span class="sr-only">{{ t('footer.phoneLabel') }}</span>
                <span class="whitespace-nowrap">{{ contact.phoneDisplay }}</span>
              </a>
            </li>
            <li>
              <!-- A path in this site until the client's own LINE link is set (D-002, TODO(line) in contact.ts). -->
              <NuxtLink
                v-if="contact.line.href.startsWith('/')"
                :to="localePath(contact.line.href)"
                :class="linkClass"
              >
                <IconLine class="size-[18px] shrink-0 text-gold-light" />
                <span class="whitespace-nowrap">{{ localized(contact.line.label) }}</span>
              </NuxtLink>
              <a
                v-else
                :href="contact.line.href"
                v-bind="newTabAttributes(contact.line.href)"
                :class="linkClass"
              >
                <IconLine class="size-[18px] shrink-0 text-gold-light" />
                <span class="whitespace-nowrap">{{ localized(contact.line.label) }}</span>
              </a>
            </li>
            <!-- The address of a reserved demo domain, so it is shown as text, not as a link (spec 2). -->
            <li class="flex min-h-11 items-center gap-2">
              <IconMail class="size-[18px] shrink-0 text-gold-light" />
              <span class="sr-only">{{ t('footer.emailLabel') }}</span>
              <span class="break-all">{{ contact.email }}</span>
            </li>
          </ul>
        </div>

        <div>
          <h2 :class="headingClass">
            {{ t('hours.title') }}
          </h2>
          <ul
            role="list"
            class="grid gap-1.5"
          >
            <li>
              {{ localized(contact.hours.open) }}
              <span class="whitespace-nowrap">{{ localized(contact.hours.time) }}</span>
            </li>
            <li>
              {{ t('hours.lastBooking') }}
              <span class="whitespace-nowrap">{{ localized(contact.hours.lastBooking) }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-on-deep-muted/20 pt-5 text-[14px]">
        <div>
          <!-- N10: the same Thai line on every page; English pages add a translation. -->
          <p
            id="site-disclaimer"
            lang="th"
          >
            <PhraseText :text="site.disclaimer" />
          </p>
          <p v-if="locale === 'en'">
            {{ t('footer.disclaimerTranslation') }}
          </p>
        </div>
        <p>{{ t('footer.photoCredit') }}</p>
      </div>
    </div>
  </footer>
</template>
