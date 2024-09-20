// Main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    fetch('/api/user')
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Not logged in');
    })
    .then(user => {
        document.getElementById('user-info').textContent = `Welcome, ${user.username}!`;
        document.getElementById('logout-btn').style.display = 'inline-block';
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('login-register').style.display = 'block';
    });

    // Load data if on dashboard page
    if (window.location.pathname === '/dashboard') {
        getData();
    }
});
