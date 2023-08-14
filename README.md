# Todo App

Todo App is a task management application that includes both frontend and backend components. It is built using React.js, Node.js, Express, TypeScript, Sequelize, and Docker.

## Project Structure

- **/backend**: Contains all the backend code, including server configuration, routes, database connection, etc.
- **/frontend**: Includes all the frontend code for the client-side of the application.
- **/docker-compose.yml**: Configuration file to define and run multi-container Docker applications.

## Technologies Used

- **Language:** TypeScript
- **Web Framework (Backend):** Express
- **ORM (Backend):** Sequelize
- **Database (Backend):** PostgreSQL
- **Containerization:** Docker
- **Documentation (Backend):** Swagger
- **Testing (Backend):** Jest, Supertest

### Backend Packages

[Refer to the previous package details]

### Frontend Packages


## Getting Started

### Running with Docker

1. In the root directory, build the Docker images with `docker-compose build`.
2. Run the Docker containers with `docker-compose up backend db`.

## Documentation

API documentation is provided with Swagger UI and is accessible at the `/api-docs` endpoint in the backend.

## Testing

### Backend

Run tests with the following command:

```bash
npm run test:watch
