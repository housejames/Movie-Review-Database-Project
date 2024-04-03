const router = require('express').Router();
const { User, Review, Movie} = require('../../models/index');

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

router.get('/', async (req, res) => {
    try {
        const movieData = await Movie.findAll({
        })
        res.status(200).json(movieData)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
})
// Exports all the routes for use
module.exports = router;