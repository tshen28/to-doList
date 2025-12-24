//update greeting based on time of day
function updateGreeting() {
    const hours = new Date().getHours();
    let greetingText = "Good Morning";

    if (hours >= 12 && hours < 18) greetingText = "Good Afternoon";
    else if (hours >= 18) greetingText = "Good Evening";

    document.getElementById('greeting').textContent = `${greetingText}, $User!`;
    //change $User to actual username when user authentication is implemented
}

//user modal functions
function openUserModal() {
    document.getElementById('userModal').classList.add('active');
}

function closeUserModal() {
    document.getElementById('userModal').classList.remove('active');
}

//user modal button paths:
//login and sign up buttons available when user is logged out
//only logout button available when user is logged in
//close button always available



updateGreeting();