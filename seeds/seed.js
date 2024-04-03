const { User, Review, Movie, UserMovie} = require("../models");
const sequelize = require("../config/connection")

const userSeeds = [
    {
      username: "SamuelRox",  
      email: "samuelfullerca@gmail.com",
      password: "eightlong"
    },
  ];

  const reviewSeeds = [
    {
      title: "The real War for the planet of the apes",
      content: "Godzilla x King, was amazing, the cgi for all the apes was top notch! ",
      user_id: 1,
    },
    {
      title: "Denis has Dune it again!",
      content: "Dune 2 is a god-teir movie!",
      user_id: 1,
    },
  ];

  
  const movieSeeds = [
    {
      id: "movie1",
      name: "Godzilla x Kong"
    },
    {
      id: "movie2",
      name: "Dune 2"
    },
  ];

  const userMovieSeeds = [
    {
      movie_id: "movie1",
      review_id: 1,
    },
    {
      movie_id: "movie2",
      review_id: 2,
    },
  ]

  const seedme = async () => {
    try {
      await sequelize.sync({ force: true });
      const userData = await User.bulkCreate(userSeeds, {
        individualHooks: true,
      });
      const reviewData = await Review.bulkCreate(reviewSeeds);
      const movieData = await Movie.bulkCreate(movieSeeds);
      const userMovieData = await UserMovie.bulkCreate(userMovieSeeds);
      const users = userData.map((usr) => usr.toJSON());
      const movies = movieData.map((mov) => mov.toJSON());
      const userMovie = userMovieData.map((usmv) => usmv.toJSON());
      const reviews = reviewData.map((rev) => rev.toJSON());
      console.table(users);
      console.table(reviews);
      console.table(movies);
      console.table(userMovie);
      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  };
  
  seedme();