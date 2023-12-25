---
title: contactsync.tebbe.dev (eigenes Projekt)
description: Ein Tool um meine Kontakte von Google Contacts mit meinem IP Telefon zu synchronisieren
link: https://github.com/LinusTebbe/contactsync.tebbe.dev  
start: 202007  
end: 202007  
---

<Card>

## Anwendungsfall

Nach Anschaffung eines Grandstream IP Telefons wollte ich meine Google Kontaktliste mit der internen des Telefons synchronisieren.

</Card>

<Card>

## Umsetzung
Meine Version (das Grandstream GRP-2612) hat die Option ein Telefonbuch zu importieren.  
Unter anderem gibt es auch die Möglichkeit dies von einer gegebenen URL per HTTP bzw. HTTPS zu tun.  
Um diese Funktion nutzen zu können habe ich also das proprietäre Format von Grandstream reproduziert und mit Hilfe von Google's People API mit Daten meines Kontaktbuchs gefüllt.

</Card>

<Card>

## Nutzung

**Die Liveversion des Projektes ist aus rechtlichen Gründen nur für meine G-Suite Organisation nutzbar.**

Dieses Projekt erlaubt es einem sich mit Google als OAuth Provider anzumelden und anschließend Nutzernamen und Passwort Paare zu erstellen.   
Die generierten Zugangsdaten werden über HTTP Basic Authentifizierung an die API übergeben.  
Bei Aufruf der Schnittstelle werden automatisch die neuesten Daten von Google geladen.

Aus Datenschutzgründen werden keine Kontakte zwischengespeichert.
Sämtliche Passwörter werden ebenfalls verschlüsselt gespeichert.

</Card>
