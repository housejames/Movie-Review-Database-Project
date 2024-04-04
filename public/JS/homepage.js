userSearch = document.querySelector('.usernameInputBtn')
userSearch.addEventListener('click', async (event) => {
    let userSearchValue = document.querySelector('.usernameInput').value
    console.log(userSearchValue)
})





movieSearch = document.querySelector('.movieNameInputBtn')
movieSearch.addEventListener('click', async (event) => {
    let movieSearchValue =  document.querySelector('.movieNameInput').value
    let updatedmovieSearchValue = movieSearchValue.replace(/\s/g, '+')
    
    const response = await fetch(`/${updatedmovieSearchValue}`, {
        method: 'GET',
    });

    document.location.replace(`/${updatedmovieSearchValue}`)
    
        const pulledMovies = await response.json()
        console.log(pulledMovies)

})