const router = require('express').Router();
const bcrypt = require("bcrypt")
// Import the User model from the models folder
const { User, Review, Movie, UserMovie, UserFavorite, UserWatchList } = require('../../models');


// POST request for adding a user
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

// GET request for getting all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          model: Review
        }, {
          model: Movie,
          through: UserFavorite,
          attributes: ['name', 'release_date', 'poster'],
          as: 'favorite'
        }, {
          model: Movie,
          attributes: ['name', 'release_date', 'poster'],
          through: UserWatchList,
          as: 'watch_list'
        }
      ],
      attributes: { exclude: ['password'] }
    })
    res.status(200).json(userData)
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

// POST rquest that takes login values and checks the data base if the email/password are correct
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

// Post request to logout deleting any session data
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Exports the routes for use
module.exports = router;
