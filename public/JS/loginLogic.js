// Checks if user is logged in
if (!sessionStorage.loged_in) {
    // Adds an event listener to the login button
    const loginForm = document.querySelector("#loginBtn");
    loginForm.addEventListener('click', (e) => {
        e.preventDefault();
        // Creates an object from the form values
        const logObj = {
            email: document.querySelector("#loginEmail").value,
            password: document.querySelector("#loginPassword").value,
        }
        // POST request to add a user
        fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify(logObj),
            headers: {
                "Content-Type": "application/json"
            }
            // After, sets the user to loggedin status
        }).then(res => {
            sessionStorage.setItem('loggedin', true)
            if (res.ok) {
                //routes the user to the mainpage
                document.location.replace('/')
            } else {
                // Net for if password or username is incorrect
                const previousCards = document.querySelector('.incorrectAlert')
                // Removes any previous "incorrect" red text
                if (previousCards !== null) {
                    previousCards.remove()
                }
                // Dom manip to add the red "incorrect text"
                let modal = document.querySelector('#modalAlert')
                let incorrect = document.createElement('h6')
                incorrect.setAttribute('class', ' incorrectAlert text-danger')
                incorrect.textContent = 'Incorrect Email or Password'
                modal.append(incorrect)
            }
        })
    })
}