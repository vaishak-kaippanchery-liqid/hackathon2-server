const express = require("express");
const {saveData, getData} = require("./firebase/dataHandler.js");
const {getPopularMovies} = require("./tmdb/dataFetcher.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //parsing the JSON incoming request data.
app.listen(
    PORT,
    (err, data) => {
        if(err) 
            console.log(err);
        else 
            console.log("connected")
    }
)

app.post("/savedata/", saveData);
app.get("/getdata/", getData);

//end point to fetch popular movies.
app.get("/popular/", getPopularMovies);