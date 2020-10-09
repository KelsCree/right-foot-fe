# Right Foot

An app app to help you start your day off on the right foot. 

# Table Of Contents 
- [Description](https://github.com/KelsCree/morning-peace-fe#description)
- [How It Works](https://github.com/KelsCree/morning-peace-fe#how-it-works)
- [Example Code](https://github.com/KelsCree/morning-peace-fe#example-code)
- [Technology Used](https://github.com/KelsCree/morning-peace-fe#technology-used)
- [Setting up for the Application](https://github.com/KelsCree/morning-peace-fe#setting-up-for-the-application)
- [Main Features](https://github.com/KelsCree/morning-peace-fe#main-features)
- [Features in Progress](https://github.com/KelsCree/morning-peace-fe#features-in-progress)
- [Contact Information](https://github.com/KelsCree/morning-peace-fe#contact-information)
- [Link to Backend Repo](https://github.com/KelsCree/morning-peace-fe#link-to-backend-repo)

## Description

Right Foot is an application that allows users to intentially practice and track both gratitude journaling and meditation. The app keeps track of each journal entry and completed meditation logged by the user, displays their progress, and serves as an uplifting reminder for the user to revist as needed. 

## How It Works

[Right Foot](https://youtu.be/nWK9kczYeVc)

## Example Code 
```
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

```
```
    function validateUser(result) {
  const previousErrorMessage = document.querySelector('#existing-error')
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

```
```
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
```

## Technology Used

- Javascript
- HTML
- CSS


## Setting up for the application

To start the server run

``` 
    lite-server 
```

While also running the backend (linked below) to log in as an existing user with pre-populated entries, use:
username: kcree
password: apple

## Main Features

- User can create a new account or sign in as an existing user
- User can submit a gratitude journal entry that includes three things they're grateful for that morning.
- User can indicate that they completed their daily meditation, with options to use a guided spotify meditation or a five minute timer if  desired.
- User can view all of their previous gratitude entries and their total number of meditations completed on their profile page

## Features in Progress

- Plans to add another item to the homepage that automatically increments new meditation 'streak' goals for the user.
- Plans to deploy the app using firebase and heroku

## Contact Information

[Kelsey Creehan](https://www.linkedin.com/in/kelsey-creehan/)

## Link to Backend Repo

https://github.com/KelsCree/right-foot-be