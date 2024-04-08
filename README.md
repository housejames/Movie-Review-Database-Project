# Reel Radar Reviews

 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Description

Often in our boot-camp class we would chat, and discuss various movies. This gave us the idea for our project to make a database of reviews using everything we have learned. We wanted the ability to write a review on any movie, and have posters, and data implemented with each review. We set about to create this community project that can be used to share our thoughts and opinions on various movies we have seen.

## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Features](#features)
- [Questions](#questions)

## Installation
These steps are for if a user wishes to download the repo and run the application on their own local server.

*Note 'postgres' and 'password' are the default PostgresSQL username and password, if the user has a different username or password, then the 'postgres' and 'password' in step 3 must be adjusted accordingly. Additionally, the user must set the values in their ``.env`` file, in step 2..

1. Download, copy, or clone the code to your local machine through GitHub and open in VSCode, or another appropriate IDE. 

2. The user must setup a .env file with the following:

    ```DB_NAME='moviereview_db'```

    ```DB_USER="postgres"```

    ```DB_PASSWORD="password"```

   ``` API_KEY = ""```

   ```API_SEARCH_DOMAIN = ""```

   ```API_RELEASE_DOMAIN = ""```

   *A TMBD API key can be obtained from: https://developer.themoviedb.org/.
   Additionally both domain keys can be found here: https://developer.themoviedb.org/reference/intro/getting-started under "Now Playing", and "SEARCH: Movie", respectively.

3. Right click on 'server.js' and select 'Open In Integrated Terminal', then run the command ```npm install``` to install all required node files. 

4. The user must then launch Postgres by running the command: ```psql -U postgres```, in the terminal then running the command: ```password```. 

5. Continue in the terminal by running the command: ```\i db/schema.sql```, to initialize their database, then run the command: ```\q```, to exit PostresSQL.

6. Once out of Postgres the user can run the command: ```npm start```, to launch the application.

## Usage

Application link: https://reel-radar.onrender.com/

Once inside the webpage, the User can create and account, or if they already have an account, they can login. 

![Image of the top of the homepage](public\images\homepage.JPG)

The main functionality of our webpage is writing a review which can be accessed by clicking the "write a review" button, where the user will be brought to a new page where they can select a movie, and write a review about it. 

![image of the write a review page](public\images\writeeview.JPG)

Once submitted The review will appear on the homepage, profile, and search results. 

![image of the reviews on the homepage](public\images\reviews.JPG)

If clicking the profile button in the top right, the user will be taken to their individual profile, where they can edit a list of their favorite movies, and watch-list movies. Additionally, the user can edit their personal information, and reviews. 

![image of the profile page](public\images\profile.JPG)

Clicking the home button in the top right, takes the user back to the homepage. At the bottom of the homepage the user can search for movies, or users. 
The searched movie page will show the poster and name of the searched movie, and any associated reviews.

![image of the searched movie page](public\images\searchedmovie.JPG)

The search user page will show a users profile sans their personal information and has no options to edit

## Credits

Application developers:

* <a href="https://github.com/jasondang4"> Jason Dang </a>

* <a href="https://github.com/SamuelFullerCA"> Samuel Fuller </a>

* <a href="https://github.com/housejames"> James House </a>

* <a href="https://github.com/DaveSalterM"> David Salter </a>

Movie API data: https://www.themoviedb.org/

Select UI elements from: https://uiverse.io/

Header Style from: https://codepen.io/


## Features

This application boasts the integration of a PostgressSQL databases into JavaScript, through the use of Seqelize. Additionally, this application features the ability to perform a variety of POST, GET, PUT and DELETE requests to multiple tables and models within our database. We have also integrated TMDB API on the back-end of this application to synchronize with our own database. We also implemented emai.js to send sign-up emails to new users.

## Questions

Any questions please reach-out to any of our e-mails at: 

* samuelfullerca@gmail.com
* housejames14@gmail.com
* jason1094dang@gmail.com
* davesalter1988@gmail.com

