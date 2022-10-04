# Staycation

A web app to find providers of hotels, houses, and apartments that are closest to tourist attractions.

> A course project from [BWA Full-Stack JavaScript Developer: Website Travel](https://www.buildwithangga.com/kelas/full-stack-javascript-developer-website-travel).

## How to Run

### Initial Run With Seeding

Fill the database with initial documents; add initial images into the public images; and run all services. Warning, the existing database and images will be dropped.

1. Shut down running services and remove existing volumes.

```bash
docker-compose -f ./docker-compose.yaml -f ./docker-compose.seeding.yaml down -v
```

2. Run all services.

```bash
docker-compose -f ./docker-compose.yaml -f ./docker-compose.seeding.yaml up -d --build
```

### Run Without Seeding

```bash
docker-compose up -d
```

## The Client Service

Screenshots...

## The Backend Service

### Admin Dashboard

The admin functionality is supported by a dashboard; rendered by the server using EJS templating engine.

### RESTful API Documentation

See [Client API Documentation](https://documenter.getpostman.com/view/9718150/2s83meoPYL)

## Techstack

Fullstack TypeScript MERN:

- [TypeScript](https://www.typescriptlang.org/) - a strongly typed programming language that builds on JavaScript.
- [React.js](https://reactjs.org/) - a JavaScript library for building user interfaces.
- [TailwindCSS](https://tailwindcss.com/) - a utility-first CSS framework packed with classes like `flex`, `pt-4`, `text-center`, etc., that can be composed to build any design, directly in the markup.
- [daisyUI](https://daisyui.com/) - the most popular, free and open-source Tailwind CSS component library.
- [MongoDB](https://www.mongodb.com/docs/) - a NoSQL database management application.
- [Node.js](https://nodejs.org/) - a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Express.js](https://expressjs.com/) - a fast, unopinionated, and minimalist web framework for Node.js.
- [EJS](https://ejs.co/) - a simple templating language for generating HTML markup with plain JavaScript.
- [SB Admin 2](https://github.com/startbootstrap/startbootstrap-sb-admin-2) - a free Bootstrap 4 admin dashboard theme built with HTML/CSS.
- [Docker](https://www.docker.com/) - an open platform for developing, shipping, and running applications.
