const router = require('express').Router();

const userRoutes = require('./userRoute');
const reviewRoute = require('./reviewRoute');
const omdbRoute = require('./omdb');
const movieRoute = require('./movieRoutes');

//routes to respective js pages
router.use('/users', userRoutes);
router.use('/reviews', reviewRoute);
router.use('/omdb', omdbRoute);
router.use('/movies', movieRoute);


module.exports = router;