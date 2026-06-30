declare module 'pdfmake' {
  interface PdfMakeFontDescriptor {
    normal: string
    bold: string
    italics: string
    bolditalics: string
  }

  interface PdfMakeOutputDocument {
    getBuffer(): Promise<Buffer>
  }

  interface PdfMakeInstance {
    setFonts(fonts: Record<string, PdfMakeFontDescriptor>): void
    setLocalAccessPolicy(callback: (path: string) => boolean): void
    setUrlAccessPolicy(callback: (url: string) => boolean): void
    createPdf(docDefinition: Record<string, unknown>): PdfMakeOutputDocument
  }

  const pdfMake: PdfMakeInstance
  export default pdfMake
}
