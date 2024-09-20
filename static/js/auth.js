// Auth-related functions

function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            window.location.href = '/login';
        }
    })
    .catch(error => console.error('Error:', error));
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            alert(data.message);
            window.location.href = '/dashboard';
        }
    })
    .catch(error => console.error('Error:', error));
}

function logout() {
    fetch('/api/logout', {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        window.location.href = '/';
    })
    .catch(error => console.error('Error:', error));
}
