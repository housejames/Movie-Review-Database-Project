// Adds a  event listener to the signup button that runns a function
const signupForm = document.querySelector("#signup");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Creates an object of the data the user has typed in to the signup form
    const userObj = {
        username: document.querySelector("#signupName").value,
        email: document.querySelector("#signupEmail").value,
        password: document.querySelector("#signupPassword").value,
    }
    // does a POST request to /api/users to add the user
    fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
        // Catch to check If resposed was good (user was added)
    }).then(res => {
        // Redirect the user to their profile after signing up
        if (res.ok) {
            location.href = "/profile"
            // Alert if fields were left empty
        } else {
            alert("Please fill out all fields")
        }
    })
})