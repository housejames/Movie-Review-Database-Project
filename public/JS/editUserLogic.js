// Adds an event listener to the save new user button
let editUsername = document.querySelector('.newUser')
editUsername.addEventListener('click', async (event) => {
    // Grabs the new username value
    let username = document.querySelector('#userValue').value
    let logObj = {
        new_username: username
    }
    // PUT request to the backend to update
    fetch("/api/users/username", {
        method: "PUT",
        body: JSON.stringify(logObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
})

// Adds an event listener to the save new email button
let editEmail = document.querySelector('.newEmail')
editEmail.addEventListener('click', async (event) => {
        // Grabs the new email value
    let email = document.querySelector('#emailValue').value
    let logObj = {
        new_email: email
    }
    // PUT request to the backend to update
    fetch("/api/users/email", {
        method: "PUT",
        body: JSON.stringify(logObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
})

// Adds an event listener to the save new pass button
let editPass = document.querySelector('.newPass')
editPass.addEventListener('click', async (event) => {
        // Grabs the new password value
    let password = document.querySelector('#passValue').value
    let logObj = {
        new_password: password
    }
    // PUT request to the backend to update
    fetch("/api/users/password", {
        method: "PUT",
        body: JSON.stringify(logObj),
        headers: {
            "Content-Type": "application/json"
        }
    })
    alert('123')
})