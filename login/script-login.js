const msg = document.getElementById('loginMsg');

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const users = {
        admin: '1234',
        emilka: '1234',
    };

    if (Object.prototype.hasOwnProperty.call(users, username) && password === users[username]) {
       window.location.href = '../index.html';
    } else {
        msg.textContent = 'Bledny login lub haslo.';
        msg.style.color = 'red';
    }
}

function logout() {
    window.location.href = 'login/login.html';
}

