---
title: whois.tebbe.dev  (eigenes Projekt)  
description: Ein simpler Webdienst um die WHOIS Daten einer IP-Adresse abzurufen
link: https://whois.tebbe.dev  
start: 202005  
end: 202005  
---

<Card>

## Anwendungszweck
Ich wollte einen Dienst haben, der mir intuitiv und optisch ansprechend Daten zu angegebenen IP-Adressen ausgibt und mit IPv4 bzw. IPv6 Adressen gleichzeitig arbeiten kann.  

</Card>

<Card>

## Anforderungen
Unterstützung von IPv4 & IPv6  
Optisch ansprechend  
Material Design-Sprache  
Statisch generierte HTML, um das Hosting zu vereinfachen  
Übergabe einer abzufragenden IP-Adresse durch GET Parameter

</Card>

<Card>

## Umsetzung

Zur Umsetzung des Projektes habe ich mich für Nuxt.JS entschieden, da dies die einfache generierung von statischen HTML Dateien mit vereinfachter Wartung der Website kombiniert.  
Im Hintergrund wird auf die [offene API](https://www.arin.net/resources/registry/whois/rdap/) von ARIN gesetzt, welche direkt durch den Browser des Nutzers angefragt wird.  
Bevor aber die Anfrage an die API gestellt wird, überprüft der Dienst, ob die eingegebene Adresse auch wirklich gültig ist. (Um unnötige Anfragen zu vermeiden)  
Das styling der Seite wurde komplett selber gemacht, um meinen Wünschen zu entsprechen.

</Card>
