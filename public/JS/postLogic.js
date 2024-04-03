let movie_name;
let movieid;
let pulledArray = []

async function newFormHandler(event) {
    event.preventDefault();

    const response2 = await fetch('/api/movies', {
      method: 'POST',
      body: JSON.stringify({
        movieid,
        movie_name
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const review_title = document.querySelector('#blogtitle').value;
    const review_content = document.querySelector('#blogcontent').value;
  
    // Send fetch request to add a new dish
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: JSON.stringify({
        review_title,
        review_content,
        movieid
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
        alert("Review Posted!")
        document.location.replace('/')
      } else {
        alert('Post Failed!');
      }
    }

    
  document
    .querySelector('.postform')
    .addEventListener('submit', newFormHandler);

// async function apiFetch(event) {
//   event.preventDefault();
//   const movieToSearch = document.querySelector('#moviesearch').value;
//   let userSearch = movieToSearch.replace(/\s/g, '+');

//   // Send fetch request to add a new dish
//   const response = await fetch(`/api/omdb/${userSearch}`, {
//     method: 'GET',
//   });
//   const omdbData = await response.json() 
//   if (response.ok) {
//     pulledArray = omdbData
//     console.log(pulledArray)
//   } else {
//     alert('Post Failed!');
//   }
// }

  searchclick = document.querySelector('#search')
  searchclick.addEventListener('click', async (event)=>{
    event.preventDefault();
  const movieToSearch = document.querySelector('#moviesearch').value;
  let userSearch = movieToSearch.replace(/\s/g, '+');

  // Send fetch request to add a new dish
  const response = await fetch(`/api/omdb/${userSearch}`, {
    method: 'GET',
  });
  const omdbData = await response.json() 
  if (response.ok) {
    pulledArray = omdbData
    console.log(pulledArray)
  } else {
    alert('Post Failed!');
  }
   fetchedData = pulledArray

    const previousCards = document.querySelector('#nuke')

    if(previousCards !== null){
      previousCards.remove()
    }

    let divwrap = document.createElement('div')
    divwrap.setAttribute('id', 'nuke')

    for(let i = 0; i < fetchedData.Search.length; i++){
      if(fetchedData.Search[i].Poster === 'N/A'){
        continue
      }
      let button = document.createElement('button')
      let img = document.createElement('img')
      // let name = document.createElement('p')
      img.setAttribute('src', `${fetchedData.Search[i].Poster}`)
      img.setAttribute('width', '150')
      img.setAttribute('id', `${fetchedData.Search[i].Title}`)
      img.setAttribute('class', `getById`)
      img.setAttribute('height', '250')
      // img.textContent = `${fetchedData.Search[i].Title}`
      button.append(img)
      divwrap.append(button)
    }
    document.querySelector('#test').append(divwrap)
    posterBtn = document.querySelectorAll('.getById')
    for (let i = 0; i < posterBtn.length; i++) {
      posterBtn[i].addEventListener('click', pickAMovie);
    }
  })
  
function pickAMovie(event){
    const previousCards = document.querySelector('.nuke2')
    if(previousCards !== null){
      previousCards.remove()
    }
    idName = event.target.id
    let form = document.querySelector('.ping')
    let movie = document.createElement('p')
    movie.setAttribute('id', `${idName}`)
    movie.setAttribute('class', 'nuke2')
    movie.textContent = `Reviewing: ${idName}`
    form.append(movie)

    for(let i = 0; i < pulledArray.Search.length; i++){
      if(pulledArray.Search[i].Title === idName){
        movie_name = pulledArray.Search[i].Title
        movieid = pulledArray.Search[i].imdbID
      }
      continue
    }
  }


    
// searchClick =  document.querySelector('#search')
// searchClick.addEventListener('click', apiFetch);