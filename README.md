# Staycation

A web app for finding hotels, houses, and apartments near tourist attractions.

> A course project from [BWA Full-Stack JavaScript Developer: Website Travel](https://www.buildwithangga.com/kelas/full-stack-javascript-developer-website-travel) with massive customizations.

## How to Run

### Initial Run With Data Seeding

Do the following steps to populate the database with some initial documents; to populate the public images directory with some initial images; and to run all services.

Warning, the existing database and images will be dropped.

1. Shut down running services and remove existing volumes.

```bash
docker-compose -f ./docker-compose.yaml -f ./docker-compose.seeding.yaml down -v
```

2. Run all services.

```bash
docker-compose -f ./docker-compose.yaml -f ./docker-compose.seeding.yaml up -d --build
```

### Run Without Data Seeding

```bash
docker-compose up -d
```

### Running Ports

| Service | Port  |
| ------- | ----- |
| Client  | 8080  |
| CMS     | 3000  |
| MongoDB | 27017 |

## User Interface Design

See [Staycation Website UI Design](https://www.figma.com/file/WUxx1tjQ7r5MVrMDBO7suP/Staycation-Website?node-id=0%3A1).

## The Client Service

| Landing Page                                                                                                                                      | Property Details                                                                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/30113370/195056729-2c144efa-889d-4690-b976-6e5bb26fe7c6.jpeg" alt="Landing Page" width="400"> | <img src="https://user-images.githubusercontent.com/30113370/195056750-951b1ec2-aac1-4e60-b44d-020aa79bcda4.jpeg" width="400" alt="Property Details"> |

| Step 1 ~ Booking Information Form                                                                                                                             | Step 2 ~ Booking Payment Form                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://user-images.githubusercontent.com/30113370/195056754-fd0c15c2-8ec0-4559-8158-e53af304f43d.jpeg" alt="Booking Information Form" width="400"> | <img src="https://user-images.githubusercontent.com/30113370/195056765-3e9c0a84-a059-445a-a1a1-a33a0bba4fdb.jpeg" width="400" alt="Booking Payment Form"> |

| Step 3 ~ Booking Completed                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src="https://user-images.githubusercontent.com/30113370/195056759-9fde17b6-ec44-4b64-a70e-feaf8760818a.jpeg" alt="Booking Completed" width="400"> |

## The CMS Service

### Admin Dashboard

The admin functionality is supported by a dashboard; rendered by the server using EJS templating engine.

### RESTful API Documentation

See [Client API Documentation](https://documenter.getpostman.com/view/9718150/2s83meoPYL).

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
