---
title: mysql-exporter  
description: Umsetzung einer Laravel Konsolenanwendung zum Klonen einer entfernten Datenbank auf eine lokale ohne direkten Zugriff  
start: Januar 2020  
listPosition: 2
---

<Card>

## Anwendungszweck
Das angefragte Tool wird verwendet um die Struktur und Daten einer entfernten, nicht direkt erreichbaren, Datenbank auf eine lokale zu kopieren.  
Es ist lediglich ein PHP Webspace mit SFTP-Zugang verfügbar.

</Card>

<Card>

## Anforderungen
Konsolenanwedung  
Basierend auf Laravel  
Möglichst schnell
Schema der Konfigurationsdatei vorgegeben  
Kann nur SFTP und HTTP nutzen

</Card>

<Card>

## Umsetzung

Den Anforderungen entsprechend, wurde das Projekt mit dem Laravel Framework, bzw. einer Abwandlung,  
Laravel Zero, welches eine minimalistische, für Konsolenanwendungen optimierte Version, des Laravel Frameworks ist, umgesetzt.  
                  
Das entwickelte Tool lädt eine selbstständig generierte PHP Datei per SFTP bzw. FTP auf den Zielserver, welche darauf folgend von dem Script aufgerufen wird und einen SQL Dump erzeugt.  
Dieser wird dann heruntergeladen, in die lokale Datenbank importiert und anschließend werden beide Dateien vom Server gelöscht.  
Das alles passiert voll automatisch und ohne Interaktion des Nutzers.

</Card>
