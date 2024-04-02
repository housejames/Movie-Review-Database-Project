const router = require('express').Router();

const userRoutes = require('./userRoute');
const reviewRoute = require('./reviewRoute');

//routes to respective js pages
router.use('/users', userRoutes);
router.use('/reviews', reviewRoute);

module.exports = router;