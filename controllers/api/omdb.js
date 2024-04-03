const router = require('express').Router();

require('dotenv').config();
const apiKey = `${process.env.API_KEY}`
const apiDomain = `${process.env.API_DOMAIN}`

router.get('/:id', async (req, res) => {
    try {
        apirequest = `${apiDomain}${apiKey}&s=${req.params.id}`
        const omdbData = await fetch(apirequest)
        let fetchedData = await omdbData.json()
        // console.log(fetchedData)
        res.send(fetchedData);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
      }
})

router.get

module.exports = router;
  //   apirequest = `https://www.omdbapi.com/?apikey=444a2c3a&s=${usersearch}`
  //   console.log(apirequest)

  //   fetches the data and stores it to the catchall variable
  //   const response = await fetch(apirequest)
  //   let fetchedData = await response.json()
  //   console.log(fetchedData)