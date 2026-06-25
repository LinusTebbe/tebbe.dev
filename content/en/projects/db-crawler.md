---
title: db-crawler
description: A crawler for Deutsche Bahn's public interfaces.
dateStart: "2019-04"
dateEnd: "2019-05"
tags: [ rest, docker, rabbitmq, sql, git, cicd, terraform ]
---

## About the Project

The db-crawler is a crawler for Deutsche Bahn's public interfaces, built as a self-coordinated test project during a mandatory internship.  
Every morning shortly after midnight, the tool wrote all of Deutsche Bahn's scheduled timetable data into a database. Since this had to happen separately for every hour and every train station across Germany, several cloud servers were provisioned on demand via the public Hetzner API, booted up, and automatically configured via cloud-init.  
As soon as a given server was fully set up, it independently picked up a previously and automatically assigned work package (a list of stations) and started fetching all scheduled data for them.  
The data was sent back to the master server and stored there in a relational database.  
Once the work package was completed, the server shut itself down and automatically deleted the resource, avoiding unnecessary costs.  