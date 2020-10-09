const baseURL = 'https://right-foot.herokuapp.com'
const sessionsURL = `${baseURL}/sessions`
const profileURL = `${baseURL}/profile`
const newMeditationButton = document.querySelector('#log-meditation')
const thankYouContainer = document.querySelector('#thank-you-text')
const timerButton = document.querySelector('#timer-button')
const spotifyButton = document.querySelector('#spotify-button')
const spotifyOption = document.querySelector('#spotify')
const timerOption = document.querySelector('#timer')

timerButton.addEventListener('click', showTimer)
spotifyButton.addEventListener('click', showSpotify)

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
  const thankYouText = document.createElement('p')
  const goBackHomeButton = document.createElement('a')
  thankYouText.id = 'thank-you'
  goBackHomeButton.id = 'home-button'
  thankYouText.innerText = `Congatulations! You're now one step closer to enlightenment.`
  goBackHomeButton.innerText = 'Go Back Home'
  goBackHomeButton.href = '/profile.html'
  thankYouContainer.append(thankYouText, goBackHomeButton)
}

function showTimer() {
timerOption.classList.toggle('hidden')
}

function showSpotify() {
  spotifyOption.classList.toggle('hidden')
}
