const baseURL = 'http://localhost:3000'
const entriesURL = `${baseURL}/entries`
const profileURL = `${baseURL}/profile`
const mainPage = document.querySelector('#main-page')
const title = document.querySelector('#title')
const entryForm = document.querySelector('#create-new-entry')

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.token}`
}


fetch(profileURL, { headers })
  .then(response => response.json())
  .then(user => {
    title.innerText = `${user.firstname}'s Gratitude Journal`
    const userID = user.id
    console.log(userID)
    entryForm.addEventListener('submit', createEntry)
  })

function createEntry(event, userID) {
  event.preventDefault()
  const newEntryFormData = new FormData(event.target)
  const item1 = newEntryFormData.get('item1')
  const item2 = newEntryFormData.get('item2')
  const item3 = newEntryFormData.get('item3')
  fetch(entriesURL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ item1, item2, item3, userID })
  }).then(response => response.json())
    .then(removeForm)
    .then(appendText)
    }

  function removeForm() {
    entryForm.remove()
  }

  function appendText() {
    const thankYouText = document.createElement('p')
    const goBackHomeButton = document.createElement('a')
    thankYouText.innerText = 'You have a lot to be grateful for!'
    goBackHomeButton.innerText = 'Go Back Home'
    goBackHomeButton.href = '/profile.html'
    mainPage.append(thankYouText, goBackHomeButton)
  }


function parseJSON(response) {
  return response.json()
}