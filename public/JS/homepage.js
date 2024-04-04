userSearch = document.querySelector('.usernameInputBtn')
userSearch.addEventListener('click', async (event) => {
    let userSearchValue = document.querySelector('.usernameInput')
    
    const response = await fetch(`/${userSearchValue}`, {
        method: 'GET',
    });
    document.location.replace(`/${test}`)
    document.location.replace(`/${userSearchValue}`)
})





movieSearch = document.querySelector('.movieNameInputBtn')
movieSearch.addEventListener('click', async (event) => {
    let movieSearchValue =  document.querySelector('.movieNameInput').value
    let updatedmovieSearchValue = movieSearchValue.replace(/\s/g, '+')
    let test = `movie${updatedmovieSearchValue}`
    console.log(test)
    console.log('test')
    const response = await fetch(`/${test}`, {
        method: 'GET',
    });

    document.location.replace(`/${test}`)
    

})