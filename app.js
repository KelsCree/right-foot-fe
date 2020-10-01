const baseURL = 'http://localhost:3000'
const loginURL = `${baseURL}/login`
const usersURL = `${baseURL}/users`
const loginForm = document.querySelector('.login-form')
const createAccountButton = document.querySelector("#create-account")
const newUserForm = document.querySelector('#create-new-user')

newUserForm.addEventListener('submit', createNewUser)
createAccountButton.addEventListener('click', renderNewUserForm)
loginForm.addEventListener('submit', loginUser)

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

  function renderNewUserForm() {
    newUserForm.classList.toggle("hidden")
  }

function createNewUser(event) {
  event.preventDefault()
  const newUserFormData = new FormData(event.target)
  const username = newUserFormData.get('username')
  const firstname = newUserFormData.get('firstname')
  const password = newUserFormData.get('password')
  const user = { username, firstname, password }
  fetch(usersURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
    }).then(response => response.json())
      .then(result => validateUser(result))
}

function validateUser(result) {
  const previousErrorMessage = document.querySelector('#existing-error')
  console.log(result)
  if (result.errors) {
    if (previousErrorMessage) {
      previousErrorMessage.remove()
    }
    const error = document.createElement('p')
    error.id = 'existing-error'
    error.innerText = result.errors[0]
    newUserForm.append(error)
  } else {
      localStorage.setItem('token', result.token)
      goToProfile(result)
  }
}

function parseJSON(response) {
  return response.json()
}