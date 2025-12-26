//task functions
let tasks = [];
let editingId = null;

function loadData() {
  const saved = localStorage.getItem("tasks");
  if (saved) tasks = JSON.parse(saved);
  else
    tasks = [
      {
        id: 1,
        title: "User authentication",
        status: "completed",
        priority: "critical",
        completed: false,
      },
      {
        id: 2,
        title: "Toggle theme function",
        status: "pending",
        priority: "critical",
        completed: false,
      },
      {
        id: 3,
        title: "Mobile responsiveness",
        status: "in-progress",
        priority: "normal",
        completed: false,
      },
    ];
  updateGreeting();
  renderTasks();
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const inProgress = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  document.getElementById("inProgressTasks").innerHTML = inProgress.length
    ? inProgress.map((t) => taskCard(t)).join("")
    : "<p style='margin-top: 15px;'>No tasks in progress.</p>";

  document.getElementById("completedTasks").innerHTML = completed.length
    ? completed.map((t) => completedTaskCard(t)).join("")
    : "<p style='margin-top: 15px;'>No completed tasks.</p>";

  const taskCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = taskCount - completedCount;
  const rate = taskCount ? Math.round((completedCount / taskCount) * 100) : 0;

  document.getElementById("totalTasks").textContent = pendingCount;
  document.getElementById("task-count").textContent = pendingCount;
  document.getElementById("task-word").textContent =
    pendingCount === 1 ? "task" : "tasks";
  document.getElementById("totalTasks").textContent = pendingCount;
  document.getElementById("pendingCount").textContent = pendingCount;
  document.getElementById("completedCount").textContent = completedCount;
  document.getElementById("completionRateValue").textContent = `${rate}%`;
  document.getElementById("completionProgress").style.width = `${rate}%`;

  saveData();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    task.status = task.completed ? "completed" : "in-progress";
    renderTasks();
  }
}

function deleteTask(id) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks = tasks.filter((t) => t.id !== id);
    renderTasks();
  }
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    editingId = id;
    editTaskModal(id);
  }
}

//example task card template
const taskCard = (t) => `
            <div class="task-item">
              <div class="task-checkbox ${
                t.completed ? "completed" : ""
              }" onclick="toggleTask(${t.id})"></div>
                <div class="task-content">
                    <div class="task-title ${t.completed ? "completed" : ""}">${
  t.title
}</div>
                </div>
                <span class="status-badge status-${t.status}">
                    ${
                      t.status === "in-progress"
                        ? "In Progress"
                        : t.status.charAt(0).toUpperCase() + t.status.slice(1)
                    }
                </span>
                <div class="priority-badge priority-${t.priority}">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    ${t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
                </div>
                <button
                    class="edit-icon"
                    style="width: 30px; height: 30px"
                    onclick="editTask(${t.id})"
                >
                    <i
                    class="fa-solid fa-pen-to-square"
                    style="font-size: 14px"
                    ></i>
                </button>
                <button
                    class="delete-icon"
                    style="width: 30px; height: 30px"
                    onclick="deleteTask(${t.id})"
                >
                    <i class="fa-solid fa-trash" style="font-size: 14px"></i>
                </button>
            </div>
`;

const completedTaskCard = (t) => `
            <div class="task-item">
              <div class="task-checkbox completed" onclick="toggleTask(${
                t.id
              })"></div>
                <div class="task-content">
                    <div class="task-title completed">${t.title}</div>
                </div>
                <span class="status-badge status-${t.status}">Completed</span>
                <div class="priority-badge priority-${t.priority}">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    ${t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
                </div>
                <button
                    class="edit-icon"
                    style="width: 30px; height: 30px"
                    onclick="editTask(${t.id})"
                >
                    <i
                    class="fa-solid fa-pen-to-square"
                    style="font-size: 14px"
                    ></i>
                </button>
                <button
                    class="delete-icon"
                    style="width: 30px; height: 30px"
                    onclick="deleteTask(${t.id})"
                >
                    <i class="fa-solid fa-trash" style="font-size: 14px"></i>
                </button>
            </div>
`;

//update greeting based on time of day
function updateGreeting() {
  const hours = new Date().getHours();
  let greetingText = "Good Morning";

  if (hours >= 12 && hours < 18) greetingText = "Good Afternoon";
  else if (hours >= 18) greetingText = "Good Evening";

  document.getElementById("greeting").textContent = `${greetingText}, $User!`;
  //change $User to actual username when user authentication is implemented
}

//task modal functions
function openTaskModal() {
  const taskInput = document.getElementById("task-input");
  const taskValue = taskInput.value.trim();
  if (taskValue === "") {
    alert("Please enter a task before adding.");
    return;
  }
  const header = document.querySelector(".taskModal-header");
  header.innerHTML = taskValue;
  document.getElementById("taskModal").classList.add("active");
  taskInput.value = "";
}

function closeTaskModal() {
  document.getElementById("taskModal").classList.remove("active");
  document.getElementById("taskForm").reset();
  editingId = null;
}

function editTaskModal(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  const header = document.querySelector(".taskModal-header");
  header.innerHTML = `<input type="text" id="edit-task-title" value="${task.title}" required />`;

  document.getElementById("taskStatus").value = task.status;
  document.getElementById("taskPriority").value = task.priority;
  document.getElementById("add-btn").textContent = "Update Task";

  editingId = id;
  document.getElementById("taskModal").classList.add("active");
}

//form edit and submit
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = editingId ? document.getElementById("edit-task-title").value.trim() : document.getElementById("task-input").value.trim();
  const status = document.getElementById("taskStatus").value;
  const priority = document.getElementById("taskPriority").value;

  if (editingId) {
    const task = tasks.find((t) => t.id === editingId);
    task.title = title;
    console.log(task.title)
    task.status = status;
    task.priority = priority;
    task.completed = status === "completed";
  } else {
    tasks.push({
      id: Date.now(),
      title,
      status,
      priority,
      completed: status === "completed",
    });
  }

  renderTasks();
  closeTaskModal();
  document.getElementById("task-input").value = "";
});

//user modal functions
function openUserModal() {
  document.getElementById("userModal").classList.add("active");
}

function closeUserModal() {
  document.getElementById("userModal").classList.remove("active");
}

//toggle theme function:
//toggle between light and dark themes
//save preference in local storage
//apply saved theme on page load

//user modal button paths:
//login and sign up buttons available when user is logged out
//only logout button available when user is logged in
//close button always available

//notification dots:
//notification dots on bell and history icons when there are new notifications or updates
//when clicked, dots disappear and the user can view notifications
//only show dots for notifications that are new or unread

//call functions
updateGreeting();
loadData();