const app = require("./connection.js");
const { getDatabase, ref, child, set, get } = require("firebase/database");
const database = getDatabase(app);
const dbRef = ref(database);

const addToWatchlist = (request, response) => {
  const { id, title, poster_path, release_date } = request.body;

  set(ref(database, `${request.url}/${id}`), {
    title,
    poster_path,
    release_date,
  });

  responseData = {
    statuscode: 200,
    message: "Movie added to watchlist successfully!",
  };

  response.send(responseData);
};

const getData = (request, response) => {
  const username = request.query.username;
  let responseData = null;

  get(child(dbRef, `watchlist/${username}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        responseData = {
          statuscode: 200,
          message: `User ${username} found successfully!`,
        };
      } else {
        responseData = {
          statuscode: 404,
          message: `User ${username} does not exist.`,
        };
      }

      response.send(responseData);
    })
    .catch((error) => {
      console.error(error);
      responseData = {
        statuscode: 500,
        message: "Internal server error - Not able to fetch the user data",
      };

      response.send(responseData);
    });
};

module.exports = {
  addToWatchlist,
  getData,
};
