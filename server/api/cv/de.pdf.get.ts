export default defineEventHandler(async (event) => {
  assertCvAccess(event)
  const buffer = await buildCvPdf(event, 'de')
  setHeader(event, 'Content-Type', 'application/pdf')
  setHeader(event, 'Content-Disposition', 'inline; filename="Linus-Tebbe-Lebenslauf.pdf"')
  return buffer
})
