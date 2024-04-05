// Imports express into a router variable
const router = require('express').Router();
// Imports the joined models
const {User, Review, Movie, UserFavorite, UserWatchList} = require('../models/index');

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
      include:[
        {model: Review, attributes:[ 'id', 'title', 'content', 'rating']},
        {model: Movie, through: UserFavorite, attributes:[ 'id', 'name', 'release_date', 'poster'], as: 'favorite'},
        {model: Movie, attributes:['id', 'name', 'release_date', 'poster'], through: UserWatchList, as: 'watch_list'}
    ],
  })
  const hbsData = userData.toJSON();
  hbsData.loggedIn = true
  res.render("profile", hbsData)
})

router.get('/:id', async (req, res) => {
    try {
        let str = req.params.id;
        let result = str.slice(5);
        
        if(req.params.id === `movie${result}`){
            apirequest = `${searchQueryDomain}?query=${result}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
            const tmdbData = await fetch(apirequest)
            let fetchedData = await tmdbData.json()
            let movieUserWants = fetchedData.results[0].id
            const movieData = await Movie.findAll({include: [{model: Review}], where: {id: movieUserWants}})
            const parsedMovieData = movieData.map((review) => review.get({ plain: true }));
            res.render('searchedMovie', {parsedMovieData})
        }else {
            console.log(req.params.id)
            const userData = await User.findAll({
                where:{ username: req.params.id },
                include:[
                    {model: Review, attributes:[ 'id', 'title', 'content', 'rating']},
                    {model: Movie, through: UserFavorite, attributes:[ 'id', 'name', 'release_date', 'poster'], as: 'favorite'},
                    {model: Movie, attributes:['id', 'name', 'release_date', 'poster'], through: UserWatchList, as: 'watch_list'}
                ],
            })
            // userData.toJSON()
            console.log(userData)
            const parsedUserData = userData.map((review) => review.get({ plain: true }));
            console.log('==============================================')
            console.log(parsedUserData)
            res.render('searchedProfile', {parsedUserData})
        }

    }catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });


module.exports = router;