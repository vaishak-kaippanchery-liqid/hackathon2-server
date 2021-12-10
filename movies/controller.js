const { async } = require("@firebase/util");
const fetch = require("node-fetch");
const apiKey = process.env.TMDB_API_KEY;
const baseAPI_URL = "https://api.themoviedb.org/3/";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w185";

const getPopularMovies = async (request, response) => {
  const { language = "en-US", page = "1", region = "DE" } = request.query;
  const popularMoviesURL = `${baseAPI_URL}movie/popular?api_key=${apiKey}&language=${language}&page=${page}&region=${region}`;
  let responseData;
  fetch(popularMoviesURL)
    .then(async (popularMovieResponse) => {
      const popularMovieData = await popularMovieResponse.json();

      if (!popularMovieData.results) {
        responseData = {
          statuscode: 404,
          message: "No popular movies were found",
          data: [],
        };
      } else {
        const parsedData = popularMovieData.results.map(
          ({ id, original_title, poster_path, release_date }) => {
            return {
              id,
              title: original_title,
              poster_path: BASE_IMAGE_URL + poster_path,
              release_date,
            };
          }
        );

        responseData = {
          statuscode: 200,
          message: "Popular movies fetched successfully!",
          data: parsedData,
        };
      }

      response.send(responseData);
    })
    .catch((error) => {
      console.error(error);
      responseData = {
        statuscode: 500,
        message: error.message,
      };

      response.send(responseData);
    });
};

const searchMovies = async (request, response) => {
  const {
    language = "en-US",
    page = "1",
    region = "DE",
    query,
  } = request.query;
  let responseData;

  if (!query) {
    responseData = {
      statuscode: 400,
      message: "Query param must be provided.",
      data: [],
    };

    response.send(responseData);
  } else {
    const searchMoviesURL = `${baseAPI_URL}search/movie/?api_key=${apiKey}&language=${language}&page=${page}&region=${region}&query=${query}`;
    fetch(searchMoviesURL)
      .then(async (searchMoviesResponse) => {
        const searchMoviesData = await searchMoviesResponse.json();

        if (!searchMoviesData.results) {
          responseData = {
            statuscode: 404,
            message: "No movies were found",
            data: [],
          };

          response.send(responseData);
        } else {
          const parsedData = searchMoviesData.results.map(
            ({ id, original_title, poster_path, release_date }) => {
              return {
                id,
                title: original_title,
                poster_path: BASE_IMAGE_URL + poster_path,
                release_date,
              };
            }
          );

          responseData = {
            statuscode: 200,
            message: "Movies found successfully!",
            data: parsedData,
          };

          response.send(responseData);
        }
      })
      .catch((error) => {
        console.error(error);
        responseData = {
          statuscode: 500,
          message: error.message,
        };

        response.send(responseData);
      });
  }
};

module.exports = {
  getPopularMovies,
  searchMovies,
};
