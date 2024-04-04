// Imports seqialize for the model
const { Model, DataTypes } = require('sequelize');
// Users the connection.js in Config to connect to postgres
const sequelize = require('../config/connection');

// Creates the class of 'Review', as an extention of a sequalize model
class UserMovie extends Model {}

// The model for a review
UserMovie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    movie_id:{
      type: DataTypes.INTEGER,
      references: {
        model: 'movie',
        key: 'id'
    }
    },
    review_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'review',
            key: 'id'
        }
      }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'usermovie',
  }
)

// Exports the model
module.exports = UserMovie;