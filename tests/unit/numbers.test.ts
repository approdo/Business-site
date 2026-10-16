import { describe, expect, it } from 'vitest'
import { formatNumber, thaiNumeral } from '../../app/utils/numbers'

describe('formatNumber', () => {
  it('adds thousands separators', () => {
    expect(formatNumber(400)).toBe('400')
    expect(formatNumber(1100)).toBe('1,100')
    expect(formatNumber(12500)).toBe('12,500')
  })
})

describe('thaiNumeral', () => {
  it('writes numbers in Thai digits', () => {
    expect([1, 2, 3, 4].map(thaiNumeral)).toEqual(['๑', '๒', '๓', '๔'])
    expect(thaiNumeral(10)).toBe('๑๐')
  })
})
