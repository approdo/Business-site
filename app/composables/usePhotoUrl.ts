import type { PhotoFile } from '~/types/content'

/**
 * Returns a function that gives the URL of a photo file in public/images/.
 * Nuxt does not add the base path ('/Business-site/') to files in public/, so it is joined here (G-020).
 */
export function usePhotoUrl() {
  const { app } = useRuntimeConfig()
  return (photoFile: PhotoFile) => `${app.baseURL}images/${photoFile.file}`
}
