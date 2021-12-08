const express = require("express");
const app = express();
const PORT = 3000;

app.listen(
    PORT,
    (err, data) => {
        if(err) 
            console.log(err);
        else 
            console.log("connected")
    }
)

