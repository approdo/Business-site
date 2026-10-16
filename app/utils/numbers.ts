/**
 * A whole number with thousands separators: formatNumber(1100) returns '1,100'.
 * Prices on the site are written the same way in both languages.
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

/**
 * A number in Thai digits, a decoration of design A: thaiNumeral(1) returns '๑'.
 * Used for the numbered "why us" list in both languages (shown to sighted visitors only).
 */
export function thaiNumeral(value: number): string {
  return new Intl.NumberFormat('th-TH-u-nu-thai').format(value)
}
