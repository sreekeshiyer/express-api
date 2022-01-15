const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const todos = require("../../todos");

const idFilter = (req) => (todo) => todo.id === req.params.id;

// Gets All Todos
router.get("/", (req, res) => res.json(todos));

// Get Single Todo
router.get("/:id", (req, res) => {
    const found = todos.some(idFilter(req));

    if (found) {
        res.json(todos.filter(idFilter(req)));
    } else {
        res.status(400).json({
            msg: `No todo with the id of ${req.params.id}`,
        });
    }
});

// Create task
router.post("/", (req, res) => {
    const newTask = {
        ...req.body,
        id: uuid.v4(),
        status: "active",
    };

    if (!newTask.task) {
        return res.status(400).json({ msg: "Please include a task title" });
    }

    todos.push(newTask);
    res.redirect("/");
});

// Update Task
router.put("/:id", (req, res) => {
    const found = todos.some(idFilter(req));

    if (found) {
        todos.forEach((task, i) => {
            if (idFilter(req)(task)) {
                const updTask = { ...task, ...req.body };
                todos[i] = updTask;
                res.json({ msg: "Task updated", updTask });
            }
        });
    } else {
        res.status(400).json({
            msg: `No task with the id of ${req.params.id}`,
        });
    }
});

// Delete Task
router.delete("/:id", (req, res) => {
    const found = todos.some(idFilter(req));

    if (found) {
        res.json({
            msg: "Task deleted",
            todos: todos.filter((task) => !idFilter(req)(task)),
        });
    } else {
        res.status(400).json({
            msg: `No item with the id of ${req.params.id}`,
        });
    }
});

module.exports = router;
