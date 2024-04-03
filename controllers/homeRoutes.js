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
        // Renders the homepage with the data in reviews
        res.render('homepage', {
        reviews, loggedIn: req.session.logged_in
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