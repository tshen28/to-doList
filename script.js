//update greeting based on time of day
function updateGreeting() {
    const hours = new Date().getHours();
    let greetingText = "Good Morning";

    if (hours >= 12 && hours < 18) greetingText = "Good Afternoon";
    else if (hours >= 18) greetingText = "Good Evening";

    document.getElementById('greeting').textContent = `${greetingText}, User!`;
}

//user modal functions
function openUserModal() {
    document.getElementById('userModal').classList.add('active');
}

function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
}