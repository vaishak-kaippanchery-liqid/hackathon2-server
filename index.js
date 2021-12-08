const express = require("express");
const {saveData, getData} = require("./firebase/dataHandler.js");
const {getPopularMovies} = require("./tmdb/dataFetcher.js");

const app = express();
const PORT = 3000;

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

app.post(
    "/savedata/",
    (req, res) => saveData(req.body, (err, data) => {
        res.send(data);
    })
)
app.get(
    "/getdata/",
    (req, res) => getData(req.query, (err, data) => {
        res.send(data);
    })
)

//end point to fetch popular movies.
app.get(
    "/popular/",
    (req, res) => getPopularMovies(req.query, (err, data) => {
        res.send(data);
    })
)