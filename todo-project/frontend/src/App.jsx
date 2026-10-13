import { useCallback, useEffect, useState } from "react";
import "./App.css";

const API_BASE = "http://localhost:5000/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const request = useCallback(async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.message || "Something went wrong.");
    return data;
  }, []);

  const loadTodos = useCallback(async () => {
    try {
      setError("");
      const data = await request(API_BASE);
      setTodos(data);
    } catch (err) {
      setError(`${err.message} Check that the backend and MongoDB are running.`);
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  async function addTodo(event) {
    event.preventDefault();
    const text = taskText.trim();
    if (!text || busy) return;
    try {
      setBusy(true);
      setError("");
      const created = await request(API_BASE, {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      setTodos((current) => [created, ...current]);
      setTaskText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function toggleTodo(todo) {
    try {
      setError("");
      const updated = await request(`${API_BASE}/${todo._id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !todo.completed }),
      });
      setTodos((current) => current.map((item) => item._id === updated._id ? updated : item));
    } catch (err) {
      setError(err.message);
    }
  }

  function beginEdit(todo) {
    setEditingId(todo._id);
    setEditingText(todo.text);
  }

  async function saveEdit(id) {
    const text = editingText.trim();
    if (!text) {
      setError("Task text cannot be empty.");
      return;
    }
    try {
      setError("");
      const updated = await request(`${API_BASE}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ text }),
      });
      setTodos((current) => current.map((item) => item._id === updated._id ? updated : item));
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteTodo(id) {
    try {
      setError("");
      await request(`${API_BASE}/${id}`, { method: "DELETE" });
      setTodos((current) => current.filter((todo) => todo._id !== id));
      if (editingId === id) setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="page">
      <section className="todo-card" aria-labelledby="page-title">
        <h1 id="page-title">My Todo List</h1>

        <form className="add-form" onSubmit={addTodo}>
          <input
            type="text"
            value={taskText}
            onChange={(event) => setTaskText(event.target.value)}
            placeholder="Enter a task..."
            aria-label="Enter a task"
            maxLength={200}
          />
          <button className="button button-primary add-button" type="submit" disabled={busy || !taskText.trim()}>
            Add
          </button>
        </form>

        {error && <p className="error-message" role="alert">{error}</p>}

        {loading ? (
          <p className="status-message">Loading tasks...</p>
        ) : todos.length === 0 ? (
          <p className="empty-message">No tasks yet. Add your first task above.</p>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <li className={`todo-row ${todo.completed ? "is-completed" : ""}`} key={todo._id}>
                <div className="todo-content">
                  <input
                    className="todo-checkbox"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo)}
                    aria-label={`Mark ${todo.text} ${todo.completed ? "incomplete" : "complete"}`}
                  />
                  {editingId === todo._id ? (
                    <input
                      className="edit-input"
                      value={editingText}
                      onChange={(event) => setEditingText(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") saveEdit(todo._id);
                        if (event.key === "Escape") setEditingId(null);
                      }}
                      aria-label="Edit task"
                      autoFocus
                      maxLength={200}
                    />
                  ) : (
                    <span className="todo-text">{todo.text}</span>
                  )}
                </div>

                <div className="todo-actions">
                  {editingId === todo._id ? (
                    <>
                      <button className="button button-primary" onClick={() => saveEdit(todo._id)} type="button">Save</button>
                      <button className="button button-neutral" onClick={() => setEditingId(null)} type="button">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="button button-primary" onClick={() => beginEdit(todo)} type="button">Edit</button>
                      <button className="button button-danger" onClick={() => deleteTodo(todo._id)} type="button">Delete</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="task-count">
          {todos.filter((todo) => todo.completed).length} of {todos.length} completed
        </p>
      </section>
    </main>
  );
}
