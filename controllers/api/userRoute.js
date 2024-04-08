const router = require('express').Router();
const bcrypt = require("bcrypt")
// Import the User model from the models folder
const { User, Review, Movie, UserFavorite, UserWatchList } = require('../../models');
const { where } = require('sequelize');


// POST request for adding a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body)
    // Saves the session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
    // Catch for errors
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// GET request for getting all users
router.get('/', async (req, res) => {
  try {
    // Finds all users
    const userData = await User.findAll({
      // Includes joining tables to see the users revies, favorites, and watchlist
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
      // Excludes the password from the get request
      attributes: { exclude: ['password', 'email'] }
    })
    res.status(200).json(userData)
    // Catch for errors
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

// POST rquest that takes login values and checks the data base if the email/password are correct
router.post('/login', async (req, res) => {
  try {
    // Finds the user where the email matches the email they used to login since emails are unique
    const userData = await User.findOne(
      {
        where:
        {
          email: req.body.email
        }
      });
    // If no user was found it sends a 400 status
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password' });
      return;
    }
    // If the password doesnt match it sends a 400 status
    if (!bcrypt.compareSync(req.body.password, userData.password)) {
      res.status(400).json({ message: 'Incorrect email or password' });
      return;
    }
    // Saves the session data
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    // Catch for errors
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post request to logout deleting any session data
router.post('/logout', (req, res) => {
  // Checks if user is already logged in
  if (req.session.logged_in) {
    // If they are logged in it delets the session data
    req.session.destroy(() => {
      res.status(204).end();
    });
    // Catch for errors
  } else {
    res.status(404).end();
  }
});

// PUT request to update the users username
router.put('/username', async (req, res) => {
  try {
    // Pulls data from a put fetch request
    const usereData = await User.update({
      username: req.body.new_username,
    }, {
      where: {
        id: req.session.user_id,
      }
    });
    res.status(200).json(usereData);
    // Catch for errors  
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT request to update the users email
router.put('/email', async (req, res) => {
  try {
    // Pulls data from a put fetch request
    const usereData = await User.update({
      email: req.body.new_email,
    }, {
      where: {
        id: req.session.user_id,
      }
    });
    res.status(200).json(usereData);
    // Catch for errors  
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT request to update the users password
router.put('/password', async (req, res) => {
  try {
    // Pulls data from a put fetch request
    const usereData = await User.update({
      password: req.body.new_password,
    }, {
      where: {
        id: req.session.user_id,
      },
      individualHooks: true,
    });
    res.status(200).json(usereData);
    // Catch for errors  
  } catch (err) {
    res.status(400).json(err);
  }
});

// Exports the routes for use
module.exports = router;
