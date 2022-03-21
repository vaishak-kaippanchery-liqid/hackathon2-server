require("dotenv").config();
const express = require("express");
const {
  addToWatchlist,
  getWatchlist,
  deleteMovieFromWatchlist,
  searchUsers,
} = require("./firebase/controller.js");
const { getPopularMovies, searchMovies } = require("./movies/controller.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //parsing the JSON incoming request data.
app.listen(PORT, (err, _) => {
  if (err) console.log(err);
  else console.log("connected");
});

//Firebase routes
app.post("/watchlist/:username", addToWatchlist);
app.get("/watchlist/:username", getWatchlist);
app.get("/search/users/", searchUsers);
app.delete("/watchlist/:username/:movie_id", deleteMovieFromWatchlist);

//Movies routes
app.get("/popular-movies/", getPopularMovies);
app.get("/search/movies/", searchMovies);
