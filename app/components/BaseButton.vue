<script setup lang="ts">
import { NuxtLink } from '#components'
import type { RouteLocationRaw } from 'vue-router'

/**
 * The site's pill-shaped button (spec 2). With `to` it renders a <NuxtLink> to a page of this site,
 * with `href` a plain link (tel:, mailto:, another site), otherwise a <button type="button">
 * (pass type="submit" to submit a form).
 */
type ButtonVariant = 'primary' | 'outline' | 'ghost-light'

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw
  href?: string
  /**
   * 'primary' is the main call to action ("Book now"); 'outline' a secondary one on a light background;
   * 'ghost-light' a secondary one on a dark background.
   */
  variant?: ButtonVariant
}>(), {
  to: undefined,
  href: undefined,
  variant: 'primary',
})

const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))

// Only the button's own colours fade, not the focus ring (lesson G-015): Tailwind's ready-made
// class for fading colours also fades `outline-color`, so the ring would first show in the text colour.
// Pressed (active) looks the same as hover; there is no disabled state (spec 2).
const variantClasses: Record<ButtonVariant, string> = {
  'primary': 'border-transparent bg-accent text-white hover:bg-accent-hover',
  'outline': 'border-text bg-transparent text-text hover:bg-text hover:text-bg',
  'ghost-light': 'border-on-deep-muted bg-transparent text-on-deep hover:bg-on-deep hover:text-deep',
}
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="to || href ? undefined : 'button'"
    class="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-button border-[1.5px] px-6 text-[16px] leading-none font-semibold whitespace-nowrap no-underline transition-[color,background-color,border-color] duration-200"
    :class="variantClasses[variant]"
  >
    <slot />
  </component>
</template>
