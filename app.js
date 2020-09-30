const baseURL = 'http://localhost:3000'
const loginURL = `${baseURL}/login`
const usersURL = `${baseURL}/users`

const loginForm = document.querySelector('.login-form')
const getUsers = document.querySelector('.get-users') //sample Ahmed

loginForm.addEventListener('submit', loginUser)
// getUsers.addEventListener('click', retrieveUsers) //sample from Ahmed

function loginUser(event){
  event.preventDefault()
  const loginFormData = new FormData(event.target)
  const username = loginFormData.get('username')
  const password = loginFormData.get('password')
  const user = { username, password }

  fetch(loginURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(parseJSON)
    .then(result => {
      if (result.token) {
        localStorage.setItem('token', result.token)
        console.log(result.token)
        goToProfile()
      } else {
        const errorMessage = document.createElement('p')
        errorMessage.textContent = 'Invalid credentials. Please try again!'
        document.body.append(errorMessage)
      }
  })
}

function goToProfile(_) {
  fetch(usersURL, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    }
  })
    .then(response => {
      if (response.ok) {
        window.location.href = '/profile.html'
      } else {
        const errorMessage = document.createElement('p')
        errorMessage.textContent = 'Login unsuccessful. Try again.'
        document.body.append(errorMessage)
      }
    })
  }

function parseJSON(response) {
  return response.json()
}