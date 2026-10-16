import { describe, expect, it } from 'vitest'
import { serviceCategories } from '../../app/data/services'
import type { BookingRequest } from '../../app/types/content'
import { NOT_SURE_SERVICE_ID, validateBooking } from '../../app/utils/validateBooking'

const serviceIds = serviceCategories.flatMap(category => category.items.map(item => item.id))

// The phone number is the site's placeholder, not a real line.
const validRequest: BookingRequest = {
  name: 'สมชาย ใจดี',
  phone: '02-000-0000',
  service: serviceIds[0]!,
  message: '',
}

function validateWith(changes: Partial<BookingRequest>) {
  return validateBooking({ ...validRequest, ...changes })
}

describe('validateBooking (N8)', () => {
  it('accepts a complete request', () => {
    expect(validateBooking(validRequest)).toEqual({})
  })

  it('reports every invalid field at once', () => {
    expect(validateBooking({ name: '', phone: '', service: '', message: '' })).toEqual({
      name: 'required',
      phone: 'required',
      service: 'required',
    })
  })

  describe('name: required, 2–100 characters after trimming', () => {
    it.each(['', '   '])('requires a name (%j)', (name) => {
      expect(validateWith({ name })).toEqual({ name: 'required' })
    })

    it('rejects 1 character and accepts 2', () => {
      expect(validateWith({ name: 'ก' })).toEqual({ name: 'tooShort' })
      expect(validateWith({ name: 'กข' })).toEqual({})
    })

    it('accepts 100 characters and rejects 101', () => {
      expect(validateWith({ name: 'ก'.repeat(100) })).toEqual({})
      expect(validateWith({ name: 'ก'.repeat(101) })).toEqual({ name: 'tooLong' })
    })

    it('does not count surrounding spaces', () => {
      expect(validateWith({ name: '  ก  ' })).toEqual({ name: 'tooShort' })
      expect(validateWith({ name: ` ${'ก'.repeat(100)} ` })).toEqual({})
    })
  })

  describe('phone: required, a Thai number once spaces and hyphens are removed', () => {
    it.each([
      ['a 10-digit mobile number', '0812345678'],
      ['a 9-digit landline number', '020000000'],
      ['hyphens', '081-234-5678'],
      ['spaces', '02 000 0000'],
      ['surrounding spaces', ' 081 234 5678 '],
      ['+66 and 9 digits', '+66812345678'],
      ['+66 and 8 digits', '+6620000000'],
      ['+66 with spaces and hyphens', '+66 81-234-5678'],
    ])('accepts %s (%j)', (_case, phone) => {
      expect(validateWith({ phone })).toEqual({})
    })

    it.each(['', '   ', ' - - '])('requires a number (%j)', (phone) => {
      expect(validateWith({ phone })).toEqual({ phone: 'required' })
    })

    it.each([
      ['too few digits', '12345'],
      ['no leading 0', '812345678'],
      ['0 and only 7 digits', '08123456'],
      ['0 and 10 digits', '08123456789'],
      ['+66 and only 7 digits', '+661234567'],
      ['+66 and 10 digits', '+660812345678'],
      ['66 without +', '66812345678'],
      ['brackets, which are not removed', '(02) 000-0000'],
      ['dots, which are not removed', '081.234.5678'],
      ['a letter', '08l-234-5678'],
    ])('rejects %s (%j)', (_case, phone) => {
      expect(validateWith({ phone })).toEqual({ phone: 'invalid' })
    })
  })

  describe('service: required, a service id from services.ts or "not sure"', () => {
    it.each(serviceIds)('accepts the service id %j', (service) => {
      expect(validateWith({ service })).toEqual({})
    })

    it('accepts "not sure"', () => {
      expect(validateWith({ service: NOT_SURE_SERVICE_ID })).toEqual({})
    })

    it('does not use "not sure" as a service id', () => {
      expect(serviceIds).not.toContain(NOT_SURE_SERVICE_ID)
    })

    it('requires a choice', () => {
      expect(validateWith({ service: '' })).toEqual({ service: 'required' })
    })

    it('rejects an id that is not in the service list, such as a category id', () => {
      expect(validateWith({ service: 'unknown-service' })).toEqual({ service: 'invalid' })
      expect(validateWith({ service: serviceCategories[0]!.id })).toEqual({ service: 'invalid' })
    })
  })

  describe('message: optional, at most 1000 characters', () => {
    it('accepts an empty message and 1000 characters', () => {
      expect(validateWith({ message: '' })).toEqual({})
      expect(validateWith({ message: 'ก'.repeat(1000) })).toEqual({})
    })

    it('rejects 1001 characters', () => {
      expect(validateWith({ message: 'ก'.repeat(1001) })).toEqual({ message: 'tooLong' })
    })

    it('does not count surrounding spaces', () => {
      expect(validateWith({ message: ` ${'ก'.repeat(1000)} ` })).toEqual({})
    })
  })
})
