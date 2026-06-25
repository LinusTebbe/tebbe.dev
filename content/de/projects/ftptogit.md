---
title: FtpToGit
description: Laravel-Konsolenanwendung zum Monitoring eines entfernten FTP-Hosts.
dateStart: "2019-12"
dateEnd: "2019-12"
tags: [php, laravel, git]
---

## Über das Projekt
Ich wurde von einer Webagentur dazu beauftragt ein Tool zu entwickeln, welches ihnen hilft Konfigurationsänderungen an Kundenservern zu protokollieren.  
Auf Wunsch der Agentur wurde dies mit Laravel Lumen entwickelt, eine abgespeckte (für Konsolenanwendungen optimierte) Version von Laravel.  

## Funktionsweise
Das Tool kann für beliebige Kundenserver konfiguriert werden, mit einzelnen exclude listen im Glob style, analog zu einer .gitignore Datei. 
Nach Verbindungsaufbau mit dem Server des Kunden werden die Dateien auf Änderungen überprüft und anschließend in einem lokalen Git-Repository protokolliert, welches dann auf einen remote Git Server gepusht wird.  
Somit wird die hervorragende Versionskontrolle von Git genutzt, um sämtliche Konfigurationsänderungen zu protokollieren, im Agentur Alltag vereinfacht dies die Fehlersuche immens. 