// Imports express into a router variable
const router = require('express').Router();
// Imports the joined models
const {User, Review, Movie, UserMovie} = require('../models/index');

require('dotenv').config();
const apiKey = `${process.env.API_KEY}`
const newReleaseDomain = `${process.env.API_RELEASE_DOMAIN}`
const searchQueryDomain = `${process.env.API_SEARCH_DOMAIN}`

// Route for main homepage
router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            // Adds the joined user model with the User attribute of username (User.username)
            include: [{model: User, attributes:['username',]}, {model: Movie, attributes: ['name', 'poster']}]})
        const reviewsArray = reviewData.map((review) => review.get({ plain: true }));
        let sliced = reviewsArray.slice(-5)
        let reviews = sliced.reverse()
        console.log(reviewsArray)
      
        apirequest = `${newReleaseDomain}${apiKey}`
        const omdbData = await fetch(apirequest)
        let fetchedData = await omdbData.json()
        for(let i = 0; i < fetchedData.results.length; i++){
            if(fetchedData.results[i].vote_count < 150){
                fetchedData.results.splice(i)

            }
        }
        // Renders the homepage with the data in reviews
        res.render('homepage', {
        reviews, fetchedData, loggedIn: req.session.logged_in
        });
    // Error catch    
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
})

// Route for posting review page
router.get('/review', async (req, res) => {
  try {
      const reviewData = await Review.findAll({
          attributes: [
              'id',
              'title',
              'content'
          ],
          include: [{model: User, attributes:['username']}]
      })
      const reviews = reviewData.map((review) => review.get({ plain: true })
      );
      res.render('postreview', {reviews});
  }catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
})

router.get("/auth",(req,res)=>{
  if(req.session.logged_in){
      return res.redirect("/profile")
  }
  res.render("auth",{
      loggedIn:false
  })
})

router.get("/profile",async (req,res)=>{
  if(!req.session.logged_in){
      return res.redirect("/auth")
  }
  const userData = await User.findByPk(req.session.user_id,{
      include:[Review]
  })
  const hbsData = userData.toJSON();
  hbsData.loggedIn = true
  // res.json(hbsData);
  res.render("profile",hbsData)
})

router.get('/:id', async (req, res) => {
    try {
      apirequest = `${searchQueryDomain}?query=${req.params.id}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
      const tmdbData = await fetch(apirequest)
      let fetchedData = await tmdbData.json()
      let movieUserWants = fetchedData.results[0]
      const movieData = await Movie.findAll({include: [{model: Review}], where: {id: movieUserWants.id}})
      const parsedMovieData = movieData.map((review) => review.get({ plain: true }));
      console.log(parsedMovieData[0].reviews)
      res.render('searchedMovie', {parsedMovieData})
    }catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

// Exports the route
module.exports = router;