// Load tasks from localStorage on page load
document.addEventListener("DOMContentLoaded", loadTasks);

// Contact Form Validation with Alert
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const error = document.getElementById('formError');

  const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name || !email || !message) {
    error.textContent = "All fields are required!";
    return;
  }

  if (!emailRegex.test(email)) {
    error.textContent = "Invalid email address!";
    return;
  }

  error.textContent = "";
  alert("Thank you for contacting us, " + name + "! We'll get back to you soon.");
  this.reset();
});

// Add Task
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const tasks = getTasks();
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTask(taskText);
  input.value = "";
}

// Remove Task
function removeTask(button) {
  const li = button.parentElement;
  const taskText = li.firstChild.textContent.trim();
  li.remove();

  let tasks = getTasks();
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Task in UI
function renderTask(taskText) {
  const li = document.createElement("li");
  li.innerHTML = `${taskText} <button onclick="removeTask(this)">X</button>`;
  document.getElementById("taskList").appendChild(li);
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => renderTask(task));
}

// Get tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}
