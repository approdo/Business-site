import { serviceCategories } from '../data/services'
import type { BookingErrorCodes, BookingErrors, BookingRequest, TextLengthError } from '../types/content'

/** Service select value for "not sure yet, please advise". */
export const NOT_SURE_SERVICE_ID = 'not-sure'

const NAME_LENGTH = { min: 2, max: 100 }
export const MESSAGE_MAX_LENGTH = 1000

// Thai phone numbers once spaces and hyphens are removed: 0 followed by 8 or 9 digits
// (landline or mobile), or +66 followed by 8 or 9 digits (N8).
const THAI_PHONE_PATTERNS = [/^0\d{8,9}$/, /^\+66\d{8,9}$/]

const allowedServiceIds = new Set<string>([
  ...serviceCategories.flatMap(category => category.items.map(item => item.id)),
  NOT_SURE_SERVICE_ID,
])

/**
 * Checks the booking form (N8) and returns one error code per invalid field.
 * An empty object means the form is valid.
 *
 * Pure function: it needs no DOM and no Nuxt, so it is unit-tested on its own.
 * Lengths are counted after trimming, in UTF-16 code units (as the browser's `maxlength` does).
 */
export function validateBooking(request: BookingRequest): BookingErrors {
  const errors: BookingErrors = {}

  const nameError = checkLength(request.name, NAME_LENGTH)
  if (nameError) errors.name = nameError

  const phoneError = checkPhone(request.phone)
  if (phoneError) errors.phone = phoneError

  const serviceError = checkService(request.service)
  if (serviceError) errors.service = serviceError

  if (request.message.trim().length > MESSAGE_MAX_LENGTH) errors.message = 'tooLong'

  return errors
}

function checkLength(value: string, limits: { min: number, max: number }): TextLengthError | undefined {
  const length = value.trim().length
  if (length === 0) return 'required'
  if (length < limits.min) return 'tooShort'
  if (length > limits.max) return 'tooLong'
  return undefined
}

function checkPhone(value: string): BookingErrorCodes['phone'] | undefined {
  const phoneNumber = value.replace(/[\s-]/g, '')
  if (phoneNumber === '') return 'required'
  if (!THAI_PHONE_PATTERNS.some(pattern => pattern.test(phoneNumber))) return 'invalid'
  return undefined
}

function checkService(value: string): BookingErrorCodes['service'] | undefined {
  if (value === '') return 'required'
  if (!allowedServiceIds.has(value)) return 'invalid'
  return undefined
}
