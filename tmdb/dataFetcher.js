const fetch = require("node-fetch");
const apiKey = "2361134acb95c8313a04ad0c556e6cea";
const baseAPI_URL = "https://api.themoviedb.org/3/";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w185";

const getPopularMovies = async (request, response) => {
  const { language = "en-US", page = "1", region = "DE" } = request.query;
  const popularMoviesURL = `${baseAPI_URL}movie/popular?api_key=${apiKey}&language=${language}&page=${page}&region=${region}`;
  const popularMovieResponse = await fetch(popularMoviesURL);
  const popularMovieData = await popularMovieResponse.json();

  const newResponse = popularMovieData.results.map(
    ({ id, original_title, poster_path, release_date }) => {
      return {
        id,
        title: original_title,
        poster_path: BASE_IMAGE_URL + poster_path,
        release_date,
      };
    }
  );

  response.send(newResponse);
};

const searchMovies = async (request, response) => {
  const {
    language = "en-US",
    page = "1",
    region = "DE",
    query,
  } = request.query;

  if (!query) {
    response.send({ error: "Query param must be provided." });
  }

  const searchMoviesURL = `${baseAPI_URL}search/movie/?api_key=${apiKey}&language=${language}&page=${page}&region=${region}&query=${query}`;
  const searchMoviesResponse = await fetch(searchMoviesURL);
  const searchMoviesData = await searchMoviesResponse.json();

  const newResponse = searchMoviesData.results.map(
    ({ id, original_title, poster_path, release_date }) => {
      return {
        id,
        title: original_title,
        poster_path: BASE_IMAGE_URL + poster_path,
        release_date,
      };
    }
  );

  response.send(newResponse);
};

module.exports = {
  getPopularMovies,
  searchMovies,
};
