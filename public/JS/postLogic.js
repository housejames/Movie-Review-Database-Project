// Variables used in multiple functions inatialised outside
let movie_name;
let movieid;
let movie_poster;
let movie_date;
let pulledArray = []

// Function to post a review
async function newReview(event) {
  event.preventDefault();

  // Checks if a movie has been selected to review
  if (movie_selected === false) {
    document.querySelector('.titleName').textContent = '*select a movie to review'
    document.querySelector('.titleName').setAttribute('class', 'text-danger titleName')
    return
  }
  event.preventDefault();

  // POST request to add the movie that is being reviewed
  const response2 = await fetch('/api/movies', {
    method: 'POST',
    body: JSON.stringify({
      movieid,
      movie_name,
      movie_date,
      movie_poster
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // Grabs the review title, and content
  const review_title = document.querySelector('#blogtitle').value;
  const review_content = document.querySelector('#blogcontent').value;
  // Grabs the rating from the star radio buttons
  var radio = document.getElementsByName('rate');
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      review_rating = radio[i].value
    }
    continue
  }
  // Send fetch request to add a new dish
  const response = await fetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify({
      review_title,
      review_content,
      review_rating,
      movieid
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace('/')
  } else {
  }
}
// Adds an event listener to the submot review button to rune the above function
document
  .querySelector('.postform')
  .addEventListener('submit', newReview);

// Search for a movie function
searchclick = document.querySelector('#search')
searchclick.addEventListener('click', async (event) => {
  event.preventDefault();
  // Grabs the name of the movie being searched
  const movieToSearch = document.querySelector('#moviesearch').value;
  // Replaces spaces with a + for best search results
  let userSearch = movieToSearch.replace(/\s/g, '+');
  // GET request to grab data of movies that match the users search input form tmdb
  const response = await fetch(`/api/omdb/${userSearch}`, {
    method: 'GET',
  });
  // Stores the response data
  const tmdbData = await response.json()
  if (response.ok) {
    pulledArray = tmdbData
  }
  fetchedData = pulledArray

  // Net to remove the previously searched cards
  const previousCards = document.querySelector('#nuke')
  if (previousCards !== null) {
    previousCards.remove()
  }
  // Creates all the cards with data from the api GET request
  let divwrap = document.createElement('div')
  divwrap.setAttribute('id', 'nuke')
  for (let i = 0; i < fetchedData.results.length; i++) {
    if (fetchedData.results[i].poster_path === null) {
      continue
    }
    // Dom manipulation
    let button = document.createElement('button')
    let img = document.createElement('img')
    let name = document.createElement('p')
    let div = document.createElement('div')
    button.setAttribute('class', `poster`)
    div.setAttribute('class', `movieStyle`)
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500${fetchedData.results[i].poster_path}`)
    img.setAttribute('width', '100')
    img.setAttribute('id', `${fetchedData.results[i].id}`)
    img.setAttribute('class', `getById`)
    img.setAttribute('height', '150')
    name.textContent = `${fetchedData.results[i].title}`
    button.append(img)
    div.append(button, name)
    divwrap.append(div)
  }
  document.querySelector('#test').append(divwrap)
  posterBtn = document.querySelectorAll('.getById')
  // Adds an event listener to each of the generated posters to run the pickMovie function
  for (let i = 0; i < posterBtn.length; i++) {
    posterBtn[i].addEventListener('click', pickAMovie);
  }
})

let movie_selected = false
function pickAMovie(event) {
  movie_selected = true
  // Sets previous "no movie added text to nothing"
  const previousCards = document.querySelector('.nuke2')
  if (previousCards !== null) {
    previousCards.textContent = ""
  }
  // Grabs the id of the movie that is set in handlebars
  let idName = event.target.id
  let name = document.querySelector('.titleName')
  name.setAttribute('id', `${idName}`)
  name.setAttribute('class', 'nuke2 titleName')
  // Finds the matching movie that the user has selected to review
  // Adds all the movies data to outside variables for use in another function
  for (let i = 0; i < pulledArray.results.length; i++) {
    if (pulledArray.results[i].id == idName) {
      name.textContent = `Reviewing: ${pulledArray.results[i].title}`
      movie_name = pulledArray.results[i].title
      movieid = pulledArray.results[i].id
      movie_date = pulledArray.results[i].release_date
      movie_poster = `https://image.tmdb.org/t/p/w500/${fetchedData.results[i].poster_path}`
    }
    continue
  }
}


