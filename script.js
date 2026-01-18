let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showAlert(message, type = "success") {
  const emoji = type === "success" ? "✅" : "⚠️";
  alert(`${emoji} ${message}`);
}

function addTask() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("dueDate").value;
  const desc = document.getElementById("description").value;

  if (!title || !desc || !date) {
    showAlert("error","Please fill all fields!");
    return;
  }

  tasks.push({
    id: Date.now(),
    title,
    date,
    desc,
    completed: false
  });

  saveTasks();
  showAlert("Task added successfully 🚀");
  renderTasks();
  clearForm();
}

function clearForm() {
  title.value = "";
  dueDate.value = "";
  description.value = "";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  let filteredTasks = tasks.filter(task => {
    if (currentFilter === "pending") return !task.completed;
    if (currentFilter === "completed") return task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const div = document.createElement("div");
    div.className = `task ${task.completed ? "completed" : ""}`;

    div.innerHTML = `
      <strong>${task.title}</strong>
      <p>${task.desc}</p>
      <small>📅 Due: ${task.date}</small>
      <div class="task-actions">
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;

    list.appendChild(div);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  showAlert("Task status updated ✨");
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  showAlert("Task deleted 🗑");
  renderTasks();
}

function filterTasks(type) {
  currentFilter = type;
  renderTasks();
}

renderTasks();