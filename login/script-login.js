const msg = document.getElementById('loginMsg');
let users = null;

async function loadUsers() {
    if (users) {
        return users;
    }

    const response = await fetch('users.json', { cache: 'no-store' });
    if (!response.ok) {
        throw new Error('Nie udalo sie wczytac danych logowania.');
    }

    users = await response.json();
    return users;
}

async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const loadedUsers = await loadUsers();

    if (Object.prototype.hasOwnProperty.call(loadedUsers, username) && password === loadedUsers[username]) {
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

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        try {
            await login();
        } catch (_error) {
            msg.textContent = 'Blad podczas logowania. Sprobuj ponownie.';
            msg.style.color = 'red';
        }
    });
});

function logout() {
    window.location.href = 'login/login.html';
}

