const router = require('express').Router();
const { User, Review} = require('../../models/index');


router.get('/', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
        attributes: [
            'id',
            'title',
            'content'
        ],
        include: [{model: User, attributes:['username']}]
    })
    const reviews = reviewData.map((review) => Review.get({ plain: true }));
    res.json(reviews)
}catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    console.log('test')
    const reviewData = await Review.create({
      title: req.body.review_title,
      content: req.body.review_content,
    //   user_id:
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
