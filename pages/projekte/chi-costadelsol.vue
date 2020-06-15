<template>
    <div>
        <div class="card relative">
            <div class="text-3xl">CHI - COSTA DEL SOL</div>
            <div class="text-gray-600 mb-1">März 2018 - <i>heute</i></div>
            <a href="https://chi-costadelsol.com" rel="noreferrer" target="_blank" class="gray-btn">Website</a>
        </div>
        <div class="card mt-2">
            <div class="text-2xl">Beschreibung</div>
            <div class="mt-2 text-lg">
                CHI - COSTA DEL SOL sind spanische Immobilien Markler tätig in der Costa del sol(Küste der Sonne).
            </div>
        </div>
        <div class="card mt-2">
            <div class="text-2xl">Anforderungen</div>
            <div class="mt-2">
                <div class="flex flex-col text-lg">
                    <div>
                        Eine übersichtliche und moderne Oberfläche
                    </div>
                    <div>
                        Export der Immobilien als PDF Exposé
                    </div>
                    <div>
                        Eine Admin Oberfläche, in der (fast) alle Einstellungen getätigt werden können
                    </div>
                    <div>
                        Eine schnelle Suche
                    </div>
                    <div>
                        Ein asynchroner Importer
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-2">
            <div class="text-2xl">Umsetzung</div>
            <div class="mt-2 text-lg">
                Die Umsetzung erfolgte mit dem Symfony Framework.<br>
                Basierend auf diesem wurde die integrierte Task Queue mit einem RabbitMQ Backend für den Background Worker verwendet.<br>
                Das gesamte Projekt ist in einer docker-compose Datei zusammengestellt, wodurch die komplette Infrastruktur portabel<br>
                und einfach reproduzierbar wird.<br>
                <br>
                Im Front End wird auf das UIkit Framework gesetzt, durch das die moderne Oberfläche verwirklicht wird.<br>
                Für den PDF Export wir auf snappy, ein PHP Wrapper für wkhtmltopdf, welches auf WebKit basiert, gesetzt.
            </div>
        </div>
    </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'CHI - COSTA DEL SOL',
      meta: [
        { hid: 'description', name: 'description', content: 'Umsetzung einer Webplatform um zum Kauf/Mieten zur verfügung stehende Immobilien zu präsentieren' }
      ]
    }
  }
}
</script>
