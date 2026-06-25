---
title: db-crawler
description: Ein Crawler für die öffentlichen Schnittstellen der Deutschen Bahn.
dateStart: "2019-04"
dateEnd: "2019-05"
tags: [ rest, docker, rabbitmq, sql, git, cicd, terraform, python ]
---

## Über das Projekt

Der db-crawler ist ein Crawler für die öffentlichen Schnittstellen der Deutschen Bahn und ist als selbst koordiniertes Test-Projekt im Rahmen eines Pflichtpraktikums entstanden.  
Das Tool hat morgens kurz nach Mitternacht alle Soll-Fahrplan-Daten der Deutschen Bahn in eine Datenbank geschrieben. Da dies für jede Stunde und für jeden Bahnhof in ganz Deutschland einzeln passieren musste, wurden dafür über die öffentliche Hetzner API mehrere Cloudserver dazugebucht, hochgefahren und automatisch per cloud-init provisioniert.  
Sobald der jeweilige Server fertig installiert war, hat dieser sich selbstständig ein bereits zuvor automatisiert eingeteiltes Arbeitspaket genommen (eine Liste aus Bahnhöfen) und hat begonnen sämtliche Soll Daten für diese abzurufen.  
Die Daten wurden an den Master Server zurückgespielt und dort in einer relationalen Datenbank gespeichert.  
Sobald das Arbeitspaket abgearbeitet war, fuhr sich der Server eingenständig wieder herunter und löschte automatisch die Ressource, um so unnötige Kosten zu vermeiden.  