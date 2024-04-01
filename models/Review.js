// Imports seqialize for the model
const { Model, DataTypes } = require('sequelize');
// Users the connection.js in Config to connect to postgres
const sequelize = require('../config/connection');

// Creates the class of 'Review', as an extention of a sequalize model
class Review extends Model {}

// The model for a review
Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Foreign key to link to the users id
    user_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'user',
          key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
)

// Exports the model
module.exports = Review;