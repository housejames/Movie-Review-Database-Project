// Event listener to write a review button 
const writeRoute = document.querySelector('.writebtnmain');
writeRoute.addEventListener('click', (e) => {
    // Routes the user to the page to write a review
    document.location.replace('/review')
})