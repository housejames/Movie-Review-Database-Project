userSearch = document.querySelector('.usernameInputBtn')
userSearch.addEventListener('click', async (event) => {
    let userSearchValue = document.querySelector('.usernameInput').value
    console.log(userSearchValue)
    const response = await fetch(`/${userSearchValue}`, {
        method: 'GET',
    });
    document.location.replace(`/${userSearchValue}`)
})





movieSearch = document.querySelector('.movieNameInputBtn')
movieSearch.addEventListener('click', async (event) => {
    let movieSearchValue =  document.querySelector('.movieNameInput').value
    let updatedmovieSearchValue = movieSearchValue.replace(/\s/g, '+')
    let test = `movie${updatedmovieSearchValue}`
    const response = await fetch(`/${test}`, {
        method: 'GET',
    });
    document.location.replace(`/${test}`)
})


let rating = document.querySelectorAll('.ratings')
for(let i = 0; i < rating.length; i++ ){
    reviewrating = rating[i].id
    reviewrating = parseInt(reviewrating)
    if(reviewrating === 5){
        rating[i].textContent = `☆ ☆ ☆ ☆ ☆`
        rating[i].style.color = "#7951AC"
    }else if (reviewrating === 4){
        rating[i].textContent = `☆ ☆ ☆ ☆`
        rating[i].style.color = "#22885E"
    }else if (reviewrating === 3){
        rating[i].textContent = `☆ ☆ ☆`
        rating[i].style.color = "#9F7E18"
    }else if (reviewrating === 2){
        rating[i].textContent = `☆ ☆`
        rating[i].style.color = "#99542D"
    }else {
        rating[i].textContent = `☆`
        rating[i].style.color = "#A23C3C"
    }
}
