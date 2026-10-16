import { describe, expect, it } from 'vitest'
import { contact } from '../../app/data/contact'
import { newTabAttributes } from '../../app/utils/links'

describe('newTabAttributes', () => {
  it('opens web links in a new tab', () => {
    expect(newTabAttributes('https://example.com/')).toEqual({ target: '_blank', rel: 'noopener' })
    expect(newTabAttributes('http://example.com/')).toEqual({ target: '_blank', rel: 'noopener' })
  })

  it('opens links to this site, phone numbers and email addresses in place', () => {
    expect(newTabAttributes('/contact/#booking')).toEqual({})
    expect(newTabAttributes('tel:+6620000000')).toEqual({})
    expect(newTabAttributes('mailto:hello@nuanplai.example')).toEqual({})
  })

  it('gives none of the demo contact links a target', () => {
    for (const href of [contact.line.href, contact.bookingPath, contact.phoneHref, `mailto:${contact.email}`]) {
      expect(newTabAttributes(href)).toEqual({})
    }
  })
})
