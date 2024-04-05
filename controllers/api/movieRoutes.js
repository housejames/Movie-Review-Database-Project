const router = require('express').Router();
const session = require('express-session');
const { User, Review, Movie, UserFavorite, UserWatchList} = require('../../models/index');

require('dotenv').config();
const apiKey = `${process.env.API_KEY}`
const searchQueryDomain = `${process.env.API_SEARCH_DOMAIN}`

// Posts a movie with user data from the rview page
router.post('/', async (req, res) => {
  try {
    // Pulls data from a post fetch request made in ../../public/JS/postLogic
    const movieData = await Movie.create({
      id: req.body.movieid,
      name: req.body.movie_name,
      release_date: req.body.movie_date,
      poster: req.body.movie_poster
    });
    res.status(200).json(movieData);
    // Catch for errors  
    }catch (err) {
      res.status(400).json(err);
    }
});

router.post('/fav', async (req, res) => {
  try {
    // Pulls data from a post fetch request made in ../../public/JS/postLogic
    const pulledData = await Movie.findAll({})
    console.log('1')
    console.log(req.body.movieid)
    console.log(req.session.user_id)
    for(let i = 0; i < pulledData.length; i++){
      if(pulledData[i].id === req.body.movieid){
        const link = await UserFavorite.create({
          movie_id: req.body.movieid,
          user_id: req.session.user_id
        })
        console.log('2')
      }
      console.log('2.5')
      continue

    }
    console.log('2.75')
    const movieData = await Movie.create({
      id: req.body.movieid,
      name: req.body.movie_name,
      release_date: req.body.movie_date,
      poster: req.body.movie_poster
    });
    console.log('3')
    const link = await UserFavorite.create({
      movie_id: req.body.movieid,
      user_id: req.session.user_id
    })
    console.log('3.5')
    }catch (err) {
      console.log(4)
      res.status(400).json(err);
    }
});

router.post('/wl', async (req, res) => {
  try {
    // Pulls data from a post fetch request made in ../../public/JS/postLogic
    const pulledData = await Movie.findAll({})
    for(let i = 0; i < pulledData.length; i++){
      if(pulledData[i].id === req.body.movieid){
        const link = await UserWatchList.create({
          movie_id: req.body.movieid,
          user_id: req.session.user_id
        })
      }
      continue
    }
    const movieData = await Movie.create({
      id: req.body.movieid,
      name: req.body.movie_name,
      release_date: req.body.movie_date,
      poster: req.body.movie_poster
    });
    // res.status(200).json(movieData);

    const link = await UserWatchList.create({
      movie_id: req.body.movieid,
      user_id: req.session.user_id
    })
    }catch (err) {
      res.status(400).json(err);
    }
});

// Api route to view all the movies
router.get('/', async (req, res) => {
  try {
    const movieData = await Movie.findAll({
      include: [{model: Review}]
    })
    res.status(200).json(movieData)
  }catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});



// Exports all the routes for use
module.exports = router;