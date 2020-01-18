<template>
    <div>
        <div class="card relative">
            <div class="text-3xl">mysql-exporter</div>
            <div class="text-gray-600 mb-1">Januar 2020</div>
            <a href="https://github.com/LinusTebbe/mysql-exporter" target="_blank" class="gray-btn">GitHub Projekt</a>
        </div>
        <div class="card mt-2">
            <div class="text-2xl">Beschreibung</div>
            <div class="mt-2 text-lg">
                Das geforderte Tool dient zum Export einer entfernten Datenbank und den anschließenden Import in eine lokale.
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
                Den Anforderungen entsprechend, wurde das Projekt mit dem Laravel Framework, bzw. einer Abwandlung,<br>
                Laravel Zero, welches eine minimalistische, für Konsolenanwedungen optimierte Version, des Laravel Frameworks ist, umgesetzt.<br>
                <br>
                Das entwickelte Tool lädt eine zuvor generierte PHP Datei auf den Zielserver, welche darauf folgend einen SQL Dump erzeugt.<br>
                Dieser wird dann heruntergeladen und anschließend werden beide Dateien vom Server gelöscht.
            </div>
        </div>
    </div>
</template>