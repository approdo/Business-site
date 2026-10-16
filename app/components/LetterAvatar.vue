<script setup lang="ts">
/**
 * A round avatar with one letter, used instead of photos of people (N12, spec 2).
 * It is hidden from screen readers: the person's name is always written next to it.
 */
withDefaults(defineProps<{
  letter: string
  /** 'small' (44px) next to a review, 'large' (88px) on a team card. */
  size?: 'small' | 'large'
}>(), {
  size: 'small',
})
</script>

<template>
  <span
    class="grid shrink-0 place-items-center rounded-full bg-accent-soft font-heading font-semibold text-accent-hover"
    :class="size === 'large' ? 'size-[88px] text-[34px]' : 'size-11 text-[18px]'"
    aria-hidden="true"
  >{{ letter }}</span>
</template>
