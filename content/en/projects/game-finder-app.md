---
title: game-finder.app
description: A search and filter app for discovering Steam games by genre, tags, features, and playtime.
dateStart: "2024-06"
dateEnd: "2024-12"
link: https://game-finder.app/search
featuredInCv: true
tags: [php, symfony, nuxt, sql, rest, html5, css3, vuejs, nginx, git, docker, cicd, tailwindcss]
---

## About the project

game-finder.app is a web app for searching and discovering games from the Steam catalog in a targeted way. Instead of clicking through endless store listings, you can narrow the catalog down through several combinable filters until only the games that match your tastes and available time remain.

You can filter by playtime (estimated time to finish the main story, optionally including DLCs), release date, genres (e.g. Adventure, RPG, Strategy, Action, Indie, Simulation, Casual, Free to Play, Massively Multiplayer, Racing), tags, as well as technical features such as single-player, multiplayer, co-op (online, LAN, together), Steam Achievements, full controller support, Steam Cloud, and Remote Play. Results can be sorted by playtime, price, rating, or discount.

Each match is shown as a card with the title, release year, genre, a short description, the associated tags, the estimated playtime, and a rating score.

Technically, the project consists of a backend built with PHP/Symfony that prepares the game data and exposes it via a REST API, together with a frontend built with Nuxt and Vue.js (TailwindCSS).
