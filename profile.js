const baseURL = 'http://localhost:3000'
const entriesURL = `${baseURL}/entries`
const profileURL = `${baseURL}/profile`

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.token}`
}

const logoutButton = document.querySelector('#logout')
const addEntryButton = document.querySelector('#addEntry')
const addSessionButton = document.querySelector('#addSession')
const journalEntries = document.querySelector('#journalEntries')
const welcomeMessage = document.querySelector('#welcome-message')
const meditationSection = document.querySelector('#meditation-count')

addEntryButton.addEventListener('click', goToEntryPage)
addSessionButton.addEventListener('click', goToSessionPage)
logoutButton.addEventListener('click', logOut)

fetch(profileURL, { headers })
  .then(response => response.json())
  .then(user => {
    welcomeMessage.textContent = `Good morning, ${user.firstname}! Let's get the day started.`
    const sessions = user.sessions
    countSessions(sessions)
    user.entries.forEach(entry => renderEntries(entry))
  })

function renderEntries(entry) {
  const entryCard = document.createElement('div')
  const item1 = document.createElement('li')
  const item2 = document.createElement('li')
  const item3 = document.createElement('li')
  const date = document.createElement('h5')
  date.id = 'date'
  const logDate = entry.created_at
  const convertedlogDate = new Date(logDate)
  const shortenedLogDate = convertedlogDate.toDateString()
  entryCard.classList.add('entry-card')
  date.textContent = shortenedLogDate
  item1.textContent = entry.item1
  item2.textContent = entry.item2
  item3.textContent = entry.item3
  journalEntries.appendChild(entryCard)
  entryCard.append(date, item1, item2, item3)
  }


function countSessions(sessions) {
  const sessionCount = sessions.length
  const sessionCountDisplay = document.createElement('p')
  if (sessionCount > 1 || sessionCount == 0) {
    sessionCountDisplay.innerText = `You've logged ${sessionCount} meditation sessions! Keep up the good work.`
  } else {
    sessionCountDisplay.innerText = `You've logged ${sessionCount} meditation session! Keep up the good work.`
  }
  meditationSection.append(sessionCountDisplay)
}

  function logOut() {
    localStorage.clear()
    window.location.href = '/index.html'
  }

  function goToEntryPage() {
      fetch(entriesURL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
        .then(response => {
          if (response.ok) {
            window.location.href = '/entries.html'
          } else {
              const errorMessage = document.createElement('p')
              errorMessage.textContent = "You can't access this resource. Try again."
              document.body.append(errorMessage)
            }
        })
      }

  function goToSessionPage() {
    window.location.href = '/sessions.html'
  }