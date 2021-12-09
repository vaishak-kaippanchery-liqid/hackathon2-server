const express = require("express");
const { addToWatchlist, getWatchlist } = require("./firebase/dataHandler.js");
const { getPopularMovies } = require("./tmdb/dataFetcher.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //parsing the JSON incoming request data.
app.listen(PORT, (err, _) => {
  if (err) console.log(err);
  else console.log("connected");
});

//Firebase operations
app.post("/watchlist/:username", addToWatchlist);
app.get("/watchlist/:username", getWatchlist);

//end point to fetch popular movies.
app.get("/popular-movies/", getPopularMovies);
