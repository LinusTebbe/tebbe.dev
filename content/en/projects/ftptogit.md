---
title: FtpToGit
description: Laravel console application for monitoring a remote FTP host.
dateStart: "2019-12"
dateEnd: "2019-12"
tags: [php, laravel, git]
---

## About the Project
I was commissioned by a web agency to develop a tool that helps them log configuration changes on client servers.  
At the agency's request, this was built with Laravel Lumen, a stripped-down version of Laravel optimized for console applications.  

## How It Works
The tool can be configured for any number of client servers, with individual glob-style exclude lists, similar to a .gitignore file. 
After connecting to the client's server, the files are checked for changes and then logged in a local Git repository, which is then pushed to a remote Git server.  
This way, Git's excellent version control is used to log every configuration change, which greatly simplifies troubleshooting in everyday agency work. 