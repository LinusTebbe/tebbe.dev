---
title: dukcc-bot
description: Ein TypeScript-basierter Discord-Bot + Backend für das PenguinNetwork.
dateStart: "2025-01"
dateEnd: "9999-99"
tags: [ typescript, java, deno, rest, docker, rabbitmq, sql, git, cicd ]
---

## Über das Projekt

dukcc-bot ist ein TypeScript-basierter Discord-Bot, der viele proprietäre Features für das PenguinNetwork bereitstellt.  
Dazu zählen
- Automatisches Zuweisen von Rollen basierend auf der Spielzeit
- Synchronisierung von Rollen zwischen Game-Servern und Discord
- Verknüpfung von Spiel-Accounts und Discord-Accounts
- Automatisierte Verwaltung von Giveaways basierend auf der Spielzeit der Nutzer
- Discord-Invite-Tracking-System zur Beurteilung der Effektivität von Werbung
- REST-Schnittstellen zur Integration mit anderen Diensten, wie beispielsweise der Website

Zum Projekt gehört außerdem ein Gegenstück in Java, das für die Game-Server-Seite des Bots zuständig ist.  
Es kommuniziert mit dem Bot über RabbitMQ und REST-APIs.