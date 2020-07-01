---
title: XML Transformer  
description: Ein Tool welches attributorientierte XML Dateien in Elementorientierte, zur späteren weiterverarbeitung (bspw. Microsoft Access), umwandelt.  
start: 202003  
end: 202003  
---

<Card>

## Anwendungszweck
Es wurde ein Tool angefragt, welches eine Attributorientierte in eine Elementorientierte XML konvertiert,  
damit diese anschließend in weiter in dem Unternehmen verarbeitet werden kann(bspw. Buchhaltung)

</Card>

<Card>

## Anforderungen
Eine schnelle verarbeitung der XML Dateien  
Ausgangsdateien sollten von einem Ordner gelesen werden und in einen weiteren fertig konvertiert geschrieben werden  
Kompatibilität mit Windows

</Card>

<Card>

## Umsetzung

Zur Umsetzung wurde das Framework Laravel Zero verwendet.  
Das Lesen und schreiben wird von den jeweiligen integrierten XMLReader bzw. XMLWriter Modulen verwirklicht.  
Der komplette Vorgang ist Stream-basiert, was dafür sorgt, dass auch große XML Dateien problemlos und ohne großen Ressourcenaufwand konvertiert werden können.

</Card>
