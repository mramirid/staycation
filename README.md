# Staycation

A web app to find providers of hotels, houses, and apartments that are closest to tourist attractions.

> A course project from [BWA Full-Stack JavaScript Developer: Website Travel](https://www.buildwithangga.com/kelas/full-stack-javascript-developer-website-travel).

## How to Run

### Initial Run with Seeding

Fill the database with initial documents and spin up the server. Warning, the database and the uploaded images will be dropped.

1. Shut down running services and remove existing volumes.

```bash
docker-compose down -v
```

2. Run all services.

```bash
docker-compose up -d --build
```

### Run Without Seeding

```bash
docker-compose up -d --scale seeding=0
```

## The Frontend Service

Screenshots...

## The Backend Service

### Admin Dashboard

The admin functionality is in the form of a dashboard that is rendered by the server using EJS Templating Engine.

### API Documentations

See [Member API Documentation](https://documenter.getpostman.com/view/9718150/2s83meoPYL)

## Techstack

Fullstack TypeScript MERN:

- TypeScript
- React.js
- TailwindCSS
- daisyUI
- MongoDB
- Node.js
- Express.js
- EJS
- SB Admin 2
- Docker
