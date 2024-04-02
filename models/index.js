// Imports the models
const User = require ('./User');
const Review = require('./Review');

// Connects the user_id to the review they make
Review.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Review, {
    foreignKey: 'user_id'
})

// Exports the newly joined models
module.exports = {Review, User}
