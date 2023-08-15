# Todo App

Todo App is a task management application that includes both frontend and backend components. It is built using React.js, Node.js, Express, TypeScript, Sequelize, and Docker.

## 🗃Project Structure

- **/backend**: Contains all the backend code, including server configuration, routes, database connection, etc.
- **/frontend**: Includes all the frontend code for the client-side of the application, built with React, Vite, and Tailwind CSS.
- **/docker-compose.yml**: Configuration file to define and run multi-container Docker applications.

## Technologies Used

- **Language:** TypeScript
- **Runtime Environment:** Node.js (v20)
- **Web Framework (Backend):** Express
- **ORM (Backend):** Sequelize
- **Database (Backend):** PostgreSQL
- **Frontend Framework:** React
- **Build Tool (Frontend):** Vite
- **Styling (Frontend):** Tailwind CSS
- **Containerization:** Docker
- **Documentation (Backend):** Swagger
- **Testing (Backend):** Jest, Supertest


### Prerequisites

- Node.js (v20): Make sure you have Node.js version 20 installed on your system.
- Docker: For containerized deployment.



### Backend Packages

[Refer to the previous package details]

### Frontend Packages

- **Styling:** @heroicons/react, @tailwindcss/line-clamp
- **Environment Variables:** dotenv
- **Routing:** react-router-dom
- **Build and Development Tools:** vite, typescript, eslint, autoprefixer, postcss
- **React Versions:** react, react-dom

## Getting Started

### Environment Variables

- For Docker: Create a `.env` file in the root directory.
- For running frontend locally: Create a `.env` file in the `frontend` folder.
- For running backend locally: Create a `.env` file in the `backend` folder.

### Example `.env` File

```env
# Database connection parameters
DB_HOST=db
DB_PORT=5432
DB_USERNAME=username
DB_PASSWORD=password
DB_NAME=mydatabase
DB_DIALECT=postgres

# Backend application port
BACKEND_PORT=3000
BACKEND_DOMAIN=0.0.0.0

# Frontend port
VITE_FRONTEND_HOST=0.0.0.0
VITE_FRONTEND_PORT=8080

# Backend API URL for frontend
VITE_API_BASE_URL=http://localhost:3000

# Frontend client URL for backend
BACKEND_FRONTEND_URL=http://localhost:8080
```

### Running with Docker

1. In the root directory, build the Docker images with `docker-compose build`.
2. Run the Frontend & Backend Docker containers with `docker-compose up frontend backend`.
3. Run Tests: Create the test database and test user, then run the test container with `docker-compose up test`.


### Running the Application Locally

#### Frontend

1. Navigate to the \`frontend\` directory.
2. Install dependencies: \`npm install\`.
3. Start the development server: \`npm start\`.
4. Visit `http://localhost:8080` (or the specified port).

#### Backend

1. Navigate to the \`backend\` directory.
2. Install dependencies: \`npm install\`.
3. Start the server: \`npm start\`.
4. Visit `http://localhost:3000/` (or the specified port).


## Documentation

API documentation is provided with Swagger UI and is accessible at the `/api-docs` endpoint in the backend.