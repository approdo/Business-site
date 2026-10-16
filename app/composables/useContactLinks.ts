import { contact } from '~/data/contact'
import { newTabAttributes } from '~/utils/links'

/**
 * Where the booking and LINE buttons lead, in the visitor's language, as props for <BaseButton>.
 *
 * - "จองคิว" (book now) always leads to the booking form on the contact page (D-002).
 * - LINE leads to the same form while contact.line.href is a path of this site (TODO(line) in
 *   contact.ts); once a client's real LINE link is set there, it opens that link in a new tab.
 */
export function useContactLinks() {
  const localePath = useLocalePath()

  const bookingTo = computed(() => localePath(contact.bookingPath))
  const lineProps = computed(() => (contact.line.href.startsWith('/')
    ? { to: localePath(contact.line.href) }
    : { href: contact.line.href, ...newTabAttributes(contact.line.href) }))

  return { bookingTo, lineProps }
}
