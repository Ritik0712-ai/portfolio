const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const li = document.createElement("li");
    li.innerHTML = `${taskText} <button onclick="deleteTask(this)">Delete</button>`;
    taskList.appendChild(li);
    taskInput.value = "";
  }
}

function deleteTask(button) {
  const task = button.parentNode;
  taskList.removeChild(task);
}
