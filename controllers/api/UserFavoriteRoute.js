const router = require('express').Router();
const {UserFavorite} = require('../../models/index');

// Delete a users favorite movie
router.delete('/:id', async (req, res) => {
  try {
    // Deletes from the joining UserFavorite table 
    const data = await UserFavorite.destroy({
      // Makes surethe movie_id matches the paramter and the user_id matches the session user
      where: {
        movie_id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.json()
    // Catch for errors
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports the route for use
module.exports = router;