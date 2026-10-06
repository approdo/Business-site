<script setup lang="ts">
import type { LocaleCode } from '~/types/content'
import { contact } from '~/data/contact'
import { site } from '~/data/site'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

// The language switch leads to the same page in the other language (D-004).
const otherLocale = computed<LocaleCode>(() => (locale.value === 'th' ? 'en' : 'th'))

// Below 1024px the menu is a panel that the "menu" button opens under the header.
// From 1024px the whole menu sits in the header row and there is no button.
const { isOpen, toggle, close } = useMobileMenu()
const menuButton = useTemplateRef<HTMLButtonElement>('menuButton')

// Escape closes the open menu and puts the focus back on the menu button.
function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape' || !isOpen.value) return
  close()
  menuButton.value?.focus()
}

// The open panel closes when the focus moves to an element outside the header, e.g. on Tab
// after the panel's last link. It stays open when the focus goes to no element at all
// (`relatedTarget` is null), e.g. after a tap on an empty part of the panel.
function onFocusOut(event: FocusEvent) {
  const header = event.currentTarget as HTMLElement
  const nextFocus = event.relatedTarget
  if (isOpen.value && nextFocus instanceof Node && !header.contains(nextFocus)) close()
}

// Close the panel when the window gets wide enough for the full menu.
// 64rem is Tailwind's `lg` breakpoint (1024px), the one the template uses.
let desktopQuery: MediaQueryList | undefined

function onDesktopQueryChange(event: MediaQueryListEvent) {
  if (event.matches) close()
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
  desktopQuery = window.matchMedia('(min-width: 64rem)')
  desktopQuery.addEventListener('change', onDesktopQueryChange)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  desktopQuery?.removeEventListener('change', onDesktopQueryChange)
  close()
})
</script>

<template>
  <header
    id="site-header"
    class="sticky top-0 z-50 border-b border-border bg-surface"
    @focusout="onFocusOut"
  >
    <div class="page-container flex h-16 items-center gap-4">
      <!-- Named by its visible text, the brand name. -->
      <NuxtLink
        :to="localePath('/')"
        class="inline-flex min-h-11 items-center text-brand-900"
        @click="close"
      >
        <BrandLogo />
      </NuxtLink>

      <nav
        id="site-nav"
        class="lg:static lg:ml-auto lg:flex lg:max-h-none lg:items-center lg:gap-7 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
        :class="isOpen
          ? 'fixed inset-x-0 top-16 z-49 max-h-[calc(100dvh-64px)] overflow-y-auto border-b border-border bg-surface px-5 pt-1 pb-6 shadow-card md:px-8'
          : 'hidden'"
        :aria-label="t('header.navLabel')"
      >
        <ul
          role="list"
          class="lg:flex lg:gap-6"
        >
          <li
            v-for="item in site.nav"
            :key="item.page"
          >
            <!-- NuxtLink marks the link of the current page with aria-current="page". -->
            <NuxtLink
              :to="localePath(item.path)"
              class="flex min-h-14 items-center justify-between gap-4 border-b border-border text-[18px] whitespace-nowrap text-ink hover:text-brand-700 aria-[current=page]:font-bold lg:min-h-11 lg:border-0 lg:text-[16px]"
              @click="close"
            >
              {{ t(`nav.${item.page}`) }}
              <IconChevronRight class="size-5 shrink-0 text-ink-muted lg:hidden" />
            </NuxtLink>
          </li>
        </ul>
        <BaseButton
          :to="localePath(contact.bookingPath)"
          class="mt-5 w-full lg:mt-0 lg:min-h-11 lg:w-auto lg:px-5 lg:py-2 lg:text-[16px]"
          @click="close"
        >
          {{ t('header.booking') }}
        </BaseButton>
      </nav>

      <!-- Outside the menu panel, so it is one tap away on phones too. -->
      <NuxtLink
        :to="switchLocalePath(otherLocale)"
        :lang="otherLocale"
        :hreflang="otherLocale"
        :aria-label="t('header.switchLanguageLabel')"
        class="ml-auto inline-flex min-h-11 items-center px-2 font-bold text-brand-700 hover:underline lg:ml-0"
        @click="close"
      >
        {{ t('header.switchLanguage') }}
      </NuxtLink>

      <!-- The name stays the same whether the menu is open or closed; aria-expanded tells which. -->
      <button
        ref="menuButton"
        type="button"
        class="-mr-2.5 inline-grid size-12 cursor-pointer place-items-center rounded-button text-brand-900 hover:bg-brand-50 active:bg-brand-100 lg:hidden"
        :aria-label="t('header.menuButton')"
        :aria-expanded="isOpen"
        aria-controls="site-nav"
        @click="toggle"
      >
        <IconX
          v-if="isOpen"
          class="size-[26px]"
        />
        <IconMenu
          v-else
          class="size-[26px]"
        />
      </button>
    </div>
  </header>

  <!-- Dims the page under the open mobile menu. A click on it closes the menu. -->
  <div
    v-if="isOpen"
    class="fixed inset-x-0 top-16 bottom-0 z-48 bg-brand-900/55 lg:hidden"
    aria-hidden="true"
    @click="close"
  />
</template>
