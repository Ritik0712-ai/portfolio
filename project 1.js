// Select elements
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Add task function
function addTask() {
    const task = taskInput.value.trim();
    const dueDate = dueDateInput.value;

    if (!task || !dueDate) {
        alert("Please enter both a task and a due date!");
        return;
    }

    // Create a new task element
    const li = document.createElement("li");
    li.innerHTML = `
        <span class="task-text">${task}</span>
        <span class="due-date">Due: ${dueDate}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;

    // Append the task to the list
    taskList.appendChild(li);

    // Clear inputs
    taskInput.value = "";
    dueDateInput.value = "";
}

// Delete task function
function deleteTask(button) {
    const li = button.parentElement;
    li.classList.add("remove-animation");
    setTimeout(() => {
        taskList.removeChild(li);
    }, 300); // Sync with CSS animation duration
}

// Toggle Dark Mode
document.addEventListener("keydown", (e) => {
    if (e.key === "d" || e.key === "D") {
        document.body.classList.toggle("dark");
        document.querySelector(".container").classList.toggle("dark");
        document.querySelectorAll("input").forEach((input) => input.classList.toggle("dark"));
        document.querySelectorAll("li").forEach((li) => li.classList.toggle("dark"));
    }
});

// Event listener for the add task button
addTaskBtn.addEventListener("click", addTask);
