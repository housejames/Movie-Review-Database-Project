const router = require('express').Router();
const { User, Review, Movie, UserFavorite, UserWatchList } = require('../../models/index');

// Imports the secured api key and domain from .env
require('dotenv').config();
const apiKey = `${process.env.API_KEY}`
const searchQueryDomain = `${process.env.API_SEARCH_DOMAIN}`

// POST request to add a movie from the 'post a review form'
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
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST request to add a movie and a joining UserFavorite, adding it to the users favorites
router.post('/fav', async (req, res) => {
  try {
    // Pulls data from a post fetch request made in ../../public/JS/postLogic
    const pulledData = await Movie.findAll({})
    // If a movie already exists in our db it just creates the joining UserFavorite
    for (let i = 0; i < pulledData.length; i++) {
      if (pulledData[i].id === req.body.movieid) {
        const link = await UserFavorite.create({
          movie_id: req.body.movieid,
          user_id: req.session.user_id
        })
      }
      continue
    }
    // IF a movie is not in our db, it adds the move to our db, and then creates the joining UserFavorite
    const movieData = await Movie.create({
      id: req.body.movieid,
      name: req.body.movie_name,
      release_date: req.body.movie_date,
      poster: req.body.movie_poster
    });
    const link = await UserFavorite.create({
      movie_id: req.body.movieid,
      user_id: req.session.user_id
    })
    // Catch for errors
  } catch (err) {
    console.log(4)
    res.status(400).json(err);
  }
});

// POST request to add a movie and a joining UserWatchList adding it to the users watchlist
router.post('/wl', async (req, res) => {
  try {
    // Pulls data from a post fetch request made in ../../public/JS/postLogic
    const pulledData = await Movie.findAll({})
    // If a movie already exists in our db it just creates the joining UserWishList
    for (let i = 0; i < pulledData.length; i++) {
      if (pulledData[i].id === req.body.movieid) {
        const link = await UserWatchList.create({
          movie_id: req.body.movieid,
          user_id: req.session.user_id
        })
      }
      continue
    }
    // IF a movie is not in our db, it adds the move to our db, and then creates the joining UserWishList
    const movieData = await Movie.create({
      id: req.body.movieid,
      name: req.body.movie_name,
      release_date: req.body.movie_date,
      poster: req.body.movie_poster
    });
    const link = await UserWatchList.create({
      movie_id: req.body.movieid,
      user_id: req.session.user_id
    })
    // Catch for errors
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET request that gets all movies and the reviews that are linked to it
router.get('/', async (req, res) => {
  try {
    // Pulls all the movies from out db
    const movieData = await Movie.findAll({
      include: [
        {
          model: Review
        }
      ]
    })
    res.status(200).json(movieData)
    // Catch for errors
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Exports all the routes for use
module.exports = router;