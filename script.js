//update greeting based on time of day
function updateGreeting() {
    const hours = new Date().getHours();
    let greetingText = "Good Morning";

    if (hours >= 12 && hours < 18) greetingText = "Good Afternoon";
    else if (hours >= 18) greetingText = "Good Evening";

    document.getElementById('greeting').textContent = `${greetingText}, User!`;
}


//toggle light/dark theme
function applyTheme(theme) {
    const body = document.body;
    const isDark = theme === 'dark';
    body.classList.toggle('dark-theme', isDark);

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) toggleBtn.setAttribute('aria-pressed', isDark);
}

function toggleTheme() {
    const body = document.body;
    const willBeDark = !body.classList.contains('dark-theme');
    const theme = willBeDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    applyTheme(theme);
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) applyTheme(saved);
    else applyTheme('light');

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
}

//user modal functions
function openUserModal() {
    const modal = document.getElementById('userModal');
    if (!modal) return console.error('User modal not found');
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

//close modal when clicking outside of it
window.addEventListener('click', (e) => { 
    const modal = document.getElementById('userModal');
    if (modal && e.target === modal) closeUserModal();
});

updateGreeting();
initTheme();
