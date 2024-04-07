// Imports express into a router variable
const router = require('express').Router();
// Imports the joined models
const { User, Review, Movie, UserFavorite, UserWatchList } = require('../models/index');

// Imports the secured api key and domain from .env
require('dotenv').config();
const apiKey = `${process.env.API_KEY}`
const newReleaseDomain = `${process.env.API_RELEASE_DOMAIN}`
const searchQueryDomain = `${process.env.API_SEARCH_DOMAIN}`

// GET request that loads 'homepage.handlebars'
router.get('/', async (req, res) => {
    try {
        const reviewData = await Review.findAll({
            // Adds the joined user model with the User attribute of username (User.username)
            include: [
                {
                    model: User,
                    attributes: ['username',]
                }, {
                    model: Movie,
                    attributes: ['name', 'poster']
                }
            ]
        })
        const reviewsArray = reviewData.map((review) => review.get({ plain: true }));
        // slice the array to only show the latest 5 reviews
        let sliced = reviewsArray.slice(-5)
        let reviews = sliced.reverse()
        // API fetch request to get the latest releases data
        apirequest = `${newReleaseDomain}${apiKey}`
        const omdbData = await fetch(apirequest)
        let fetchedData = await omdbData.json()
        // For loop to cut off any random unknown movie that is released but shouldnt be on the homepage
        for (let i = 0; i < fetchedData.results.length; i++) {
            if (fetchedData.results[i].vote_count < 500) {
                fetchedData.results.splice(i, 1)
            }
        }
        // Renders the homepage with the data in reviews
        res.render('homepage', {
            reviews, fetchedData, loggedIn: req.session.logged_in
        });
        // Catch for errors   
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// GET request that loads 'postreview.handlebars'
router.get('/review', async (req, res) => {
    try {
        // Finds all reviews and joins the user table
        const reviewData = await Review.findAll({
            attributes: [
                'id',
                'title',
                'content'
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        // Parses the data
        const reviews = reviewData.map((review) => review.get({ plain: true })
        );
        // Renders the 'postreview page with the parsed data
        res.render('postreview', { reviews });
        // Catch for errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

// GET request that loads 'auth.handlebars'
router.get("/auth", (req, res) => {
    // Checks if logged in
    if (req.session.logged_in) {
        // If logged in take the user to their profile
        return res.redirect("/profile")
    }
    // If not logged in take the user to the signup page
    res.render("auth", {
        loggedIn: false
    })
})

// GET request that loads 'profile.handlebars'
router.get("/profile", async (req, res) => {
    // Check if logged in
    if (!req.session.logged_in) {
        // If not logged in take the user to the signup page
        return res.redirect("/auth")
    }
    // If loged in finds the user data in our db that is logged in via the session data
    const userData = await User.findByPk(req.session.user_id, {
        // Adds all the joining tables for review, favories, and wishlist
        include: [
            {
                model: Review,
                attributes: ['id', 'title', 'content', 'rating']
            },
            {
                model: Movie,
                through: UserFavorite,
                attributes: ['id', 'name', 'release_date', 'poster'],
                as: 'favorite'
            },
            {
                model: Movie,
                attributes: ['id', 'name', 'release_date', 'poster'],
                through: UserWatchList,
                as: 'watch_list'
            }
        ],
    })
    const ParsedData = userData.toJSON();
    ParsedData.loggedIn = true
    // Renders 'profile' page with the parsed userData
    res.render("profile", ParsedData)
})

// GET request that loads either 'searchedMovie.handlebars' or 'searchedProfile.handlebars'
router.get('/:id', async (req, res) => {
    try {
        // Method to determine if the user is searching a movie or a user
        let str = req.params.id;
        let result = str.slice(5);

        // If searching a specific movie
        if (req.params.id === `movie${result}`) {
            // An api fetch reques to get movies that match what the user searched
            apirequest = `${searchQueryDomain}?query=${result}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`
            const tmdbData = await fetch(apirequest)
            let fetchedData = await tmdbData.json()
            // We pull the first index as testing showed the first index will always be the most accurate match to what the user searched
            let movieUserWants = fetchedData.results[0].id
            // Finds the movie in our db that match the movie that was found based of the users search
            const movieData = await Movie.findAll({
                include: [
                    {
                        model: Review
                    }
                ],

            })
            // Searches in our data base if the move the user is searching already exists
            for (let i = 0; i < movieData.length; i++) {
                // If the movie does exists in our db render the page
                if (movieData[i].id == movieUserWants) {
                    const parsedMovieData = movieData.map((mv) => mv.get({ plain: true }));
                    dataToRender = parsedMovieData[i]
                    res.render('searchedMovie', { dataToRender })
                    return
                }
            }
            // If the movie doesnt exists, add it to oure db then render the page
            const newMovieData = await Movie.create({
                id: movieUserWants,
                name: fetchedData.results[0].title,
                release_date: fetchedData.results[0].release_date,
                poster: `https://image.tmdb.org/t/p/w500${fetchedData.results[0].poster_path}`
            });
            const parsedMovieData = newMovieData.map((mv) => mv.get({ plain: true }));
            res.render('searchedMovie', { parsedMovieData })
            // Parses the data and loads the searchedMovie page with the parsed data
            // Else the user is searching for a specific user
        } else {
            // Finds the specific user
            const userData = await User.findAll({
                where: { username: req.params.id },
                include: [
                    {
                        model: Review,
                        attributes: ['id', 'title', 'content', 'rating']
                    },
                    {
                        model: Movie,
                        through: UserFavorite,
                        attributes: ['id', 'name', 'release_date', 'poster'],
                        as: 'favorite'
                    },
                    {
                        model: Movie,
                        attributes: ['id', 'name', 'release_date', 'poster'],
                        through: UserWatchList,
                        as: 'watch_list'
                    }
                ],
            })
            const parsedUserData = userData.map((review) => review.get({ plain: true }));
            // Renders the 'searchedProfile page with parsed data of the found user
            if(parsedUserData.length == 1){
            res.render('searchedProfile', { parsedUserData })
            }
        }
        // Catch for errors
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// Exports the routes for use
module.exports = router;