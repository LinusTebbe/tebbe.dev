export default defineEventHandler(async (event) => {
  assertCvAccess(event)
  // Generated at build time and bundled as a server asset (build/generate-cv.ts).
  const buffer = await useStorage('assets:server').getItemRaw('cv/de.pdf')
  if (!buffer) throw createError({ statusCode: 404, statusMessage: 'CV not found' })
  setHeader(event, 'Content-Type', 'application/pdf')
  setHeader(event, 'Content-Disposition', 'inline; filename="Linus-Tebbe-Lebenslauf.pdf"')
  return buffer
})
