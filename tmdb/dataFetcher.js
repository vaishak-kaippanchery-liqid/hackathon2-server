const fetch = require("node-fetch");
const apiKey = "2361134acb95c8313a04ad0c556e6cea";

const getPopularMovies = async ({language = "en-US", page = "1", region = "DE" } = {}, callback) =>{
    const popularMoviesURL = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${page}&region=${region}`;
    const popularMovieResponse = await fetch(popularMoviesURL);
    const popularMovieData = await popularMovieResponse.json();
    callback(null, popularMovieData);
} 

module.exports = {
    getPopularMovies
}