// Imports express into a router variable
const router = require('express').Router();
// Imports the joined models
const {User, Review, Movie, UserMovie} = require('../models/index');

// Route for main homepage
router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            // Adds the joined user model with the User attribute of username (User.username)
            include: [{model: User, attributes:['username']}, {model: Movie, through: UserMovie}]
        })
        const reviews = reviewData.map((review) => review.get({ plain: true })
        );
        apirequest = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2%7C3&release_date.gte=%7Bmin_date%7D&release_date.lte=%7Bmax_date%7D&api_key=9b2c15760bf8b5117d73ef873c45f644`
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
      res.render('postreview', {reviews,});
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

// Exports the route
module.exports = router;