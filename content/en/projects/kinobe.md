---
title: kinoBE
description: A hand-written, annotation-driven ORM and REST backend for a cinema booking system, built during my IHK training.
dateStart: "2022-02"
dateEnd: "2022-03"
repo: https://github.com/LinusTebbe/kinoBE
tags: [ java, sqlite, sql, rest, git, cicd ]
---

## About the Project

kinoBE ("Kino Backend") is the server side of a cinema booking system I built during my IHK vocational training. The centerpiece of the project is a small, hand-written ORM that I implemented from scratch to understand how frameworks like Doctrine or Hibernate map objects to a relational database internally.

Entities are plain Java classes annotated with a custom `@Entity`, `@Column` and `@Id`, while `@OneToManyRelation` and `@ManyToOneRelation` describe the associations between them. At runtime the ORM resolves these annotations via reflection to build SQL, hydrate objects from result sets, and load related entities through their repositories.

On top of that it reimplements several patterns found in production ORMs:
- a repository layer (`AbstractRepository<T>`) providing `findAll`, `findBy` and `getById`,
- an identity map that caches already-loaded entities to avoid duplicate objects and redundant queries,
- and rudimentary dirty checking, where each entity remembers its initial state via a hash so that `flush()` only persists records that actually changed.

The data is stored in SQLite through JDBC, and the application exposes a REST API (movies, presentations, reservations) for the matching frontend. The build is handled by Maven with a GitHub Actions workflow.
