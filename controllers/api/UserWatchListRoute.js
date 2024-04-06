const router = require('express').Router();
const {UserWatchList} = require('../../models/index');

// DELETE rquest that delets a movie from the users watchlist
router.delete('/:id', async (req, res) => {
  try {
    const data = await UserWatchList.destroy({
      where: {
        movie_id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    res.json()
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports the route for use
module.exports = router;