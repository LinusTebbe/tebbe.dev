---
title: dukcc-bot
description: A Typescript-based Discord bot + backend for the PenguinNetwork.
dateStart: "2025-01"
dateEnd: "9999-99"
tags: [ typescript, java, deno, rest, docker, rabbitmq, sql, git, cicd ]
---

## About the Project

dukcc-bot is a Typescript-based Discord bot that provides many proprietary features for the PenguinNetwork.  
These include
- Automatic role assignment based on playtime
- Role synchronization between game servers and Discord
- Linking game accounts and Discord accounts
- Automated management of giveaways based on users' playtime
- Discord invite tracking system to assess advertising effectiveness
- REST interfaces for integration with other services, such as the website

This project also includes a counter-part in Java, which is responsible for the game server side of the bot.  
It communicates with the bot via RabbitMQ and Rest APIs.