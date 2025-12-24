//task functions
const taskCard = `
            <div class="task-item">
              <div class="task-checkbox" onclick="toggleTask()"></div>
                <div class="task-content">
                    <div class="task-title">Example Task</div>
                </div>
                <span class="status-badge status-cancelled"></span>
                <div class="priority-badge priority-x">
                    <i class="fa-solid fa-flag"></i>
                </div>
                <button
                    class="edit-icon"
                    style="width: 30px; height: 30px"
                    onclick="editTask()"
                >
                    <i
                    class="fa-solid fa-pen-to-square"
                    style="font-size: 14px"
                    ></i>
                </button>
                <button
                    class="delete-icon"
                    style="width: 30px; height: 30px"
                    onclick="deleteTask()"
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

//user modal functions
function openUserModal() {
  document.getElementById("userModal").classList.add("active");
}

function closeUserModal() {
  document.getElementById("userModal").classList.remove("active");
}

//user modal button paths:
//login and sign up buttons available when user is logged out
//only logout button available when user is logged in
//close button always available

updateGreeting();
