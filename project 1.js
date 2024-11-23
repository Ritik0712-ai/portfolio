document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const dueDateInput = document.getElementById("due-date");
  const dueTimeInput = document.getElementById("due-time");
  const addTaskButton = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  // Load tasks from local storage
  loadTasks();

  // Add Task Event
  addTaskButton.addEventListener("click", addTask);

  // Add Task Function
  function addTask() {
      const taskText = taskInput.value.trim();
      const dueDate = dueDateInput.value;
      const dueTime = dueTimeInput.value;

      if (taskText === "" || dueDate === "" || dueTime === "") {
          alert("Please fill in all fields!");
          return;
      }

      const dueDateTime = `${dueDate}T${dueTime}`;
      const taskItem = createTaskElement(taskText, dueDateTime);
      taskList.appendChild(taskItem);
      saveTasks();
      taskInput.value = "";
      dueDateInput.value = "";
      dueTimeInput.value = "";
      sortTasks();
  }

  // Create Task Element
  function createTaskElement(taskText, dueDateTime) {
      const li = document.createElement("li");

      const span = document.createElement("span");
      span.className = "task-text";
      span.textContent = taskText;
      span.addEventListener("click", () => {
          li.classList.toggle("completed");
          saveTasks();
      });

      const dueDateSpan = document.createElement("span");
      dueDateSpan.className = "due-date";
      const formattedDate = new Date(dueDateTime).toLocaleString();
      dueDateSpan.textContent = `Due: ${formattedDate}`;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-btn";
      deleteButton.addEventListener("click", () => {
          taskList.removeChild(li);
          saveTasks();
      });

      li.dataset.dueDateTime = dueDateTime;
      li.appendChild(span);
      li.appendChild(dueDateSpan);
      li.appendChild(deleteButton);

      updateTaskStatus(li);

      return li;
  }

  // Update Task Status (Overdue Check)
  function updateTaskStatus(taskElement) {
      const now = new Date();
      const dueDateTime = new Date(taskElement.dataset.dueDateTime);

      if (dueDateTime < now) {
          taskElement.classList.add("overdue");
      } else {
          taskElement.classList.remove("overdue");
      }
  }

  // Save Tasks to Local Storage
  function saveTasks() {
      const tasks = [];
      taskList.querySelectorAll("li").forEach((task) => {
          tasks.push({
              text: task.querySelector(".task-text").textContent,
              dueDateTime: task.dataset.dueDateTime,
              completed: task.classList.contains("completed"),
          });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Load Tasks from Local Storage
  function loadTasks() {
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      savedTasks.forEach((task) => {
          const taskItem = createTaskElement(task.text, task.dueDateTime);
          if (task.completed) {
              taskItem.classList.add("completed");
          }
          taskList.appendChild(taskItem);
      });
      sortTasks();
  }

  // Sort Tasks by Due Date
  function sortTasks() {
      const tasks = Array.from(taskList.children);
      tasks.sort((a, b) => {
          const dateA = new Date(a.dataset.dueDateTime);
          const dateB = new Date(b.dataset.dueDateTime);
          return dateA - dateB;
      });
      tasks.forEach((task) => taskList.appendChild(task));
  }

  // Periodic Task Status Update
  setInterval(() => {
      taskList.querySelectorAll("li").forEach((task) => updateTaskStatus(task));
  }, 60000); // Update every minute
});
