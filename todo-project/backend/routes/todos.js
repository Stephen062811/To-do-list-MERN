const express = require("express");
const mongoose = require("mongoose");
const Todo = require("../models/Todo");

const router = express.Router();

// GET /api/todos — return newest tasks first
router.get("/", async (_req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch tasks." });
  }
});

// POST /api/todos — create a task
router.post("/", async (req, res) => {
  try {
    const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
    if (!text) return res.status(400).json({ message: "Enter a task first." });
    if (text.length > 200) {
      return res.status(400).json({ message: "Task must be 200 characters or fewer." });
    }

    const todo = await Todo.create({ text });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Could not create the task." });
  }
});

// PATCH /api/todos/:id — edit task text and/or completion status
router.patch("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const updates = {};
    if (Object.prototype.hasOwnProperty.call(req.body, "text")) {
      const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
      if (!text) return res.status(400).json({ message: "Task text cannot be empty." });
      if (text.length > 200) {
        return res.status(400).json({ message: "Task must be 200 characters or fewer." });
      }
      updates.text = text;
    }
    if (Object.prototype.hasOwnProperty.call(req.body, "completed")) {
      if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({ message: "Completed must be true or false." });
      }
      updates.completed = req.body.completed;
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid updates supplied." });
    }

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!todo) return res.status(404).json({ message: "Task not found." });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Could not update the task." });
  }
});

// DELETE /api/todos/:id — delete a task
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: "Task not found." });
    res.json({ message: "Task deleted.", id: todo._id });
  } catch (error) {
    res.status(500).json({ message: "Could not delete the task." });
  }
});

module.exports = router;
