# 🌎 NDVI (VEGETATION INDEX) Website
An NDVI site capable of client-side computing of NDVI's from TIFF's using WEBGL, Fetching pregenerated imagery and NDVI's from most popular API's and designed following Clean Architecture Principles 
[![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![WebGL](https://img.shields.io/badge/WebGL-990000?logo=webgl&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)

The source code, following clean architecure principles 

## Goals 🏆
- Building a simple country API to demonstrate knowledge on:
  - <b>Data Access and Management</b>
    - Set up and organize the backend effectively.
    - Implement CRUD (Create, Read, Update, Delete) operations for managing state and city data.
  - <b> Integration and Scalability</b> 
    - Use TypeScript with Prisma to allow for seamless integration with Express JS.
  - <b>Documentation and Developer Experience</b> 
    - Apply the principles of ORM in practice and document what I have learned through the process of developing an API from scratch.

## What I learned 📚

### 🎨 Deep Dive into Prisma 
Prisma is an ORM (Object-Relational Mapping) tool designed to simplify database interactions and data modeling in modern web development.
- Abstraction of Database Operations
  - Prisma abstracts away low-level SQL queries and database interactions.
- Model-Driven Approach
  - Prisma encourages a model-driven approach to data management, where database entities (tables) are represented as models in the code. 
- Database Agnostic Approach
  - Prisma is great as it supports multiple database systems, including PostgreSQL, MySQL, SQLite, and SQL Server - allowing developers to switch between databases without significant code changes.
- Code Generation and Type Safety
  - Prisma's code generation capabilities create TypeScript/JavaScript client libraries based on the database schema, providing type safety and auto-completion in the IDE.
- Prisma Studio (favorite discovery ♥)
  - I discovered Prisma Studio which provides a visual representation of your database schema, including tables, columns, relationships, and constraints. 
  - This makes it easy to explore and understand the structure of your database without writing SQL queries or accessing the database directly.


### 🔍 Discovering TypeScript
I gained hands-on experience integrating TypeScript with Prisma for database operations. 
- Static Typing
  - I learned how TypeScript can help catch errors during development time rather than runtime. This enhances code reliability, reduces bugs, and improves overall code quality.
- Improved Code Readability
  - I learned how to use TypeScript interfaces and types for defining API payloads. 

### 📈 Overall Growth:
This project increased my understanding in understanding ORM (Object-Relational Mapping) concepts, including object-relational mapping, entity relationships, data abstraction, query generation, and data validation. This helped me gain valuable insights into modern JavaScript development practices, type systems, and tooling.

## API Endpoints ✅
<details>
  <summary>States Endpoints</summary>
    
    - GET All States
    Description: Retrieve all states from the database.
    Endpoint: GET /api/v1/states
    
    - GET State by ID
    Description: Retrieve a state by its ID.
    Endpoint: GET /api/v1/states/:id
    
    - CREATE State
    Description: Create a new state.
    Endpoint: POST /api/v1/states
    
    - UPDATE State
    Description: Update an existing state by its ID.
    Endpoint: PUT /api/v1/states/:id
    
    - DELETE State
    Description: Delete a state by its ID.
    Endpoint: DELETE /api/v1/states/:id
    
</details>
<details>
  <summary>Cities Endpoints</summary>
    
    - GET All Cities
    Description: Retrieve all cities from the database.
    Endpoint: GET /api/v1/cities
    
    - GET City by ID
    Description: Retrieve a city by its ID.
    Endpoint: GET /api/v1/cities/:id
    
    - CREATE City
    Description: Create a new city.
    Endpoint: POST /api/v1/cities
    
    - UPDATE City
    Description: Update an existing city by its ID.
    Endpoint: PUT /api/v1/cities/:id
    
    - DELETE City
    Description: Delete a city by its ID.
    Endpoint: DELETE /api/v1/cities/:id
    
</details>

## Future Enhancements ✨
Authentication and Security:
- Secure API endpoints with authentication mechanisms such as JWT (JSON Web Tokens) to control access.

## Running the Project 🏃
1. Fork and clone this repo locally, then navigate to the root folder of the project.
2. Install dependencies by running:
```
npm install
```
3. Start postgresql. To create the country_api database, run the following in the terminal: 
```
createdb movie_api -O <enter your db owner name>
``` 
4. Start the express server:
```
npm run dev
```
5. To reset seed data: 
```
npx prisma migrate reset
```
6. Then rerun seed files: 
```
npm run seeds
```
7. Open prisma studio to view the tables (it will run on http://localhost:5555/):
```
npx prisma studio
```
![Prisma Studio](docs/prisma_studio.png)
![Prisma Studio - State Data](docs/state_data.png)

8. To experiment with the API requests I created in Insomnia, import the docs/Insomnia_APIRequests.json file.
![Insomnia API Requests](docs/insomnia_requests.png)
Or simply browse to http://localhost:3001/api/v1/cities in a browser.

## Dependencies 🔧

- [@prisma/client](https://www.npmjs.com/package/@prisma/client): ^5.11.0
- [cors](https://www.npmjs.com/package/cors): ^2.8.5
- [express](https://www.npmjs.com/package/express): ^4.18.3
- [morgan](https://www.npmjs.com/package/morgan): ^1.10.0
- [nodemon](https://www.npmjs.com/package/nodemon): ^3.1.0
- [prisma](https://www.npmjs.com/package/prisma): ^5.11.0

### DevDependencies

- [@types/cors](https://www.npmjs.com/package/@types/cors): ^2.8.17
- [@types/express](https://www.npmjs.com/package/@types/express): ^4.17.21
- [@types/morgan](https://www.npmjs.com/package/@types/morgan): ^1.9.9
- [morgan](https://www.npmjs.com/package/morgan): ^1.10.0
- [nodemon](https://www.npmjs.com/package/nodemon): ^3.1.0
- [ts-node](https://www.npmjs.com/package/ts-node): ^10.9.2
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev): ^2.0.0
- [typescript](https://www.npmjs.com/package/typescript): ^5.4.2


🧠 This project was based on <a target="_blank"  href="https://github.com/DominicTremblay/w10d3_api/tree/full_demo_with_authentication">Dominic Tremblay's Lighthouse Labs Advanced Topic Lecture</a>.

📖 Read my blog post about <a target="_blank" href="https://dev.to/glowiep/prisma-a-modern-orm-2knh">Prisma - A Modern ORM here</a>.

![Project hours logged](https://img.shields.io/badge/Project_Hours_Logged-10.5_h-blue)
