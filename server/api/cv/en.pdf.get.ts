export default defineEventHandler(async (event) => {
  assertCvAccess(event)
  const buffer = await buildCvPdf(event, 'en')
  setHeader(event, 'Content-Type', 'application/pdf')
  setHeader(event, 'Content-Disposition', 'inline; filename="Linus-Tebbe-CV.pdf"')
  return buffer
})
