# Todo List Application

A full-stack Todo List application built with React, Node.js, Express.js, and MongoDB. Create, view, update, and delete tasks through a simple user interface.

## Features

- Create new tasks
- View all saved tasks
- Update existing tasks
- Delete tasks
- Store tasks in MongoDB
- React-based responsive frontend
- REST API for frontend-backend communication

## Tech Stack

**Frontend**
- React
- Vite
- CSS

**Backend**
- Node.js
- Express.js
- Mongoose

**Database**
- MongoDB

## Project Structure

```text
todo-project/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB installed and running, or a MongoDB Atlas database

### 1. Clone the repository

```bash
git clone https://github.com/Stephen062811/todo-list-mern.git
cd todo-list-mern/todo-project
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/todo_app
PORT=5000
```

Start the backend:

```bash
npm run dev
```

If no `dev` script exists in `backend/package.json`, use:

```bash
node server.js
```

### 3. Set up the frontend

Open a second terminal:

```bash
cd todo-project/frontend
npm install
npm run dev
```

Open the local URL shown by Vite in your terminal, usually `http://localhost:5173`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/todos` | Retrieve all tasks |
| POST | `/api/todos` | Create a task |
| PUT | `/api/todos/:id` | Update a task |
| DELETE | `/api/todos/:id` | Delete a task |

## What I Learned

- Building reusable React components
- Creating REST APIs with Express.js
- Connecting a Node.js backend to MongoDB using Mongoose
- Performing CRUD operations
- Connecting a frontend to a backend API
- Using Git and GitHub for version control

## Author

Stephen

GitHub: [@Stephen062811](https://github.com/Stephen062811)
