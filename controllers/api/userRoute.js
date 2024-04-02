const router = require('express').Router();
// Import the User model from the models folder
const { User } = require('../../models');

// If a POST request is made to /api/users, a new user is created. The user id and logged in state is saved to the session within the request object.
router.post('/', async (req, res) => {
  try {
    console.log(req.body)
    const userData = await User.create(req.body);

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

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
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
    console.log('test1')
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
        console.log('test2')
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log('test3')
    // const validPassword = await userData.checkPassword(req.body.password);
    console.log('test3.5')
    // if (!validPassword) {
    //     console.log('test4')
    //   res.status(400).json({ message: 'Incorrect email or password, please try again' });
    //   return;
    // }
    console.log('test5')
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      console.log(req.session)
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    console.log('test7')
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
