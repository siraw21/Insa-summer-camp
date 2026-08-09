"use strict";
const API_URL = "http://localhost:3000/api/tasks";
const taskList = document.querySelector("#task-list");
const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
async function getTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    renderTasks(tasks);
}
function renderTasks(tasks) {
    if (!taskList)
        return;
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${task.id}</td>

      <td>${task.title}</td>

      <td>
        ${task.completed ? "Yes" : "No"}
      </td>

      <td>
        <button class="delete-button" data-id="${task.id}">
          Delete
        </button>
      </td>
    `;
        taskList.appendChild(row);
    });
}
async function createTask(title) {
    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title,
        }),
    });
    await getTasks();
}
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    await getTasks();
}
taskForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!taskInput)
        return;
    const title = taskInput.value.trim();
    if (!title)
        return;
    await createTask(title);
    taskInput.value = "";
});
taskList?.addEventListener("click", async (event) => {
    const target = event.target;
    if (!target.classList.contains("delete-button")) {
        return;
    }
    const id = Number(target.dataset.id);
    await deleteTask(id);
});
getTasks();
