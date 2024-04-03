// Imports the models
const User = require ('./User');
const Review = require('./Review');
const Movie = require('./Movie');
const UserMovie = require('./UserMovie');

// Connects the user_id to the review they make
Review.belongsTo(User, {
    foreignKey: 'user_id'
});
User.hasMany(Review, {
    foreignKey: 'user_id'
});


// Review.hasOne(Movie, {
//     through: 'UserMovie',
//     foreignKey: 'movie_id'
// });

Movie.belongsToMany(Review, {
    through: UserMovie,
    foreignKey: 'movie_id'
});

Review.belongsToMany(Movie, {
    through: UserMovie,
    foreignKey: 'review_id'
});








// Exports the newly joined models
module.exports = {Review, User, Movie, UserMovie}
