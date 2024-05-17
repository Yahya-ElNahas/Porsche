const email = document.getElementById('email')
const username = document.getElementById('username')
const password = document.getElementById('password')
const first_name = document.getElementById('first-name')
const last_name = document.getElementById('last-name')
const mobile_number = document.getElementById('mobile-number')
const dob = document.getElementById('dob')

function register() {
    fetch('http://localhost:3001/v1/api/Customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'email': email.value,
            'username': username.value,
            'password': password.value,
            'first_name': first_name.value,
            'last_name': last_name,
            'mobile_numbers': [mobile_number],
            'addresses': [],
            'age': (new Date().getFullYear()) - (new Date(dob.value).getFullYear())
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