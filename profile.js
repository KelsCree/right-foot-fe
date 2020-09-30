const baseURL = 'http://localhost:3000'
const profileURL = `${baseURL}/profile`

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.token}`
}

fetch(profileURL, { headers })
  .then(response => response.json())
  .then(user => {
    const welcomeMessage = document.createElement('h2')
    welcomeMessage.textContent = `Good morning, ${user.firstname}! Let's get the day started.`
    document.body.append(welcomeMessage)
  })


  function logOut() {
    localStorage.clear()
    window.location.href = '/index.html'
  }