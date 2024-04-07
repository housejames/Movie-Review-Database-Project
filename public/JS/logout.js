// Event listener to the logout button
document.querySelector(".logout").addEventListener("click", () => {
    // POST request to logout
    fetch("/api/users/logout", {
        method: "POST"
    }).then(res => {
        if (res.ok) {
            // Reloads the current page
            location.reload()
        }
    })
})