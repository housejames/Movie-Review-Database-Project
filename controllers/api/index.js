const router = require('express').Router();

const reviewRoute = require('./reviewRoute');

router.use('/reviews', reviewRoute);

module.exports = router;