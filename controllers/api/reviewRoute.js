const router = require('express').Router();
const { User, Review, Movie, UserMovie} = require('../../models/index');

// Route to GET (display) all reviews
router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
        // Adds the username from the User model through the linked id
        include: [{model: User, attributes:['username']}, {model: Movie, attributes: ['name']}]
    })
    // Convert the object into more readable data
    const reviews = reviewData.map((review) => review.get({ plain: true }));
    res.json(reviews)
// Catch for errors    
}catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// Route to post a review
router.post('/', async (req, res) => {
  try {
    
    // Pulls data from a post fetch request made in ../../public/JS/postLogic
    const reviewData = await Review.create({
      title: req.body.review_title,
      content: req.body.review_content,
      user_id: req.body.user_id
    });
    console.log('-------------------', req.body.movieid)
    console.log('-------------------', reviewData.id)
    link = {
      review_id: reviewData.id ,
      movie_id: req.body.movieid
    }
    UserMovie.create(link)
    res.status(200).json(reviewData);
  // Catch for errors  
  } catch (err) {
    res.status(400).json(err);
  }
});

// Exports all the routes for use
module.exports = router;
