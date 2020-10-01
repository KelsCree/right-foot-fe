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

  }

function createNewUser(event) {
  event.preventDefault()
  const newUserFormData = new FormData(event.target)
  const username = newUserFormData.get('username')
  const firstname = newUserFormData.get('firstname')
  const password = newUserFormData.get('password')
  const newUser = { username, firstname, password }
  fetch(usersURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user: newUser })
    }).then(handleResponseWithErrors)
      .then(console.log)
      .catch(error => {
        console.error(error)
        const previousErrorMessage = newUserForm.querySelector('p')
        if (previousErrorMessage) {
            previousErrorMessage.remove()
        }
        const errorMessage = document.createElement('p')
        errorMessage.textContent = error.message
        newUserForm.appened(errorMessage)})
    }

function handleResponseWithErrors(response) {
  console.log(response)
  if (response.ok) {
    return response.json()
  } else {
    throw new Error('You done goofed.')
  }
}

function parseJSON(response) {
  return response.json()
}