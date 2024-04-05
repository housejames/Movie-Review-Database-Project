const router = require('express').Router();
const {UserWatchList} = require('../../models/index');




router.delete('/:id', async (req, res) => {
    try {
      const data = await UserWatchList.destroy({
        where: {
          movie_id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      res.json()
    }catch (err) {
        res.status(500).json(err);
    }
});
  

module.exports = router;