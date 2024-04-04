// Boilerplate connection to postgres through sequelize
const Sequelize = require('sequelize');
require('dotenv').config();

// Boilerplate sequalize model
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

module.exports = sequelize;