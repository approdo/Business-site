<script setup lang="ts">
import type { LocaleCode } from '~/types/content'
import { contact } from '~/data/contact'
import { site } from '~/data/site'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

// "TH / EN": the current language as plain text, the other one as a link to the same page
// in that language (D-004, spec 2).
const languages: LocaleCode[] = ['th', 'en']

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
    class="sticky top-0 z-50 border-b border-line bg-bg/94 backdrop-blur-[6px]"
    @focusout="onFocusOut"
  >
    <div class="page-container flex min-h-[68px] items-center gap-3">
      <!-- Named by its visible text, the brand name. -->
      <NuxtLink
        :to="localePath('/')"
        class="mr-auto inline-flex min-h-11 items-center no-underline"
        @click="close"
      >
        <BrandLogo compact />
      </NuxtLink>

      <nav
        id="site-nav"
        class="lg:static lg:mr-4 lg:block lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none"
        :class="isOpen
          ? 'fixed inset-x-0 top-[69px] z-49 max-h-[calc(100dvh-69px)] overflow-y-auto border-b border-line bg-card px-4 pb-4 shadow-card'
          : 'hidden'"
        :aria-label="t('header.navLabel')"
      >
        <ul
          role="list"
          class="lg:flex lg:gap-7"
        >
          <li
            v-for="item in site.nav"
            :key="item.page"
          >
            <!-- NuxtLink marks the link of the current page with aria-current="page". -->
            <NuxtLink
              :to="localePath(item.path)"
              class="flex min-h-14 items-center justify-between gap-4 border-b border-line text-[18px] whitespace-nowrap text-text no-underline transition-[color,border-color] duration-200 hover:text-accent lg:min-h-11 lg:border-b-2 lg:border-transparent lg:text-[16px] lg:text-text-muted lg:hover:text-text lg:aria-[current=page]:border-gold lg:aria-[current=page]:text-text"
              @click="close"
            >
              {{ t(`nav.${item.page}`) }}
              <IconChevronRight class="size-5 shrink-0 text-text-muted lg:hidden" />
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- Outside the menu panel, so it is one tap away on phones too. -->
      <div class="flex items-center text-[14px] font-semibold text-text-muted">
        <template
          v-for="(code, index) in languages"
          :key="code"
        >
          <span
            v-if="index > 0"
            aria-hidden="true"
          >/</span>
          <span
            v-if="code === locale"
            class="px-1.5 text-accent"
          >{{ code.toUpperCase() }}</span>
          <NuxtLink
            v-else
            :to="switchLocalePath(code)"
            :lang="code"
            :hreflang="code"
            :aria-label="t('header.switchLanguageLabel')"
            class="inline-grid min-h-11 place-items-center px-1.5 no-underline hover:text-text hover:underline"
            @click="close"
          >
            {{ code.toUpperCase() }}
          </NuxtLink>
        </template>
      </div>

      <!-- "Book now" stays in the header row at every width (spec 2), so the panel does not repeat it. -->
      <BaseButton
        :to="localePath(contact.bookingPath)"
        class="min-h-11 px-[18px]"
        @click="close"
      >
        {{ t('header.booking') }}
      </BaseButton>

      <!-- The name stays the same whether the menu is open or closed; aria-expanded tells which. -->
      <button
        ref="menuButton"
        type="button"
        class="inline-grid size-11 shrink-0 cursor-pointer place-items-center rounded-[12px] border border-line text-text transition-[background-color] duration-200 hover:bg-surface lg:hidden"
        :aria-label="t('header.menuButton')"
        :aria-expanded="isOpen"
        aria-controls="site-nav"
        @click="toggle"
      >
        <IconX
          v-if="isOpen"
          class="size-[22px]"
        />
        <IconMenu
          v-else
          class="size-[22px]"
        />
      </button>
    </div>
  </header>

  <!-- Dims the page under the open mobile menu. A click on it closes the menu. -->
  <div
    v-if="isOpen"
    class="fixed inset-x-0 top-[69px] bottom-0 z-48 bg-deeper/55 lg:hidden"
    aria-hidden="true"
    @click="close"
  />
</template>
