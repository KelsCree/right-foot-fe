const baseURL = 'http://localhost:3000'
const sessionsURL = `${baseURL}/sessions`
const profileURL = `${baseURL}/profile`
const newMeditationButton = document.querySelector('#log-meditation')
const thankYouContainer = document.querySelector('#thank-you-text')

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.token}`
}

fetch(profileURL, { headers })
  .then(response => response.json())
  .then(user => {
    newMeditationButton.addEventListener('click', addNewMeditation)
  })

function addNewMeditation(user) {
  const userID = user.id
  fetch(sessionsURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ userID })
  }).then(response => response.json())
    .then(removeButton)
    .then(appendText)
}

function removeButton() {
  newMeditationButton.remove()
}

function appendText(user) {
  console.log(user)
  const thankYouText = document.createElement('p')
  const goBackHomeButton = document.createElement('a')
  thankYouText.innerText = `Congatulations! You're now one step closer to enlightenment.`
  goBackHomeButton.innerText = 'Go Back Home'
  goBackHomeButton.href = '/profile.html'
  thankYouContainer.append(thankYouText, goBackHomeButton)
}

