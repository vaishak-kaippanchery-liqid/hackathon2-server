const app = require("./connection.js");
const {
  getDatabase,
  ref,
  child,
  set,
  get,
  remove,
} = require("firebase/database");
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

const getWatchlist = (request, response) => {
  let responseData = null;
  get(child(dbRef, `${request.url}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        responseData = {
          statuscode: 200,
          message: `Record found successfully for ${request.params.username}!`,
          data: snapshot.val(),
        };
      } else {
        responseData = {
          statuscode: 404,
          message: `Record does not exist for ${request.params.username}.`,
          data: [],
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

const deleteMovieFromWatchlist = (request, response) => {
  let responseData = null;

  get(child(dbRef, `${request.url}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        responseData = {
          statuscode: 200,
          message: `Record successfully deleted!`,
        };

        remove(child(dbRef, `${request.url}`));
      } else {
        responseData = {
          statuscode: 404,
          message: `Record does not exist.`,
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
  getWatchlist,
  deleteMovieFromWatchlist,
};
