const express = require("express");

const app = express();

app.use(express.json());

const todos = [
  { id: 1, title: "Learn Docker", completed: false },
  { id: 2, title: "Build a Docker project", completed: false },
];

app.get("/", (req, res) => {
  res.json({
    message: "Todo API is running",
  });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false,
  };

  todos.push(todo);

  res.status(201).json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Todo not found",
    });
  }

  todos.splice(index, 1);

  res.json({
    message: "Todo deleted",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Todo API running on port ${PORT}`);
});
