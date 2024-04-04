const router = require('express').Router();
const { User, Review, Movie, UserMovie} = require('../../models/index');

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

// Api route to view all the movies
router.get('/', async (req, res) => {
  try {
    const movieData = await Movie.findAll({
      include: [{model: Review,}]
    })
    res.status(200).json(movieData)
  }catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});



// Exports all the routes for use
module.exports = router;