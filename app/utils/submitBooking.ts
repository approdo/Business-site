import type { BookingRequest } from '../types/content'

/**
 * Sends a booking request that has passed `validateBooking()`.
 *
 * This demo site has no backend, so nothing leaves the browser (N8): the form
 * validates and then shows its thank-you message.
 */
export async function submitBooking(request: BookingRequest): Promise<void> {
  // TODO(formspree): to receive the requests, create a form at https://formspree.io (or a similar
  // service) and send the request to it, e.g.
  //   await fetch('https://formspree.io/f/<FORM_ID>', {
  //     method: 'POST',
  //     headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  //     body: JSON.stringify(request),
  //   })
  // and change the form in app/components/BookingForm.vue to method="post" action="<form URL>".
  // Until then the form only validates and shows the thank-you message,
  // so `request` is intentionally unused.
  void request
}
