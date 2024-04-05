const { User, Review, Movie, UserMovie, UserFavorite, UserWatchList} = require("../models");
const sequelize = require("../config/connection")

const userSeeds = [
    {
      username: "SamuelRox",  
      email: "samuelfullerca@gmail.com",
      password: "eightlong"
    },
    {
      username: "SaltyDave",  
      email: "dave@dave.com",
      password: "Movies123"
    }
  ];

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
    {
      id: 926,
      name: "Galaxy Quest",
      release_date: "1999-12-25",
      poster: "https://image.tmdb.org/t/p/w500/fZXSwgZknp81vmciTb86rw0MejV.jpg"
    },
    {
      id: 9340,
      name: "The Goonies",
      release_date: "1985-06-07",
      poster: "https://image.tmdb.org/t/p/w500/eBU7gCjTCj9n2LTxvCSIXXOvHkD.jpg"
    },
    {
      id: 329,
      name: "Jurassic Park",
      release_date: "1993-06-11",
      poster: "https://image.tmdb.org/t/p/w500/b1xCNnyrPebIc7EWNZIa6jhb1Ww.jpg"
    },
    {
      id: 533535,
      name: "Deadpool & Wolverine",
      release_date: "2024-07-24",
      poster: "https://image.tmdb.org/t/p/w500/uxBHXaoOvAwy4NpPpP7nNx2rXYQ.jpg"
    },
    {
      id: 365177,
      name: "Borderlands",
      release_date: "2024-08-07",
      poster: "https://image.tmdb.org/t/p/w500/865DntZzOdX6rLMd405R0nFkLmL.jpg"
    },
    {
      id: 1011985,
      name: "Kung Fu Panda 4",
      release_date: "2024-03-02",
      poster: "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg"
    },
    
  ];

  const userFavoriteSeeds= [
    {
      movie_id: 693134,
      user_id: 1,
    },
    {
      movie_id: 926,
      user_id: 2,
    },
    {
      movie_id: 9340,
      user_id: 2,
    },
    {
      movie_id: 329,
      user_id: 2,
    },
  ]

  const userWatchListSeeds= [
    {
      movie_id: 823464,
      user_id: 1,
    },
    {
      movie_id: 1011985,
      user_id: 1,
    },
    {
      movie_id: 1011985,
      user_id: 2,
    },
    {
      movie_id: 365177,
      user_id: 2,
    },
    {
      movie_id: 533535,
      user_id: 2,
    },

  ]
  const reviewSeeds = [
    {
      title: "War For The Planet of the Kongs",
      content: "First and foremost, WarnerBrothers Monstervers gets better with each movie, from 2016s Godzilla to this movie, I see nothing but immense progress, and acknowledgement for what the fans desire. So what is it the fans desire? giant monkeys, giant liards, and destruction! Godzilla X Kong delivers tenfold on the monsters and action, while still fitting in some human narrative. Speaking of the human narrative, it serves only to get the movie from one big cgi fight, to the next, and thats exactly what the human narrative should do! My only complaint after wathcing is it should have been called Kong x Godzilla: A New Empire, and anyone that watches the move would understand why.",
      rating: 4,
      user_id: 1,
      movie_id: 823464
    },
    {
      title: "Denis has Dune it again!",
      content: "This movie is literally the Lisan al Gaib of movies! Denis is able to deliver his usual stunning cinematography with the majority of the movie being in a desert! Maybe George Lucas saw Dune: Part 2 he directed A New Hope he could have taken many pointers from Denis. Everything from the acting to the visals is top-quality. It's hard to believe that this movie has a smaller budget that the average marvel movie and, by my standards, is better than any Marvel movie wishes it could be. Overall Dune: Part 2 is going into my list of all-time favorites.  ",
      rating: 5,
      user_id: 1,
      movie_id: 693134
    },
    {
      title: "In Space, No One Can Hear You Laugh: A Galaxy Quest Review",
      content: "An epic cast of 90's all stars, this movie brings loads of action, adventure, and comedy together in this fun, family-friendly movie. Galaxy Quest has become a cult classic and is referred to as one of the greatest Star Trek movies of all time for good reason. Never give up, never surrender!",
      rating: 5,
      user_id: 2,
      movie_id: 926
    },
  ];

  const seedme = async () => {
    try {
      await sequelize.sync({ force: true });

      const userData = await User.bulkCreate(userSeeds, {individualHooks: true,});
      const movieData = await Movie.bulkCreate(movieSeeds);
      const reviewData = await Review.bulkCreate(reviewSeeds);
      const userFavoriteData = await UserFavorite.bulkCreate(userFavoriteSeeds);
      const userWatchListData = await UserWatchList.bulkCreate(userWatchListSeeds);

      const users = userData.map((usr) => usr.toJSON());
      const movies = movieData.map((mov) => mov.toJSON());
      const reviews = reviewData.map((rev) => rev.toJSON());
      const favorite = userFavoriteData.map((fav) => fav.toJSON());
      const watchList = userWatchListData.map((wtch) => wtch.toJSON());

      console.table(users);
      console.table(reviews);
      console.table(movies);
      console.table(favorite);
      console.table(watchList);

      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  };
  
  seedme();