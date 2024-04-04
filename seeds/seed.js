const { User, Review, Movie, UserMovie, UserFavorite, UserWatchList} = require("../models");
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
      title: "War For The Planet of the Kongs",
      content: "First and foremost, WarnerBrothers Monstervers gets better with each movie, from 2016s Godzilla to this movie, I see nothing but immense progress, and acknowledgement for what the fans desire. So what is it the fans desire? giant monkeys, giant liards, and destruction! Godzilla X Kong delivers tenfold on the monsters and action, while still fitting in some human narrative. Speaking of the human narrative, it serves only to get the movie from one big cgi fight, to the next, and thats exactly what the human narrative should do! My only complaint after wathcing is it should have been called Kong x Godzilla: A New Empire, and anyone that watches the move would understand why.",
      rating: 4,
      user_id: 1,
    },
    {
      title: "Denis has Dune it again!",
      content: "This movie is literally the Lisan al Gaib of movies! Denis is able to deliver his usual stunning cinematography with the majority of the movie being in a desert! Maybe George Lucas saw Dune: Part 2 he directed A New Hope he could have taken many pointers from Denis. Everything from the acting to the visals is top-quality. It's hard to believe that this movie has a smaller budget that the average marvel movie and, by my standards, is better than any Marvel movie wishes it could be. Overall Dune: Part 2 is going into my list of all-time favorites.  ",
      rating: 5,
      user_id: 1,
    },
  ];

  const userFavoriteSeeds= [
    {
      movie_id: 693134,
      user_id: 1,
    },
  ]

  const userWatchListSeeds= [
    {
      movie_id: 823464,
      user_id: 1,
    },
  ]

  const movieSeeds = [
    {
      id: 823464,
      name: "Godzilla x Kong: The New Empire",
      release_date: "2024-03-27",
      poster: "https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLv7WvFPpKLZkyk.jpg"

    },
    {
      id: 693134,
      name: "Dune: Part Two",
      release_date: "2024-02-27",
      poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"
    },
  ];

  const userMovieSeeds = [
    {
      movie_id: 823464,
      review_id: 1,
    },
    {
      movie_id: 693134,
      review_id: 2,
    },
  ]

  const seedme = async () => {
    try {
      await sequelize.sync({ force: true });

      const userData = await User.bulkCreate(userSeeds, {individualHooks: true,});
      const reviewData = await Review.bulkCreate(reviewSeeds);
      const movieData = await Movie.bulkCreate(movieSeeds);
      const userMovieData = await UserMovie.bulkCreate(userMovieSeeds);
      const userFavoriteData = await UserFavorite.bulkCreate(userFavoriteSeeds);
      const userWatchListData = await UserWatchList.bulkCreate(userWatchListSeeds);

      const users = userData.map((usr) => usr.toJSON());
      const movies = movieData.map((mov) => mov.toJSON());
      const userMovie = userMovieData.map((usmv) => usmv.toJSON());
      const reviews = reviewData.map((rev) => rev.toJSON());
      const favorite = userFavoriteData.map((fav) => fav.toJSON());
      const watchList = userWatchListData.map((wtch) => wtch.toJSON());

      console.table(users);
      console.table(reviews);
      console.table(movies);
      console.table(userMovie);
      console.table(favorite);
      console.table(watchList);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  };
  
  seedme();