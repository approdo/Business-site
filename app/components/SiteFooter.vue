<script setup lang="ts">
import { contact } from '~/data/contact'
import { site } from '~/data/site'
import { newTabAttributes } from '~/utils/links'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const localized = useLocalized()

const emailHref = `mailto:${contact.email}`

// Footer links are 44px tall; they are underlined on hover.
const linkClass = 'inline-flex min-h-11 items-center gap-2 text-white hover:underline hover:underline-offset-4'
</script>

<template>
  <!-- `on-dark`: focus rings are orange on this dark background (main.css). -->
  <footer
    id="site-footer"
    class="on-dark bg-brand-900 py-10 text-[15px] text-brand-100"
  >
    <div class="page-container">
      <div class="grid gap-8 md:grid-cols-3">
        <div class="text-white">
          <BrandLogo />
        </div>

        <nav aria-labelledby="footer-nav-title">
          <p
            id="footer-nav-title"
            class="font-bold text-white"
          >
            {{ t('footer.navTitle') }}
          </p>
          <ul
            role="list"
            class="mt-1 grid"
          >
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
          <p class="font-bold text-white">
            {{ t('footer.contactTitle') }}
          </p>
          <ul
            role="list"
            class="mt-1 grid"
          >
            <li>
              <a
                :href="contact.phoneHref"
                :class="linkClass"
              >
                <IconPhone class="size-[18px] shrink-0 text-accent-500" />
                <span class="sr-only">{{ t('footer.phoneLabel') }}</span>
                <span class="whitespace-nowrap">{{ contact.phoneDisplay }}</span>
              </a>
            </li>
            <li>
              <a
                :href="emailHref"
                :class="linkClass"
              >
                <IconMail class="size-[18px] shrink-0 text-accent-500" />
                <span class="sr-only">{{ t('footer.emailLabel') }}</span>
                <span class="whitespace-nowrap">{{ contact.email }}</span>
              </a>
            </li>
            <li>
              <!-- A path in this site until the client's own LINE link is set (D-002, TODO(line) in contact.ts). -->
              <NuxtLink
                v-if="contact.line.href.startsWith('/')"
                :to="localePath(contact.line.href)"
                :class="linkClass"
              >
                <IconLine class="size-[18px] shrink-0 text-accent-500" />
                {{ localized(contact.line.label) }}
              </NuxtLink>
              <a
                v-else
                :href="contact.line.href"
                v-bind="newTabAttributes(contact.line.href)"
                :class="linkClass"
              >
                <IconLine class="size-[18px] shrink-0 text-accent-500" />
                {{ localized(contact.line.label) }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 grid gap-1 border-t border-brand-800 pt-5 text-[14px]">
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
    </div>
  </footer>
</template>
