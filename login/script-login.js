const form = document.getElementById('loginForm');
const msg = document.getElementById('loginMsg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const users = {
        admin: '1234',
        emilka: '1234',
    };

    if (Object.prototype.hasOwnProperty.call(users, username) && password === users[username]) {
        msg.textContent = `Zalogowano pomyslnie (${username}).`;
        msg.style.color = 'green';
        window.location.href = '../index.html';
    } else {
        msg.textContent = 'Bledny login lub haslo.';
        msg.style.color = 'red';
    }
});
