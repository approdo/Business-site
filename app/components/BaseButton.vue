<script setup lang="ts">
import { NuxtLink } from '#components'
import type { RouteLocationRaw } from 'vue-router'

/**
 * The site's button style. With `to` it renders a <NuxtLink> to a page of this site, with `href`
 * a plain link (tel:, mailto:, another site), otherwise a <button type="button">
 * (pass type="submit" to submit a form).
 */
type ButtonVariant = 'primary' | 'outline'

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw
  href?: string
  /** 'primary' is the main call to action; 'outline' is a secondary one. */
  variant?: ButtonVariant
}>(), {
  to: undefined,
  href: undefined,
  variant: 'primary',
})

const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'button'))

// Only the button's own colours fade, not the focus ring (lesson G-015): Tailwind's ready-made
// class for fading colours also fades `outline-color`, so the ring would first show in the text colour.
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'border-transparent bg-accent-500 text-brand-900 hover:bg-accent-400 active:bg-accent-600',
  outline: 'border-brand-900 bg-surface text-brand-900 hover:bg-brand-50 active:bg-brand-100',
}
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    :type="to || href ? undefined : 'button'"
    class="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-button border-2 px-6 py-2.5 text-[17px] leading-[1.4] font-bold whitespace-nowrap transition-[color,background-color,border-color] duration-150"
    :class="variantClasses[variant]"
  >
    <slot />
  </component>
</template>
