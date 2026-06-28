---
title: kinoBE
description: Ein von Hand geschriebenes, annotationsbasiertes ORM samt REST-Backend für ein Kinobuchungssystem, entwickelt während meiner IHK-Ausbildung.
dateStart: "2022-02"
dateEnd: "2022-03"
repo: https://github.com/LinusTebbe/kinoBE
tags: [ java, sqlite, sql, rest, git, cicd ]
---

## Über das Projekt

kinoBE („Kino-Backend") ist die Serverseite eines Kinobuchungssystems, das ich während meiner IHK-Ausbildung entwickelt habe. Das Herzstück des Projekts ist ein kleines, von Hand geschriebenes ORM, das ich von Grund auf umgesetzt habe, um zu verstehen, wie Frameworks wie Doctrine oder Hibernate Objekte intern auf eine relationale Datenbank abbilden.

Entitäten sind einfache Java-Klassen, die mit eigenen Annotationen `@Entity`, `@Column` und `@Id` versehen sind; `@OneToManyRelation` und `@ManyToOneRelation` beschreiben die Beziehungen zwischen ihnen. Zur Laufzeit wertet das ORM diese Annotationen per Reflection aus, um SQL zu erzeugen, Objekte aus Result-Sets zu befüllen und verknüpfte Entitäten über ihre Repositories nachzuladen.

Darüber hinaus bildet es mehrere Muster nach, die auch produktive ORMs verwenden:
- eine Repository-Schicht (`AbstractRepository<T>`) mit `findAll`, `findBy` und `getById`,
- eine Identity Map, die bereits geladene Entitäten zwischenspeichert, um doppelte Objekte und überflüssige Abfragen zu vermeiden,
- sowie ein rudimentäres Dirty-Checking, bei dem sich jede Entität ihren Ausgangszustand über einen Hash merkt, sodass `flush()` nur tatsächlich geänderte Datensätze speichert.

Die Daten werden über JDBC in SQLite gespeichert, und die Anwendung stellt eine REST-API (Filme, Vorstellungen, Reservierungen) für das passende Frontend bereit. Der Build erfolgt mit Maven und einem GitHub-Actions-Workflow.
