<script setup lang="ts">
/**
 * The map on the contact page (D-003, spec 2), in one of two modes set in app/data/contact.ts (`map`):
 *
 * - 'illustration' (the default): a drawn sample map — abstract roads, a park and the shop's pin —
 *   with no street names, coordinates or real places, and no request to Google.
 * - 'google': the client's Google Maps embed in an <iframe> that loads when it scrolls into view.
 *
 * Every text comes in as a prop, already in the visitor's language, so this component needs
 * nothing from Nuxt and the unit tests can render it on its own (tests/unit/mapEmbed.test.ts).
 */
defineProps<{
  /** contact.map.mode */
  mode: 'illustration' | 'google'
  /** contact.map.embedUrl: the src of the Google Maps embed code. Used in 'google' mode only. */
  embedUrl: string
  /** The iframe's title, announced by screen readers ('google' mode). */
  title: string
  /** What the drawn map is, for screen readers: "a sample map, not a real location". */
  label: string
  /** The tag in the top-left corner of the drawn map. */
  badge: string
  /** The name under the pin of the drawn map. */
  pinLabel: string
}>()
</script>

<template>
  <div class="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface md:aspect-[16/10]">
    <iframe
      v-if="mode === 'google'"
      :src="embedUrl"
      :title="title"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      class="absolute inset-0 size-full border-0"
    />

    <!-- One image for screen readers; the texts drawn on it are part of the picture. -->
    <div
      v-else
      role="img"
      :aria-label="label"
      class="absolute inset-0"
    >
      <!-- `slice` fills the frame at any shape and keeps the centre (the pin) in the middle. -->
      <svg
        class="absolute inset-0 size-full"
        viewBox="0 0 640 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <!-- A park and a canal. -->
        <path
          class="fill-accent-soft"
          d="M430 262c40-34 128-30 170 10s24 112-52 118-150-18-150-60 2-44 32-68z"
        />
        <path
          class="stroke-accent-soft"
          fill="none"
          stroke-width="18"
          d="M-10 352c120-30 200 10 300-6"
        />
        <!-- Roads: a wide light line with a thin edge, drawn as an edge colour under the road colour. -->
        <g
          fill="none"
          stroke-linecap="round"
        >
          <g class="stroke-line">
            <path
              stroke-width="26"
              d="M-20 214c170-18 330 14 680-26"
            />
            <path
              stroke-width="26"
              d="M302 -20c14 140-12 270 22 440"
            />
            <path
              stroke-width="18"
              d="M-20 70c190 40 420-20 680 22"
            />
            <path
              stroke-width="18"
              d="M500 -20l-30 440"
            />
            <path
              stroke-width="14"
              d="M90 420l70-220"
            />
          </g>
          <g class="stroke-card">
            <path
              stroke-width="22"
              d="M-20 214c170-18 330 14 680-26"
            />
            <path
              stroke-width="22"
              d="M302 -20c14 140-12 270 22 440"
            />
            <path
              stroke-width="14"
              d="M-20 70c190 40 420-20 680 22"
            />
            <path
              stroke-width="14"
              d="M500 -20l-30 440"
            />
            <path
              stroke-width="10"
              d="M90 420l70-220"
            />
          </g>
        </g>
      </svg>

      <span class="absolute top-3 left-3 rounded-[8px] bg-card px-2.5 py-1 text-[14px] font-semibold text-gold-ink shadow-card">
        {{ badge }}
      </span>

      <!-- The pin: its tip, inside a gold ring, is at the centre of the map. -->
      <svg
        class="absolute top-1/2 left-1/2 h-20 w-16 -translate-x-1/2 -translate-y-[80%]"
        viewBox="0 0 64 80"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="64"
          r="13"
          fill="none"
          class="stroke-gold"
          stroke-width="2.5"
        />
        <path
          class="fill-accent"
          d="M32 6a20 20 0 0 1 20 20c0 15-20 38-20 38S12 41 12 26A20 20 0 0 1 32 6z"
        />
        <circle
          cx="32"
          cy="26"
          r="7"
          class="fill-white"
        />
      </svg>
      <span class="absolute top-1/2 left-1/2 mt-5 -translate-x-1/2 rounded-[8px] bg-card px-3 py-0.5 font-heading text-[18px] font-semibold whitespace-nowrap shadow-card">
        {{ pinLabel }}
      </span>
    </div>
  </div>
</template>
