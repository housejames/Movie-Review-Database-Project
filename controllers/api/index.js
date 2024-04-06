const router = require('express').Router();

// Imports the routes
const userRoutes = require('./userRoute');
const reviewRoute = require('./reviewRoute');
const omdbRoute = require('./omdb');
const movieRoute = require('./movieRoutes');
const favoriteRoute = require('./UserFavoriteRoute');
const watchlistRoute = require('./UserWatchListRoute');

// Routes to creates specific routes based of off url to respective js pages
router.use('/users', userRoutes);
router.use('/reviews', reviewRoute);
router.use('/omdb', omdbRoute);
router.use('/movies', movieRoute);
router.use('/favorite', favoriteRoute);
router.use('/watchlist', watchlistRoute);

// Exports the routes for use
module.exports = router;