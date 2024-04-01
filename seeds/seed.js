const { User, Review } = require("../models");
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
      user_id: 1
    },
    {
      title: "Denis has Dune it again!",
      content: "Dune 2 is a god-teir movie!",
      user_id: 1
    },
  ];

  const seedme = async () => {
    try {
      await sequelize.sync({ force: true });
      const userData = await User.bulkCreate(userSeeds, {
        individualHooks: true,
      });
      const reviewData = await Review.bulkCreate(reviewSeeds);
      const users = userData.map((usr) => usr.toJSON());
      const reviews = reviewData.map((rev) => rev.toJSON());
      console.table(users);
      console.table(reviews);
      process.exit(0);
    } catch (error) {
      console.log(error);
    }
  };
  
  seedme();