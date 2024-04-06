const router = require('express').Router();

// Imports the secured api key and domain from .env
require('dotenv').config();
const apiKey = `${process.env.API_KEY}`
const searchQueryDomain = `${process.env.API_SEARCH_DOMAIN}`

// GET request that does a fetch request to pull data from tmbd
router.get('/:id', async (req, res) => {
  try {
    apirequest = `${searchQueryDomain}?query=${req.params.id}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
    const omdbData = await fetch(apirequest)
    let fetchedData = await omdbData.json()
    // Sends the fetched data back
    res.send(fetchedData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})

// Exports the route for use
module.exports = router;
