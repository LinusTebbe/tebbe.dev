import type { H3Event } from 'h3'

// The PDFs themselves are generated at build time (see build/generate-cv.ts)
// and bundled as server assets — this module only guards access to them at
// runtime. Keeping pdfmake / font / filesystem work out of server/ means none
// of it gets bundled into the deployed Worker, where it could not run anyway.
export function assertCvAccess(event: H3Event) {
  if (process.env.NODE_ENV !== 'production') return
  // Pass `event`: on Cloudflare, env-backed runtimeConfig is only applied once
  // the request context exists — useRuntimeConfig() with no event reads the
  // empty-string default instead of NUXT_CV_ACCESS_KEY.
  const expectedKey = useRuntimeConfig(event).cvAccessKey
  const providedKey = getQuery(event).key
  if (!expectedKey || providedKey !== expectedKey) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}
