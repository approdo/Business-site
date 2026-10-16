import { readFileSync } from 'node:fs'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { submitBooking } from '../../app/utils/submitBooking'

describe('submitBooking (N8)', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('resolves without sending anything over the network', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    await expect(submitBooking({
      name: 'สมชาย ใจดี',
      phone: '02-000-0000',
      service: 'not-sure',
      message: '',
    })).resolves.toBeUndefined()

    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('marks where a form service would be connected: TODO(formspree)', () => {
    const source = readFileSync(new URL('../../app/utils/submitBooking.ts', import.meta.url), 'utf8')
    expect(source).toContain('TODO(formspree)')
  })
})
