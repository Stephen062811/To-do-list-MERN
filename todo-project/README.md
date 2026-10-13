# Todo List — React + Express + MongoDB

A full-stack Todo List matching the reference screenshots. It supports creating, viewing, completing, editing, and deleting tasks.

## Requirements
- Node.js LTS and npm
- MongoDB Community Server running locally, **or** a MongoDB Atlas connection string
- VS Code (recommended)

## Project structure
```text
todo-project/
├── backend/
│   ├── models/Todo.js
│   ├── routes/todos.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── App.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 1. Open the project
Extract the ZIP. In VS Code, choose **File → Open Folder** and open the `todo-project` folder.

## 2. Configure MongoDB
### Option A — MongoDB installed locally
Start your MongoDB service, then use this connection string in `backend/.env`:
```env
MONGO_URI=mongodb://127.0.0.1:27017/todo_app
PORT=5000
```

### Option B — MongoDB Atlas
Create a database and database user in MongoDB Atlas. Copy the connection string and put it in `MONGO_URI` in `backend/.env`. Replace the username, password, and database name. In Atlas Network Access, allow your current IP address.

Make a copy of `backend/.env.example` named `.env` (the `.env` file must be inside `backend/`). Put your real MongoDB connection string there. Do not share or commit your database password.

## 3. Install and run the backend
Open **Terminal → New Terminal** in VS Code and run:
```powershell
cd backend
npm install
```
Create `backend/.env`, then start the API:
```powershell
npm run dev
```
Expected output includes `MongoDB connected` and `API server running on http://localhost:5000`.

Keep this terminal open. If MongoDB is not running or the URI is wrong, the server prints a connection error.

## 4. Install and run the frontend
Open a **second terminal** in VS Code. From the project root:
```powershell
cd frontend
npm install
npm run dev
```
Open the local URL Vite prints, usually `http://localhost:5173`.

Keep both terminals open while using the app.

## 5. Try the app
- Type a task and press **Add** or Enter.
- Tick the checkbox to mark it completed.
- Click **Edit** to change a task.
- Click **Delete** to remove it.

Tasks are stored in MongoDB, so they remain after a browser refresh.

## API endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/todos` | Get all tasks |
| POST | `/api/todos` | Create a task |
| PATCH | `/api/todos/:id` | Update task text or completion |
| DELETE | `/api/todos/:id` | Delete a task |
| GET | `/api/health` | Check server status |

## Troubleshooting
- **`npm` is not recognized:** install Node.js LTS from https://nodejs.org, close and reopen VS Code, then run `node -v` and `npm -v`.
- **MongoDB connection error:** confirm MongoDB is running, or re-check the Atlas URI, password encoding, and IP allow-list.
- **Port 5000 is in use:** change `PORT` in `backend/.env` and update `API_BASE` in `frontend/src/App.jsx` to match.
- **Port 5173 is in use:** Vite will offer another local port; open the URL it prints.
- **CORS/network error:** ensure the backend terminal is running and `http://localhost:5000/api/health` opens in your browser.
- **Old Mongoose `new` option warnings:** this project does not use the obsolete `new` option in update calls.

## Important
This is a learning project, not a production deployment. Before deploying publicly, add authentication, rate limiting, stricter validation, logging, and secure deployment configuration.
