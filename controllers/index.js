// Imports express
const router = require('express').Router();

// Imports the main homepage route into a variable
const homeroute = require('./homeRoutes');

// Sets the variable as the default route
router.use('/', homeroute);

// Sends the user to a 404 page if they go to an invalid route
router.use((req, res) => {
    res.status(404).end();
});

// Exports the route that was made to route the route to the imported route from another page........... :/
module.exports = router;



