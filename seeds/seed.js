const { User, Review, Movie, UserMovie, UserFavorite, UserWatchList } = require("../models");
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
  },
  {
    username: "JasonD",
    email: "jason1094dang@gmail.com",
    password: "JasonDang"
  },
  {
    username: "JamesTheEpic",
    email: "housejames14@gmail.com",
    password: "eightlong"
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
  {
    id: 19995,
    name: "Avatar",
    release_date: "2009-12-15",
    poster: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg"
  },
  {
    id: 313369,
    name: "La La Land",
    release_date: "2016-11-29",
    poster: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"
  },
  {
    id: 13,
    name: "Forrest Gump",
    release_date: "1994-06-23",
    poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg"
  },
  {
    id: 9737,
    name: "Bad Boys",
    release_date: "1995-04-07",
    poster: "https://image.tmdb.org/t/p/w500/qKiLKvJaT6rRmd3IBsoVV58luXH.jpg"
  },
  {
    id: 1124,
    name: "The Prestige",
    release_date: "2006-10-19",
    poster: "https://image.tmdb.org/t/p/w500/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg"
  },
  {
    id: 398818,
    name: "Call Me by Your Name",
    release_date: "2017-09-01",
    poster: "https://image.tmdb.org/t/p/w500/mZ4gBdfkhP9tvLH1DO4m4HYtiyi.jpg"
  },
  {
    id: 11008,
    name: "Major Payne",
    release_date: "1995-03-24",
    poster: "https://image.tmdb.org/t/p/w500/kWHx5eq7PELkF3If7LrrhuBskRG.jpg"
  },
  {
    id: 49009,
    name: "The Way Back",
    release_date: "2010-11-22",
    poster: "https://image.tmdb.org/t/p/w500/6imc5u5H1RASjWPOQ923VFzIo6E.jpg"
  },
  {
    id: 11104,
    name: "Chungking Express",
    release_date: "1994-07-14",
    poster: "https://image.tmdb.org/t/p/w500/43I9DcNoCzpyzK8JCkJYpHqHqGG.jpg"
  },
  {
    id: 653346,
    name: "Kingdom of the Planet of the Apes",
    release_date: "2024-05-08",
    poster: "https://image.tmdb.org/t/p/w500/fAjyUDKABSehK6pHWvh9ket5X3z.jpg"
  },
];

const userFavoriteSeeds = [
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
  {
    movie_id: 19995,
    user_id: 3,
  },
  {
    movie_id: 13,
    user_id: 3,
  },
  {
    movie_id: 9737,
    user_id: 3,
  },
  {
    movie_id: 313369,
    user_id: 4,
  },
  {
    movie_id: 1124,
    user_id: 4,
  },
  {
    movie_id: 398818,
    user_id: 4,
  },
]

const userWatchListSeeds = [
  {
    movie_id: 823464,
    user_id: 1,
  },
  {
    movie_id: 653346,
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
  {
    movie_id: 693134,
    user_id: 3,
  },
  {
    movie_id: 11008,
    user_id: 3,
  },
  {
    movie_id: 823464,
    user_id: 3,
  },
  {
    movie_id: 693134,
    user_id: 4,
  },
  {
    movie_id: 49009,
    user_id: 4,
  },
  {
    movie_id: 11104,
    user_id: 4,
  },

]
const reviewSeeds = [
  {
    title: "La La Land: The Magic of Music and Cinema Collide",
    content: "La La Land is a great take on the musical/romance genre. I went into this movie as a 16 year old and was completely taken aback by how much I enjoyed the music and by how much the movie affected me. If musicals aren't your thing I'd still heavily recommend watching this for the great chemistry between Ryan Gosling and Emma stone as well as the breathtaking score.",
    rating: 5,
    user_id: 4,
    movie_id: 313369
  },
  {
    title: "Avatar: Where CGI Animals Have More Personality Than Some Real People",
    content: "Great Movie overall! It has a soft spot in my heat since I was a child and the world building was what left the strongest impact on me when I first watched. Along with the cool creatures and acting made it one of my favorite movies of all time.",
    rating: 5,
    user_id: 3,
    movie_id: 19995 
  },
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

    const userData = await User.bulkCreate(userSeeds, { individualHooks: true, });
    // const userData = await User.bulkCreate(userSeeds)
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