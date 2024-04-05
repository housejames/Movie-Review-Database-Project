const router = require('express').Router();
const bcrypt = require("bcrypt")
// Import the User model from the models folder
const { User, Review, Movie, UserMovie, UserFavorite, UserWatchList } = require('../../models');


// If a POST request is made to /api/users, a new user is created. The user id and logged in state is saved to the session within the request object.
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const userData = await User.create(req.body);
    // Saves the session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Route to get all user info in json format
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
        include: [{model: Review}, {
          model: Movie, through: UserFavorite, 
          attributes:['name', 'release_date', 'poster'], as: 'favorite'
        }, {
          model: Movie, 
          attributes:['name', 'release_date', 'poster'], 
          through: UserWatchList, as: 'watch_list'}
        ],
        attributes: { exclude: ['password']}
        })
        res.status(200).json(userData)
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
})

// If a POST request is made to /api/users/login, the function checks to see if the user information matches the information in the database and logs the user in. If correct, the user ID and logged-in state are saved to the session within the request object.
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData)
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }
    if (!bcrypt.compareSync(req.body.password, userData.password)) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(req.session)
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// If a POST request is made to /api/users/logout, the function checks the logged_in state in the request.session object and destroys that session if logged_in is true.
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
