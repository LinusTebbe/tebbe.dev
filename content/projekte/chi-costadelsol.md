---
title: CHI - COSTA DEL SOL  
description: CHI - COSTA DEL SOL sind spanische Immobilien Markler, tätig in der Costa del sol(auf deutsch Küste der Sonne).  
link: https://chi-costadelsol.com  
start: 201803  
end: 999999  
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

## Technologien

### Backend:
- PHP, Symfony
- UiKit, Vue.js
- RabbitMQ, Mercure

### Frontend:
- JavaScript, TypeScript
- Nuxt.JS, Vue.js, Axios
- TailwindCSS

</Card>

<Card>

## Umsetzung #2

Um mehr mit der Zeit zu gehen wurde das komplette, für den Nutzer sichtbare, Frontend neu gebaut.  
Dabei wurde darauf geachtet den gesamten Tech Stack zu modernisieren und dadurch für den Kunden schneller, optisch ansprechender und responsiver zu machen.  
Im Hintergrund ist alles weiterhin über die gleiche, umfangreiche, Admin Oberfläche zu konfigurieren.  
Aber im Vordergrund wird alles API-First abgerufen, sodass Daten haltung und die Visualisierung jetzt sogar in getrennten Projekten liegen.

</Card>

<Card>

## Umsetzung #1

Die Umsetzung erfolgte mit dem Symfony Framework.  
Basierend auf diesem wurde die integrierte Task Queue mit einem RabbitMQ Backend für den Background Worker verwendet.  
Das gesamte Projekt ist in einer docker-compose Datei zusammengestellt, wodurch die komplette Infrastruktur portabel  und einfach reproduzierbar wird.  
<br>
Im Front End wird auf das UIkit Framework gesetzt, durch das die moderne Oberfläche verwirklicht wird.  
Für den PDF Export wir auf snappy, ein PHP Wrapper für wkhtmltopdf, welches auf WebKit basiert, gesetzt.

</Card>
