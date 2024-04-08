// Add an event listener to the search for a user button that runs a function
userSearch = document.querySelector('.usernameInputBtn')
userSearch.addEventListener('click', async (event) => {
    // Grabs the value in the search field
    let userSearchValue = document.querySelector('.usernameInput').value
    // Performs a GET request to a specific id (id being the username of the person they are searching)
    const response = await fetch(`/${userSearchValue}`, {
        method: 'GET',
    });
    // Routes the user to the searchedProfile page
    if (response.ok) {
        document.location.replace(`/${userSearchValue}`)
    } else {
        // Removes the previous 'no user found' alert
        const previousCards = document.querySelector('.noUserNuke')
        if (previousCards !== null) {
            previousCards.remove()
        }
        // Makes a red text notification that no user was found
        let noUserFoundWrap = document.querySelector('.noUserFound')
        let noUserFound = document.createElement('p')
        noUserFound.setAttribute('class', 'noUserNuke text-danger')
        noUserFound.textContent = 'No user found with that username *usernames are case sensitive*'
        noUserFoundWrap.append(noUserFound)
    }
})

// Add an event listener to the search for a movie button that runs a function
movieSearch = document.querySelector('.movieNameInputBtn')
movieSearch.addEventListener('click', async (event) => {
    // Grabs the value in the search field
    let movieSearchValue = document.querySelector('.movieNameInput').value
    // Replaces spaces with a + for better search results
    let updatedmovieSearchValue = movieSearchValue.replace(/\s/g, '+')
    // Adds the text 'movie' to the from of the value the user searched to differentiate it from a user-search
    // This is used in the backend to ensure no crossover
    let safteyNetValue = `movie${updatedmovieSearchValue}`
    // Performs a GET request to a specific id (id being the name of the movie they are searching)
    const response = await fetch(`/${safteyNetValue}`, {
        method: 'GET',
    });
    // Routes the user to the searchedMovie page
    if (response.ok) {
        document.location.replace(`/${safteyNetValue}`)
    } else {
        // Removes the previous 'no user found' alert
        const previousCards = document.querySelector('.noMovieNuke')
        if (previousCards !== null) {
            previousCards.remove()
        }
        // Makes a red text notification that no user was found
        let noMovieFoundWrap = document.querySelector('.noMovieFound')
        let noMovieFound = document.createElement('p')
        noMovieFound.setAttribute('class', 'noMovieNuke text-danger')
        noMovieFound.textContent = 'No movie found with that name'
        noMovieFoundWrap.append(noMovieFound)
    }
})

// Searches the page for all the review ratings
let rating = document.querySelectorAll('.ratings')
// For loop that goes over each rating that is found (meaning the total amount of reviews on the page)
for (let i = 0; i < rating.length; i++) {
    // Pulls the id from the rating <p> (the id is assigned the actual users rating on the review in handlebars)
    reviewrating = rating[i].id
    // Turns in into an integer
    reviewrating = parseInt(reviewrating)
    // Based on the review score it renders a an amount of starts, with a unique color
    if (reviewrating === 5) {
        rating[i].textContent = `☆ ☆ ☆ ☆ ☆`
        rating[i].style.color = "#7951AC"
    } else if (reviewrating === 4) {
        rating[i].textContent = `☆ ☆ ☆ ☆`
        rating[i].style.color = "#22885E"
    } else if (reviewrating === 3) {
        rating[i].textContent = `☆ ☆ ☆`
        rating[i].style.color = "#9F7E18"
    } else if (reviewrating === 2) {
        rating[i].textContent = `☆ ☆`
        rating[i].style.color = "#99542D"
    } else {
        rating[i].textContent = `☆`
        rating[i].style.color = "#A23C3C"
    }
}
