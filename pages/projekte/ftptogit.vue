<template>
    <div>
        <div class="card relative">
            <div class="text-3xl">FtpToGit</div>
            <div class="text-gray-600 mb-1">Dezember 2019</div>
        </div>
        <div class="card mt-2">
            <div class="text-2xl">Beschreibung</div>
            <div class="mt-2 text-lg">
                Das geforderte Tool lädt einen entfernten Ordner herunter, um diesen in eine in der Konfiguration spezifizierte Git Branch zu importieren.
            </div>
        </div>
        <div class="card mt-2">
            <div class="text-2xl">Anforderungen</div>
            <div class="mt-2">
                <div class="flex flex-col text-lg">
                    <div>
                        Konsolenanwedung
                    </div>
                    <div>
                        Basierend auf Laravel
                    </div>
                    <div>
                        Möglichst schnell
                    </div>
                    <div>
                        Schema der Konfigurationsdatei vorgegeben
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-2">
            <div class="text-2xl">Umsetzung</div>
            <div class="mt-2 text-lg">
                Um den Anforderungen zu entsprechen wurde das Projekt mit Laravel (Zero) umgesetzt.<br>
                Für die Interaktionen mit den Dateiservern wird auf das <a href="https://flysystem.thephpleague.com/docs" class="underline">Flysystem</a> von "thephpleague" gesetzt.<br>
                Dadurch wird der Datei Zugriff vereinfacht und möglichst effizient durchgeführt.<br>
                <br>
                Der Zugriff zu den Git Repositories erfolgt über einen einheitlichen SSH-Schlüssel, während der Zugriff auf den Dateiserver durch<br>
                eine übliche Benutzer/Passwort Kombination realisiert wird.
            </div>
        </div>
    </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'FtpToGit',
      meta: [
        { hid: 'description', name: 'description', content: 'Umsetzung einer Laravel Konsolenanwendung zum Monitoring eines remote FTP Hosts' }
      ]
    }
  }
}
</script>