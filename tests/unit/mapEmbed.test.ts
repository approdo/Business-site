import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import MapEmbed from '../../app/components/MapEmbed.vue'
import { contact } from '../../app/data/contact'

// The map on the contact page (D-003): a drawn sample map by default, a Google Maps embed when
// contact.map.mode is 'google'. No test loads anything from Google: the embed URL is only compared.

const texts = {
  title: 'Map of the shop on Google Maps',
  label: 'Sample map, not a real location',
  badge: 'Sample map',
  pinLabel: 'Nuanplai',
}

function renderMap(mode: 'illustration' | 'google', embedUrl: string) {
  return renderToString(createSSRApp({ render: () => h(MapEmbed, { mode, embedUrl, ...texts }) }))
}

describe('MapEmbed', () => {
  it('in google mode shows the embed URL in a lazily loaded <iframe> with a title', async () => {
    const embedUrl = 'https://www.google.com/maps/embed?pb=test-only'
    const html = await renderMap('google', embedUrl)

    const iframes = html.match(/<iframe[^>]*>/g) ?? []
    expect(iframes).toHaveLength(1)
    const iframe = iframes[0]!
    expect(iframe).toContain(`src="${embedUrl}"`)
    expect(iframe).toContain('loading="lazy"')
    expect(iframe).toContain(`title="${texts.title}"`)
    expect(iframe).toContain('referrerpolicy="no-referrer-when-downgrade"')
    expect(html).not.toContain('role="img"')
  })

  it('in illustration mode draws a labelled sample map, with no <iframe> and no link to Google', async () => {
    const html = await renderMap('illustration', 'https://www.google.com/maps/embed?pb=unused')

    expect(html).not.toContain('<iframe')
    expect(html).not.toContain('google.')
    expect(html).toContain(`role="img" aria-label="${texts.label}"`)
    expect(html).toContain(texts.badge)
    expect(html).toContain(texts.pinLabel)
  })
})

describe('contact.map (D-003)', () => {
  it('shows the drawn sample map by default, with no embed URL', () => {
    expect(contact.map.mode).toBe('illustration')
    expect(contact.map.embedUrl).toBe('')
  })

  it('has an iframe title in both languages for when it is switched to Google Maps', () => {
    expect(contact.map.title.th).not.toBe('')
    expect(contact.map.title.en).not.toBe('')
  })

  it('explains how to switch to Google Maps: TODO(map)', () => {
    const source = readFileSync(new URL('../../app/data/contact.ts', import.meta.url), 'utf8')
    expect(source).toContain('TODO(map)')
  })
})
