---
title: game-finder.app
description: Eine Such- und Filter-App, um Steam-Spiele anhand von Genre, Tags, Features und Spieldauer zu entdecken.
dateStart: "2024-06"
dateEnd: "2024-12"
link: https://game-finder.app/search
featuredInCv: true
tags: [php, symfony, nuxt, sql, rest, html5, css3, vuejs, nginx, git, docker, cicd, tailwindcss]
---

## Über das Projekt

game-finder.app ist eine Web-App, mit der sich Spiele aus dem Steam-Katalog gezielt durchsuchen und entdecken lassen. Statt sich durch endlose Store-Listen zu klicken, lässt sich der Katalog über mehrere kombinierbare Filter so weit eingrenzen, bis genau die Spiele übrig bleiben, die zu den eigenen Vorlieben und der verfügbaren Zeit passen.

Gefiltert werden kann unter anderem nach Spieldauer (geschätzte Zeit bis zum Abschluss der Story, optional inklusive DLCs), Erscheinungsdatum, Genres (z. B. Adventure, RPG, Strategy, Action, Indie, Simulation, Casual, Free to Play, Massively Multiplayer, Racing), Tags sowie technischen Features wie Single-Player, Multiplayer, Co-op (online, LAN, gemeinsam), Steam Achievements, voller Controller-Support, Steam Cloud und Remote Play. Die Ergebnisse lassen sich nach Spieldauer, Preis, Bewertung oder Rabatt sortieren.

Jeder Treffer wird als Karte mit Titel, Erscheinungsjahr, Genre, Kurzbeschreibung, den zugehörigen Tags, der geschätzten Spieldauer und einer Bewertungswertung dargestellt.

Technisch besteht das Projekt aus einem in PHP/Symfony umgesetzten Backend, das die Spieldaten aufbereitet und über eine REST-Schnittstelle bereitstellt, sowie einem mit Nuxt und Vue.js gebauten Frontend (TailwindCSS).