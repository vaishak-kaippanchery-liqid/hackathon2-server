const express = require("express");
const {saveData} = require("./firebase/setData.js");

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