// Imports the models
const User = require ('./User');
const Review = require('./Review');
const Movie = require('./Movie');
const UserMovie = require('./UserMovie');
const UserWatchList = require('./UserWatchList');
const UserFavorite = require('./UserFavorites');

// Connects the user_id to the review they make
Review.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(Review, {
    foreignKey: 'user_id'
});



Movie.belongsToMany(Review, {
    through: UserMovie,
    foreignKey: 'movie_id'
});

Review.belongsToMany(Movie, {
    through: UserMovie,
    foreignKey: 'review_id'
});



Movie.belongsToMany(User, {
    through: UserFavorite,
    as: 'favorite',
    foreignKey: 'movie_id'
});

User.belongsToMany(Movie, {
    through: UserFavorite,
    as: 'favorite',
    foreignKey: 'user_id'
});



Movie.belongsToMany(User, {
    through: UserWatchList,
    as: 'watch_list',
    foreignKey: 'movie_id'
});

User.belongsToMany(Movie, {
    through: UserWatchList,
    as: 'watch_list',
    foreignKey: 'user_id'
});






// Exports the newly joined models
module.exports = {Review, User, Movie, UserMovie, UserFavorite, UserWatchList}
