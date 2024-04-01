// Imports express into a router variable
const router = require('express').Router();
// Imports the joined models
const {User, Review} = require('../models/index');

// Route for main homepage
router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            attributes: [
                'id',
                'title',
                'content'
            ],
            // Adds the joined user model with the User attribute of username (User.username)
            include: [{model: User, attributes:['username']}]
        })
        const reviews = reviewData.map((review) => review.get({ plain: true })
        );
        console.log('+++++++++++++++++++++++++++++++++++++++++')
        console.log(reviews)

        // Pulled this session section from class repo to make sure sessions are working:
        req.session.save(() => {
            // We set up a session variable to count the number of times we visit the homepage
            if (req.session.countVisit) {
              // If the 'countVisit' session variable already exists, increment it by 1
              req.session.countVisit++;
            } else {
              // If the 'countVisit' session variable doesn't exist, set it to 1
              req.session.countVisit = 1;
            }
              });
              // Renders the homepage with the data in reviews
              res.render('homepage', {
                reviews,
                // We send over the current 'countVisit' session variable to be rendered
                countVisit: req.session.countVisit,
            });
    // Error catch    
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
})

// Exports the route
module.exports = router;