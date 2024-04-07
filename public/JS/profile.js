
// Rrenders posters and names for adding a movie to favorites
FavClick = document.querySelector('#Favoritesearch')
FavClick.addEventListener('click', async (event) => {
  event.preventDefault();
  const movieToSearch = document.querySelector('#favoriteMovieSearch').value;
  let userSearch = movieToSearch.replace(/\s/g, '+');

  // Send fetch request to add a new dish
  const response = await fetch(`/api/omdb/${userSearch}`, {
    method: 'GET',
  });
  const tmdbData = await response.json()
  if (response.ok) {
    pulledArray = tmdbData
    console.log(pulledArray)
  } else {
    alert('Post Failed!');
  }
  fetchedData = pulledArray

  const previousCards = document.querySelector('#nuke')

  if (previousCards !== null) {
    previousCards.remove()
  }

  let divwrap = document.createElement('div')
  divwrap.setAttribute('id', 'nuke')

  for (let i = 0; i < fetchedData.results.length; i++) {
    if (fetchedData.results[i].poster_path === null) {
      continue
    }
    let button = document.createElement('button')
    let img = document.createElement('img')
    let name = document.createElement('p')
    let div = document.createElement('div')
    button.setAttribute('class', `poster`)
    div.setAttribute('class', `movieStyle`)
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500${fetchedData.results[i].poster_path}`)
    img.setAttribute('width', '125')
    img.setAttribute('id', `${fetchedData.results[i].id}`)
    img.setAttribute('class', `getById liveToastBtn`)
    img.setAttribute('height', '225')
    name.textContent = `${fetchedData.results[i].title}`
    button.append(img)
    div.append(button, name)
    divwrap.append(div)
  }

  closeReload = document.querySelector('.closeReload')
  closeReload.addEventListener('click', reload)

  document.querySelector('.modal-body').append(divwrap)
  posterBtn = document.querySelectorAll('.getById')
  for (let i = 0; i < posterBtn.length; i++) {
    posterBtn[i].addEventListener('click', favoriteMovie);
  }
})

// Renders posters and names for adding a movie to watchlist
wlClick = document.querySelector('#watchlistSearch')
wlClick.addEventListener('click', async (event) => {
  event.preventDefault();
  const movieToSearch = document.querySelector('#watchlistMovieSearch').value;
  let userSearch = movieToSearch.replace(/\s/g, '+');

  // Send fetch request to add a new dish
  const response = await fetch(`/api/omdb/${userSearch}`, {
    method: 'GET',
  });
  const tmdbData = await response.json()
  if (response.ok) {

    pulledArray = tmdbData
    console.log(pulledArray)
  } else {
    alert('Post Failed!');
  }
  fetchedData = pulledArray

  const previousCards = document.querySelector('#nuke')

  if (previousCards !== null) {
    previousCards.remove()
  }

  let divwrap = document.createElement('div')
  divwrap.setAttribute('id', 'nuke')

  for (let i = 0; i < fetchedData.results.length; i++) {
    if (fetchedData.results[i].poster_path === null) {
      continue
    }

    let button = document.createElement('button')
    let img = document.createElement('img')
    let name = document.createElement('p')
    let div = document.createElement('div')
    button.setAttribute('class', `poster`)
    div.setAttribute('class', `movieStyle`)
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500${fetchedData.results[i].poster_path}`)
    img.setAttribute('width', '125')
    img.setAttribute('id', `${fetchedData.results[i].id}`)
    img.setAttribute('class', `getById liveToastBtn`)
    img.setAttribute('height', '225')
    name.textContent = `${fetchedData.results[i].title}`
    button.append(img)
    div.append(button, name)
    divwrap.append(div)
  }
  closeReload = document.querySelector('.closeReload2')
  closeReload.addEventListener('click', reload)

  document.querySelector('.modal-body2').append(divwrap)
  posterBtn = document.querySelectorAll('.getById')
  for (let i = 0; i < posterBtn.length; i++) {

    posterBtn[i].addEventListener('click', watchlistMovie);
  }
})

// Adds any selected movie in the modal to favorites
async function favoriteMovie(event) {

  let idName = event.target.id
  const toastTrigger = document.getElementsByClassName('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToast')
  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)

    toastBootstrap.show()

  }
  for (let i = 0; i < pulledArray.results.length; i++) {
    if (pulledArray.results[i].id == idName) {
      console.log('test123')
      let toastName = document.querySelector(".me-auto")
      toastName.textContent = `${pulledArray.results[i].title} added to favorites`
      movie_name = pulledArray.results[i].title
      movieid = pulledArray.results[i].id
      movie_date = pulledArray.results[i].release_date
      movie_poster = `https://image.tmdb.org/t/p/w500/${fetchedData.results[i].poster_path}`
    }
    continue
  }
  console.log(movie_name)


  const response2 = await fetch('/api/movies/fav', {
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
}

// Adds any selected movie in the modal to favorites
async function watchlistMovie(event) {

  let idName = event.target.id
  const toastTrigger = document.getElementsByClassName('liveToastBtn')
  const toastLiveExample = document.getElementById('liveToast')
  if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastBootstrap.show()
  }
  for (let i = 0; i < pulledArray.results.length; i++) {
    if (pulledArray.results[i].id == idName) {
      let toastName = document.querySelector(".me-auto")
      toastName.textContent = `${pulledArray.results[i].title} added to favorites`
      movie_name = pulledArray.results[i].title
      movieid = pulledArray.results[i].id
      movie_date = pulledArray.results[i].release_date
      movie_poster = `https://image.tmdb.org/t/p/w500/${fetchedData.results[i].poster_path}`
    }
    continue
  }

  const response2 = await fetch('/api/movies/wl', {
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
}

// Sends a DELETE request to the backend to delete the selected favorite movie
async function deleteFavRequest(event) {
  let idName = event.target.id
  console.log(idName)
  fetch(`/api/favorite/${idName}`, {
    method: "DELETE",
  }).then(res => {
    location.reload()
    if (res.ok) {
      location.reload()
    } else { }
  })
}

// Sends a DELETE request to the backend to delete the selected wishlist movie
async function deleteWlRequest(event) {
  let idName = event.target.id
  console.log(idName)
  fetch(`/api/watchlist/${idName}`, {
    method: "DELETE",
  }).then(res => {
    location.reload()
    if (res.ok) {
      location.reload()
    } else { }
  })
}

// Sends a DELETE request to the backend to delete the selected review
async function deleteReviewRequest(event) {
  let idName = event.target.id
  console.log(idName)
  fetch(`/api/reviews/${idName}`, {
    method: "DELETE",
  }).then(res => {
    if (res.ok) {
      location.reload()
    } else {
      console.log('error')
    }
  })
}

// Sends PUT request to update the selected review
async function updateReview(event) {
  event.preventDefault();
  // Grabs the id of the review which is attached to the save button through habdlebars
  let idName = event.target.id
  review_id = idName.slice(4)
  // Grabs the new values from the form
  let review_title = document.querySelector(`#title${review_id}`).value
  let review_content = document.querySelector(`#content${review_id}`).value
  // Grabs the radio vaue
  var radio = document.getElementsByName('rate');
  for (i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      review_rating = radio[i].value
    }
    continue
  }
  // Sends the PUT fetch request to api/reviews
  const response = await fetch(`/api/reviews`, {
    method: 'PUT',
    body: JSON.stringify({
      review_id,
      review_title,
      review_content,
      review_rating,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // Reloads the page
  reload()
}

// Adds an event-listener to all favorite movie's remove button
let removeFaveLogic = document.querySelectorAll('.removeFav')
for (let i = 0; i < removeFaveLogic.length; i++) {
  removeFaveLogic[i].addEventListener('click', deleteFavRequest)
}

// Adds an event-listener to all wishlist movie's remove button
let removeWlLogic = document.querySelectorAll('.removewl')
for (let i = 0; i < removeWlLogic.length; i++) {
  removeWlLogic[i].addEventListener('click', deleteWlRequest)
}

// Adds an event-listener to all review's remove button
let removeBlogLogic = document.querySelectorAll('.delete')
for (let i = 0; i < removeBlogLogic.length; i++) {
  removeBlogLogic[i].addEventListener('click', deleteReviewRequest)
}

// Adds an event-listener to all review's save changes button
let saveEdit = document.querySelectorAll('.saveEditChange')
for (let i = 0; i < saveEdit.length; i++) {
  saveEdit[i].addEventListener('click', updateReview)
}

// Adds an event-listener to all review's edit button
let editReview = document.querySelectorAll('.editReviewBtn')
for (let i = 0; i < editReview.length; i++) {
  editReview[i].addEventListener('click', interactId)
}

// Function that reloads the page
function reload() {
  location.reload()
}

// Function to grab the most recent interacted review id
function interactId(event) {
  let review_id = event.target.id
  let interactedId = review_id.slice(13)
  console.log(interactedId)

  let interactedReviw = document.querySelector(`#interact${interactedId}`).textContent
  console.log(interactedReviw)

  let star1 = document.querySelector(`#star1-${interactedId}`)
  let star2 = document.querySelector(`#star2-${interactedId}`)
  let star3 = document.querySelector(`#star3-${interactedId}`)
  let star4 = document.querySelector(`#star4-${interactedId}`)
  let star5 = document.querySelector(`#star5-${interactedId}`)

  if (interactedReviw == 5) {
    star1.checked = true
    star2.checked = true
    star3.checked = true
    star4.checked = true
    star5.checked = true
  } else if (interactedReviw == 4) {
    star1.checked = true
    star2.checked = true
    star3.checked = true
    star4.checked = true
  } else if (interactedReviw == 3) {
    star1.checked = true
    star2.checked = true
    star3.checked = true
  } else if (interactedReviw == 4) {
    star1.checked = true
    star2.checked = true
  } else {
    star1.checked = true
  }
}
