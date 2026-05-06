const msg = document.getElementById('loginMsg');

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const users = {
        admin: '1234',
        emilka: '1234',
    };

    if (Object.prototype.hasOwnProperty.call(users, username) && password === users[username]) {
       msg.textContent = '';
       window.location.href = '../index.html';
    } else {
        msg.textContent = 'Bledny login lub haslo.';
        msg.style.color = 'red';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) {
        return;
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        login();
    });
});

function logout() {
    window.location.href = 'login/login.html';
}

