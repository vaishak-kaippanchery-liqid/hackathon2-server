const app = require("./connection.js");
const {getDatabase, ref, set } = require("firebase/database");
const database = getDatabase(app); 

module.exports = {
    saveData : (req, callback) => {
        let username = req.username;
        set(ref(database, "users/"+username),{
            name:req.username,
            email: req.email
        })
        callback(null, {"statuscode":200, "message": "Inserted Successfully"})
    }
}