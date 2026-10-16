<script setup lang="ts">
import { bookingForm } from '~/data/bookingForm'
import type { BookingField, ThaiText } from '~/types/content'

/**
 * One field of the booking form (spec 2, BookingForm): the label, the control passed in the slot,
 * an optional hint under it (the `hint` slot, e.g. a character count) and the error message.
 * The default slot receives `controlProps` to bind on the control: its id, the wiring for screen
 * readers and its look.
 *
 *   <BookingFormField v-slot="{ controlProps }" field="name" :label="..." :error="..." required>
 *     <input v-bind="controlProps" v-model="..." name="name">
 *   </BookingFormField>
 */
const props = defineProps<{
  field: BookingField
  label: string
  /** Adds the "*" after the label. The control itself still needs the `required` attribute. */
  required?: boolean
  /** Message of the field's current error, or nothing while the field is valid. */
  error?: ThaiText
}>()

const slots = defineSlots<{
  default(props: { controlProps: Record<string, string | undefined> }): unknown
  hint?(props: { id: string }): unknown
}>()

const localized = useLocalized()

// Controls keep their size in both states: the error border is 1px thicker, the padding 1px thinner.
// The focus ring comes from :focus-visible in main.css; the border turns terracotta on focus.
const baseClass = 'block min-h-12 w-full rounded-input text-[16px] leading-normal text-text placeholder:text-text-muted'
const validClass = 'border border-text-muted bg-white px-3.5 py-2.5 hover:border-text focus:border-accent'
const invalidClass = 'border-2 border-danger bg-danger-tint px-[13px] py-[9px]'

const controlId = computed(() => `f-${props.field}`)
const errorId = computed(() => `f-${props.field}-error`)
const hintId = computed(() => `f-${props.field}-hint`)

// aria-invalid only while there is an error; aria-describedby points at the error and the hint.
const controlProps = computed(() => {
  const describedBy = [props.error ? errorId.value : '', slots.hint ? hintId.value : ''].filter(Boolean).join(' ')
  return {
    'id': controlId.value,
    'class': `${baseClass} ${props.error ? invalidClass : validClass}`,
    'aria-invalid': props.error ? 'true' : undefined,
    'aria-describedby': describedBy || undefined,
  }
})
</script>

<template>
  <div class="grid content-start gap-1.5">
    <!-- Vue keeps the line break after the label text as one space before the marker. -->
    <label
      :for="controlId"
      class="text-[15px] font-semibold"
    >
      {{ label }}
      <template v-if="required">
        <span
          class="text-accent"
          aria-hidden="true"
        >*</span>
        <span class="sr-only">{{ localized(bookingForm.requiredLabel) }}</span>
      </template>
      <span
        v-else
        class="font-normal text-text-muted"
      >{{ localized(bookingForm.optionalLabel) }}</span>
    </label>
    <slot :control-props="controlProps" />
    <slot
      :id="hintId"
      name="hint"
    />
    <p
      v-if="error"
      :id="errorId"
      class="flex items-start gap-1.5 text-[14px] text-danger"
    >
      <IconCircleAlert class="mt-[3px] size-[18px] shrink-0" />
      <PhraseText :text="error" />
    </p>
  </div>
</template>
