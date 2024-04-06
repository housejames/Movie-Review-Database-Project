const router = require('express').Router();
const {UserFavorite} = require('../../models/index');

// Delete a users favorite movie
router.delete('/:id', async (req, res) => {
  try {
    const data = await UserFavorite.destroy({
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