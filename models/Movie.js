// Imports seqialize for the model
const { Model, DataTypes } = require('sequelize');
// Users the connection.js in Config to connect to postgres
const sequelize = require('../config/connection');



// Creates the class of 'Review', as an extention of a sequalize model
class Movie extends Model {}

// The model for a review
Movie.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie',
  }
)

// Exports the model
module.exports = Movie;