const username = document.getElementById('email')
const password = document.getElementById('password')

function login() {
    fetch('http://localhost:3001/v1/api/Customers/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'username': username.value,
            'password': password.value
        })
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = 'home.html'
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}