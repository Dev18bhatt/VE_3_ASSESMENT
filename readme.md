# Full Stack Task Management Application

This project is a full-stack Task Management Application with user authentication, task management, and a responsive UI. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React, utilizing hooks such as `useState`, `useEffect`, `useContext`, `useNavigate`, and `useParams` for seamless user experience and state management.

---

## Features

- **User Authentication**: Secure registration and login functionality with password hashing.
- **Task Management**: Add, view, update, and delete tasks.
- **Frontend UI**: Interactive UI built with React and modern hooks for state and navigation management.
- **API Integration**: Smooth communication between frontend and backend using RESTful APIs.

---

## Technologies Used

### Backend

- **Node.js** and **Express**: For RESTful APIs and handling server requests.
- **MongoDB**: Database for user and task data storage.
- **bcrypt**: Password hashing for secure authentication.

### Frontend

- **React**: For building a responsive UI.
- **React Hooks**: `useState`, `useEffect`, `useContext`, `useNavigate`, `useParams` for managing component state, side effects, and navigation.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+)
- [MongoDB](https://www.mongodb.com/) (Local or Cloud instance)

### Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/task-management-api.git
   cd task-management-api
Install backend dependencies:



npm install
Set up environment variables. Create a .env file in the root directory:

env

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the backend server:

bash

npm start
Backend is available at http://localhost:5000.

Frontend Setup
Navigate to frontend folder (assuming the frontend code is in a folder named client):

bash

cd client
Install frontend dependencies:

bash

npm install
Start the frontend server:

bash

npm run dev to start the front-end.
Frontend is available at http://localhost:5173.

API Endpoints
Authentication Endpoints
Register: POST /api/auth/register
Login: POST /api/auth/login
Task Endpoints
Add Task: POST /api/tasks
Get Task by ID: GET /api/tasks/:id
Get All Tasks: GET /api/tasks
Update Task: PUT /api/tasks/:id
Delete Task: DELETE /api/tasks/:id
Frontend Structure
The frontend is built using React functional components and hooks:

Key Hooks
useState: Manages local component state for form inputs, task lists, etc.
useEffect: Handles side effects such as fetching data on component load.
useContext: Manages global state for authentication across the app.
useNavigate: Programmatic navigation for redirecting users after login, registration, or task updates.
useParams: Extracts parameters from the URL for task-specific pages (e.g., viewing a task by ID).
UI Components
Auth Pages: Registration and login forms with validation.
Task Management Pages:
Add Task: Form to add a new task.
Task List: Displays all tasks.
Task Detail: Shows task details by ID.
Edit Task: Form to edit existing tasks.
Navigation: Responsive routing and conditional rendering based on user authentication.