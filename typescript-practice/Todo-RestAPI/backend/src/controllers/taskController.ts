import { Request, Response } from "express";
import { Task } from "../models/task.js";

let tasks: Task[] = [
  {
    id: 1,
    title: "Learn TypeScript",
    completed: false,
  },
];

let nextId = 2;

// GET /api/tasks
export function getTasks(req: Request, res: Response) {
  res.json(tasks);
}

// GET /api/tasks/:id
export function getTask(req: Request, res: Response) {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.json(task);
}

// POST /api/tasks
export function createTask(req: Request, res: Response) {
  const { title } = req.body;

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const newTask: Task = {
    id: nextId++,
    title: title.trim(),
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
}

// PATCH /api/tasks/:id
export function updateTask(req: Request, res: Response) {
  const id = Number(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  if (typeof req.body.title === "string") {
    task.title = req.body.title.trim();
  }

  if (typeof req.body.completed === "boolean") {
    task.completed = req.body.completed;
  }

  res.json(task);
}

// DELETE /api/tasks/:id
export function deleteTask(req: Request, res: Response) {
  const id = Number(req.params.id);

  const taskExists = tasks.some((task) => task.id === id);

  if (!taskExists) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks = tasks.filter((task) => task.id !== id);

  res.status(204).send();
}
