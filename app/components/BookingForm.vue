<script setup lang="ts">
import { bookingForm } from '~/data/bookingForm'
import { serviceCategories } from '~/data/services'
import type { BookingErrors, BookingField, BookingFormContent, BookingRequest, ThaiText } from '~/types/content'
import { submitBooking } from '~/utils/submitBooking'
import { MESSAGE_MAX_LENGTH, NOT_SURE_SERVICE_ID, validateBooking } from '~/utils/validateBooking'

/**
 * The booking form on the contact page (N8, spec 2 BookingForm). Its card on the contact page has
 * id="booking", where every "Book now" and LINE button leads; the card holds the form and the
 * thank-you message, so the link has a target in both states (G-021).
 *
 * - Nothing is checked while the visitor fills in the form. The first submit checks every field;
 *   from then on each field's error follows its value, so it goes away as soon as the value is valid.
 * - A submit with errors moves the focus to the first field with an error.
 * - A valid submit replaces the form with the thank-you message, whose heading takes the focus.
 *   Nothing leaves the browser (TODO(formspree) in app/utils/submitBooking.ts).
 */
const localized = useLocalized()

// The fields in the order they appear on the page.
const FIELD_ORDER: BookingField[] = ['name', 'phone', 'service', 'message']

function emptyRequest(): BookingRequest {
  return { name: '', phone: '', service: '', message: '' }
}

const values = reactive<BookingRequest>(emptyRequest())
const hasSubmitted = ref(false)
const isSent = ref(false)

const errors = computed<BookingErrors>(() => (hasSubmitted.value ? validateBooking(values) : {}))

const errorMessages: BookingFormContent['errors'] = bookingForm.errors

function errorMessage<Field extends BookingField>(field: Field): ThaiText | undefined {
  const code = errors.value[field]
  return code === undefined ? undefined : localized(errorMessages[field][code])
}

const form = useTemplateRef<HTMLFormElement>('form')
const thankYouTitle = useTemplateRef<HTMLElement>('thankYouTitle')

function focusField(field: BookingField) {
  const control = form.value?.elements.namedItem(field)
  if (control instanceof HTMLElement) control.focus()
}

async function onSubmit() {
  hasSubmitted.value = true
  const firstInvalid = FIELD_ORDER.find(field => errors.value[field] !== undefined)
  // Let the error messages render first, so the focused field is already described by its error.
  await nextTick()
  if (firstInvalid) {
    focusField(firstInvalid)
    return
  }

  await submitBooking({ ...values })
  isSent.value = true
  await nextTick()
  thankYouTitle.value?.focus()
}

// "Send another message" brings back an empty form, ready to type into.
async function startOver() {
  Object.assign(values, emptyRequest())
  hasSubmitted.value = false
  isSent.value = false
  await nextTick()
  focusField('name')
}

// A visitor may type before the page's JavaScript has run. Take over what is already in the fields:
// on hydration Vue keeps typed text only in text inputs and textareas, and would empty the phone
// field and the service list (G-035).
onBeforeMount(() => {
  for (const field of FIELD_ORDER) {
    const control = document.getElementById(`f-${field}`)
    if (control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement) {
      values[field] = control.value
    }
  }
})

// From here on Vue handles submits; the end-to-end tests wait for this mark (G-035).
onMounted(() => {
  form.value?.setAttribute('data-hydrated', '')
})
</script>

<template>
  <div>
    <!--
      method="dialog": a submit that Vue does not handle (before the page's JavaScript runs, or without
      JavaScript) does nothing, instead of a GET that reloads the page with the typed values in the URL
      (G-035). Change it together with TODO(formspree) in app/utils/submitBooking.ts, e.g. to
      method="post" action="<form URL>", so that the form also sends without JavaScript.
    -->
    <form
      ref="form"
      method="dialog"
      novalidate
      aria-labelledby="booking-form-title"
      :hidden="isSent"
      @submit.prevent="onSubmit"
    >
      <h2
        id="booking-form-title"
        class="text-[clamp(24px,4vw,30px)]"
      >
        <PhraseText :text="localized(bookingForm.title)" />
      </h2>
      <p class="mt-2 text-text-muted">
        {{ localized(bookingForm.intro) }}
      </p>
      <p class="mt-1 text-[14px] text-text-muted">
        {{ localized(bookingForm.requiredNote) }}
      </p>

      <div class="mt-6 grid gap-5">
        <BookingFormField
          v-slot="{ controlProps }"
          field="name"
          :label="localized(bookingForm.fields.name.label)"
          :error="errorMessage('name')"
          required
        >
          <input
            v-bind="controlProps"
            v-model="values.name"
            name="name"
            type="text"
            autocomplete="name"
            required
          >
        </BookingFormField>

        <BookingFormField
          v-slot="{ controlProps }"
          field="phone"
          :label="localized(bookingForm.fields.phone.label)"
          :error="errorMessage('phone')"
          required
        >
          <input
            v-bind="controlProps"
            v-model="values.phone"
            name="phone"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            required
          >
        </BookingFormField>

        <BookingFormField
          v-slot="{ controlProps }"
          field="service"
          :label="localized(bookingForm.fields.service.label)"
          :error="errorMessage('service')"
          required
        >
          <div class="relative">
            <!-- The placeholder option shows in the muted colour; the room on the right is for the arrow. -->
            <select
              v-bind="controlProps"
              v-model="values.service"
              name="service"
              autocomplete="off"
              required
              class="cursor-pointer appearance-none pr-11 invalid:text-text-muted [&_option]:text-text"
            >
              <option value="">
                {{ localized(bookingForm.fields.service.placeholder) }}
              </option>
              <optgroup
                v-for="category in serviceCategories"
                :key="category.id"
                :label="localized(category.name)"
              >
                <option
                  v-for="item in category.items"
                  :key="item.id"
                  :value="item.id"
                >
                  {{ localized(item.name) }}
                </option>
              </optgroup>
              <option :value="NOT_SURE_SERVICE_ID">
                {{ localized(bookingForm.notSureLabel) }}
              </option>
            </select>
            <IconChevronDown class="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-text-muted" />
          </div>
        </BookingFormField>

        <BookingFormField
          field="message"
          :label="localized(bookingForm.fields.message.label)"
          :error="errorMessage('message')"
        >
          <template #default="{ controlProps }">
            <textarea
              v-bind="controlProps"
              v-model="values.message"
              name="message"
              rows="4"
              autocomplete="off"
              :placeholder="localized(bookingForm.fields.message.placeholder)"
              class="min-h-30 resize-y"
            />
          </template>
          <template #hint="{ id }">
            <p
              :id="id"
              class="text-right text-[14px] tabular-nums"
              :class="values.message.length > MESSAGE_MAX_LENGTH ? 'text-danger' : 'text-text-muted'"
            >
              {{ values.message.length }}/{{ MESSAGE_MAX_LENGTH }}
            </p>
          </template>
        </BookingFormField>
      </div>

      <BaseButton
        type="submit"
        class="mt-7 w-full md:w-auto"
      >
        {{ localized(bookingForm.submitLabel) }}
      </BaseButton>
    </form>

    <div :hidden="!isSent">
      <div
        role="status"
        class="grid justify-items-start gap-3"
      >
        <span
          class="grid size-16 place-items-center rounded-full bg-success-tint text-success"
          aria-hidden="true"
        >
          <IconCircleCheck class="size-8" />
        </span>
        <!-- Takes the focus after a successful submit, so screen readers read the message. -->
        <h2
          ref="thankYouTitle"
          tabindex="-1"
          class="text-[clamp(24px,4vw,30px)]"
        >
          <PhraseText :text="localized(bookingForm.success.title)" />
        </h2>
        <p>{{ localized(bookingForm.success.message) }}</p>
        <p class="text-[14px] text-text-muted">
          <PhraseText :text="localized(bookingForm.success.note)" />
        </p>
      </div>
      <BaseButton
        variant="outline"
        class="mt-6"
        @click="startOver"
      >
        {{ localized(bookingForm.success.resetLabel) }}
      </BaseButton>
    </div>
  </div>
</template>
