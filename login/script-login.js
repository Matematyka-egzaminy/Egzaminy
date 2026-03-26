const form = document.getElementById('loginForm');
const msg = document.getElementById('loginMsg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === '1234') {
        msg.textContent = 'Zalogowano pomyslnie.';
        msg.style.color = 'green';
    } else {
        msg.textContent = 'Bledny login lub haslo.';
        msg.style.color = 'red';
    }
});
