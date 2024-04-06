const router = require('express').Router();
const { UserWatchList } = require('../../models/index');

// DELETE rquest that delets a movie from the users watchlist
router.delete('/:id', async (req, res) => {
  try {
    // Deletes from the joining UserWatchList table 
    const data = await UserWatchList.destroy({
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