# Task Management API

This is a simple Task Management API with user authentication and task management features. The API uses `bcrypt` for secure password hashing. Users can create an account, log in, and manage tasks (add, update, delete, and view tasks).

---

## Features

- **User Authentication**: Register and login with password hashing using `bcrypt`.
- **Task Management**: Add, retrieve, update, and delete tasks.
  
## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Framework for handling routes and requests.
- **bcrypt**: Password hashing for secure authentication.
- **MongoDB**: Database for storing user and task data.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Local or Cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-management-api.git
   cd task-management-api
Install dependencies:

bash

npm install
Set up environment variables. Create a .env file in the root directory and add the following:

env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the server:

bash

npm start
The API will be available at http://localhost:5000.

API Endpoints
Authentication
Register User
Endpoint: /api/auth/register
Method: POST
Body:
json

{
  "username": "string",
  "password": "string"
}
Description: Registers a new user with a hashed password.
Login User
Endpoint: /api/auth/login
Method: POST
Body:
json

{
  "username": "string",
  "password": "string"
}
Description: Authenticates a user and returns a JWT token.
Task Management
Add Task
Endpoint: /api/tasks
Method: POST
Headers:
Authorization: Bearer <JWT Token>
Body:
json

{
  "title": "string",
  "description": "string"
}
Description: Adds a new task for the authenticated user.
Get Task by ID
Endpoint: /api/tasks/:id
Method: GET
Headers:
Authorization: Bearer <JWT Token>
Description: Retrieves a task by its ID.
Get All Tasks
Endpoint: /api/tasks
Method: GET
Headers:
Authorization: Bearer <JWT Token>
Description: Retrieves all tasks for the authenticated user.
Update Task by ID
Endpoint: /api/tasks/:id
Method: PUT
Headers:
Authorization: Bearer <JWT Token>
Body:
json

{
  "title": "string",
  "description": "string"
}
Description: Updates a task by its ID.
Delete Task by ID
Endpoint: /api/tasks/:id
Method: DELETE
Headers:
Authorization: Bearer <JWT Token>
Description: Deletes a task by its ID.
Error Handling
Each endpoint returns an error message and status code if something goes wrong. Ensure the JWT token is valid for task-related endpoints, as they require user authentication.

