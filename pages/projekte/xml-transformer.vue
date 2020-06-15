<template>
    <div>
        <div class="card relative">
            <div class="text-3xl">XML Transformer</div>
            <div class="text-gray-600 mb-1">März 2020</div>
        </div>
        <div class="card mt-2">
            <div class="text-2xl">Beschreibung</div>
            <div class="mt-2 text-lg">
              Es wurde ein Tool angefragt, welches eine Attributorientierte in eine Elementorientierte XML konvertiert, für den nachfolgenden Import in Microsoft Access.
            </div>
        </div>
        <div class="card mt-2">
            <div class="text-2xl">Anforderungen</div>
            <div class="mt-2">
                <div class="flex flex-col text-lg">
                    <div>
                        Eine schnelle verarbeitung der XML Dateien
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-2">
            <div class="text-2xl">Umsetzung</div>
            <div class="mt-2 text-lg">
                Zur Umsetzung wurde das Framework Laravel Zero verwendet.<br>
                Das lesen und schreiben wird von den jeweiligen integrierten XMLReader bzw. XMLWriter Modulen verwirklicht.<br>
                Der komplette Vorgang ist Stream-basiert, was dafür sorgt, dass auch große XML Dateien problemlos konvertiert werden können.
            </div>
        </div>
    </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'XML Transformer',
      meta: [
        { hid: 'description', name: 'description', content: 'Umsetzung eines XML Konvertierungstools für den nachfolgenden Import in Microsoft Access' }
      ]
    }
  }
}
</script>
