// Import express module
const path = require('path');
const express = require('express');
// Import express-session module
const session = require('express-session');
// Import handlebars module
const exphbs = require('express-handlebars');

// Imports the routes, sequalise model, and helpers (we dont have any helpers at the moment)
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');

// Creates the server at the environment variable or port 3001
const app = express();
const PORT = process.env.PORT || 3001;

// Set up a sessions
const sess = {
    secret: 'Keep it secret, keep it safe!',
    resave: false,
    saveUninitialized: false,
  };
  app.use(session(sess));

// Sets up handlebars
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Tells the server app to use the routes variable which links to the controllers index.js file, which then links to any routes we make
app.use(routes);

// Honestly not sure what this does excent that it logs a message in the console
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});