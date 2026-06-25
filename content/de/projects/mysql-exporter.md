---
title: mysql-exporter
description: Laravel-Konsolenanwendung zum Klonen einer entfernten Datenbank.
dateStart: "2020-01"
dateEnd: "2020-01"
tags: [php, laravel, sql, git]
---

## Über das Projekt
Ich wurde von einer Webagentur dazu beauftragt ein Tool zu entwickeln, welches ihnen hilft die Datenbank von einem managed Webserver (ohne shell zugriff) zu einem lokalen Server zu klonen.  
Auf Wunsch der Agentur wurde dies mit Laravel Lumen entwickelt, eine abgespeckte (für Konsolenanwendungen optimierte) Version von Laravel.  

## Funktionsweise
Das Tool kann für beliebige Kundenserver konfiguriert werden, mit einer Liste an exkludierten Tabellen.  
Bei Aufruf verbindet sich die Anwendung mit dem Kundenserver und erstellt ein PHP-Skript, welches die dortige Datenbank entsprechend der Konfiguration an einen vordefinierten Pfad exportiert.  
Anschließend wird dieser Export heruntergeladen und auf dem lokalen Server importiert, daraufhin wird sowohl das Skript als auch der Export vom Kundenserver wieder gelöscht.