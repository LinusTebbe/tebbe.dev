---
title: mysql-exporter
description: Laravel console application for cloning a remote database.
dateStart: "2020-01"
dateEnd: "2020-01"
tags: [php, laravel, sql, git]
---

## About the Project
I was commissioned by a web agency to develop a tool that helps them clone the database from a managed web server (without shell access) to a local server.  
At the agency's request, this was built with Laravel Lumen, a stripped-down version of Laravel optimized for console applications.  

## How It Works
The tool can be configured for any client server, with a list of excluded tables.  
When run, the application connects to the client's server and creates a PHP script that exports the database there to a predefined path according to the configuration.  
This export is then downloaded and imported on the local server, after which both the script and the export are deleted from the client's server again.