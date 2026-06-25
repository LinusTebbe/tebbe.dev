---
title: Vertretungsplan
description: An app to improve the substitute teacher schedule at my vocational college
dateStart: "2017-10"
dateEnd: "2018-06"
tags: [php, symfony, sql, rest, nginx, flutter, dart, android, html5, css3, git]
---

## About the Project
During my Abitur at Pictorius Berufskolleg, an early version of the Untis school cloud was in use.  
At the time, the provider offered no interfaces, no responsiveness, and very little UX, especially for mobile users.  
  
As a solution, I wrote my own Symfony backend with a web crawler and API that fetched the data from the provider, cached it, and served it back in a processed form.  
A native Android app was built alongside it, which fetched and displayed the data via the API.  
The app was distributed via the Google Play Store and was widely used throughout the school, across courses and grade levels.  

I discontinued the app once the school cloud provider offered their own alternative and had locked down their interfaces enough that simple crawling was no longer possible. 