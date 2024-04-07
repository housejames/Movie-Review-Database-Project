const router = require('express').Router();
const { User, Review, Movie } = require('../../models/index');

// GET request to get all reviews
router.get('/', async (req, res) => {
  try {
    // Gets all reviews from our db
    const reviewData = await Review.findAll({
      // Adds the username from the User model through the linked id
      include: [
        {
          model: User,
          attributes: ['username']
        }, {
          model: Movie
        }
      ]
    })
    // Convert the object into more readable data
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.json(reviews)
    // Catch for errors    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// DELETE request to delete a specifc review
router.delete('/:id', async (req, res) => {
  if (req.session.logged_in) {
    try {
      // Finds a review where the id matches the search paramater
      const data = await Review.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json()
      // Catch for errors
    } catch (err) {
      res.status(500).json(err);
    }
  }
});


// POST request to post a review
router.post('/', async (req, res) => {
  try {
    // Pulls data from a post fetch request made in ../../public/JS/postLogic
    const reviewData = await Review.create({
      title: req.body.review_title,
      content: req.body.review_content,
      rating: req.body.review_rating,
      user_id: req.session.user_id,
      movie_id: req.body.movieid
    });
    res.status(200).json(reviewData);
    // Catch for errors  
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT request to update a review
router.put('/', async (req, res) => {
  // Updates the review with data from the put request made on the profile page
  try {
    const reviewData = await Review.update(
      {
        title: req.body.review_title,
        content: req.body.review_content,
        rating: req.body.review_rating,
        user_id: req.session.user_id,
      }, {
      where: {
        id: req.body.review_id
      }
    });
    res.status(200).json(reviewData);
    // Catch for errors  
  } catch (err) {
    res.status(400).json(err);
  }
})

// Exports all the routes for use
module.exports = router;
