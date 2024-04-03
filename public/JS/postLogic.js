let movie_name;
let movieid;
let pulledArray = []


// https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&api_key=9b2c15760bf8b5117d73ef873c45f644
async function newFormHandler(event) {
  event.preventDefault();

  if(movie_selected === false){
    document.querySelector('.titleName').textContent = '*select a movie to review'
    document.querySelector('.titleName').setAttribute('class', 'text-danger titleName')
    return
  }
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
  const tmdbData = await response.json() 
  if (response.ok) {
    pulledArray = tmdbData
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

    for(let i = 0; i < fetchedData.results.length; i++){
      if(fetchedData.results[i].poster_path === null){
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
      img.setAttribute('id', `${fetchedData.results[i].title}`)
      img.setAttribute('class', `getById`)
      img.setAttribute('height', '225')
      name.textContent = `${fetchedData.results[i].title}`
      button.append(img)
      div.append(button, name)
      divwrap.append(div)
    }
    document.querySelector('#test').append(divwrap)
    posterBtn = document.querySelectorAll('.getById')
    for (let i = 0; i < posterBtn.length; i++) {
      posterBtn[i].addEventListener('click', pickAMovie);
    }
  })
let movie_selected = false
function pickAMovie(event){
  movie_selected = true
    const previousCards = document.querySelector('.nuke2')
    if(previousCards !== null){
      previousCards.textContent = ""
    }
    let idName = event.target.id
    console.log(idName)
    let name = document.querySelector('.titleName')
    name.setAttribute('id', `${idName}`)
    name.setAttribute('class', 'nuke2 titleName')
    name.textContent = `Reviewing: ${idName}`

    for(let i = 0; i < pulledArray.results.length; i++){
      if(pulledArray.results[i].title === idName){
        movie_name = pulledArray.results[i].title
        movieid = pulledArray.results[i].id
      }
      continue
    }
  }


    
// searchClick =  document.querySelector('#search')
// searchClick.addEventListener('click', apiFetch);