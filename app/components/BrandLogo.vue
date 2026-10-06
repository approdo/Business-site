<script setup lang="ts">
import { site } from '~/data/site'

/**
 * Placeholder logo: the brand name only. BS-004 replaces it with the logo of the chosen design.
 * It renders no wrapper, so the element around it sets the layout and the colour.
 */
</script>

<template>
  <span class="text-[18px] leading-tight font-bold">{{ site.name }}</span>
</template>
