const fetch = require("node-fetch");
const apiKey = "2361134acb95c8313a04ad0c556e6cea";
const baseAPI_URL ="https://api.themoviedb.org/3/"
let configuration;

const fetchMovieDBConfig = async () => {
    const configURL = `${baseAPI_URL}configuration?api_key=${apiKey}`
    const configResponse = await fetch(configURL);
    configuration = await configResponse.json();
}

const getPopularMovies = async (request, response) => {
    console.log(configuration);
    const {language = "en-US", page = "1", region = "DE" } = request.query;
    const popularMoviesURL = `${baseAPI_URL}movie/popular?api_key=${apiKey}&language=${language}&page=${page}&region=${region}`;
    const popularMovieResponse = await fetch(popularMoviesURL);
    const popularMovieData = await popularMovieResponse.json();

    response.send(popularMovieData);
}

module.exports = {
    fetchMovieDBConfig,
    getPopularMovies
}