---
title: CHI - COSTA DEL SOL  
description: CHI - COSTA DEL SOL sind spanische Immobilien Markler, tätig in der Costa del sol(auf deutsch Küste der Sonne).  
link: https://chi-costadelsol.com  
start: März 2018  
end: <i>heute</i>  
---

<Card>

## Anforderungen
Eine übersichtliche und moderne Oberfläche  
Export der Immobilien als PDF Exposé  
Eine Admin Oberfläche, in der (fast) alle Einstellungen getätigt werden können  
Eine schnelle Suche  
Ein asynchroner Importer

</Card>

<Card>

## Umsetzung

Die Umsetzung erfolgte mit dem Symfony Framework.  
Basierend auf diesem wurde die integrierte Task Queue mit einem RabbitMQ Backend für den Background Worker verwendet.  
Das gesamte Projekt ist in einer docker-compose Datei zusammengestellt, wodurch die komplette Infrastruktur portabel  und einfach reproduzierbar wird.  
<br>
Im Front End wird auf das UIkit Framework gesetzt, durch das die moderne Oberfläche verwirklicht wird.  
Für den PDF Export wir auf snappy, ein PHP Wrapper für wkhtmltopdf, welches auf WebKit basiert, gesetzt.

</Card>
