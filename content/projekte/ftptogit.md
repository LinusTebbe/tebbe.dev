---
title: FtpToGit  
description: Umsetzung einer Laravel Konsolenanwendung zum Monitoring eines remote FTP Hosts  
start: Dezember 2019  
listPosition: 1
---

<Card>

## Anwendungszweck
Das entwickelte Tool lädt Ordner, unter berücksichtigung der gitignore Regeln, von einem remote Server (bspw. SFTP/FTP) herunter,  
um diese dann anschließend auf eine, in der Config spezifizierte, Git Branch zu importieren

</Card>

<Card>

## Anforderungen
Konsolenanwendung  
Basierend auf Laravel  
Respektiert vorhandene .gitignore Regeln  
Möglichst schnell  
Schema der Konfigurationsdatei vorgegeben  

</Card>

<Card>

## Umsetzung

Um den Anforderungen zu entsprechen wurde das Projekt mit Laravel (Zero) umgesetzt.  
Für die Interaktionen mit den Dateiservern wird auf das <a href="https://flysystem.thephpleague.com/docs" rel="noreferrer" class="underline">Flysystem</a> von "thephpleague" gesetzt.  
Dadurch wird der Datei Zugriff vereinfacht und möglichst effizient durchgeführt.  
<br>
Der Zugriff zu den Git Repositories erfolgt über einen einheitlichen SSH-Schlüssel, während der Zugriff auf den Dateiserver durch  
eine übliche Benutzer/Passwort Kombination realisiert wird.

</Card>
