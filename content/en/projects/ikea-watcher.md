---
title: ikea-watcher
description: A Typescript-based Discord bot for emptying entire channels.
dateStart: "2026-03"
dateEnd: "2026-04"
repo: "https://github.com/LinusTebbe/ikea-watcher"
tags: [ typescript, deno, rest, git ]
featuredInCv: true
---

## About the Project

ikea-watcher is a Typescript-based Discord bot that lets you monitor search terms in IKEA's Second Chance markets and sends notifications when matching items become available.

A configuration file is used to set which IKEA stores are relevant and to define a list of search terms for the bot to monitor.  
If a new result appears in one of the relevant stores, a notification is sent to the specified Discord user via direct message.  
This includes a link to the product page where the item can be reserved directly, a description of its condition, the store where the item was found, and a Google Maps link for navigating to that store.
