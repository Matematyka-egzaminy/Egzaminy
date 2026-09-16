const msg = document.getElementById('loginMsg');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const submitButton = document.querySelector('#loginForm button[type="submit"]');
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

function setFieldError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.toggle('invalid', Boolean(message));
}

function clearErrors() {
    setFieldError(usernameInput, usernameError, '');
    setFieldError(passwordInput, passwordError, '');
    msg.textContent = '';
}

function validateForm(username, password) {
    let isValid = true;

    if (!username) {
        setFieldError(usernameInput, usernameError, 'Podaj login.');
        isValid = false;
    } else if (username.length < 3) {
        setFieldError(usernameInput, usernameError, 'Login musi miec co najmniej 3 znaki.');
        isValid = false;
    }

    if (!password) {
        setFieldError(passwordInput, passwordError, 'Podaj haslo.');
        isValid = false;
    } else if (password.length < 4) {
        setFieldError(passwordInput, passwordError, 'Haslo musi miec co najmniej 4 znaki.');
        isValid = false;
    }

    return isValid;
}

async function login() {
    clearErrors();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (!validateForm(username, password)) {
        return;
    }

    submitButton.disabled = true;

    try {
        const loadedUsers = await loadUsers();

        if (Object.prototype.hasOwnProperty.call(loadedUsers, username) && password === loadedUsers[username]) {
            window.Auth.setUser(username);
            window.location.href = window.Auth.homeUrl();
            return;
        }

        msg.textContent = 'Bledny login lub haslo.';
        msg.style.color = 'red';
    } finally {
        submitButton.disabled = false;
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
