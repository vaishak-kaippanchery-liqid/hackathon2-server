const app = require("./connection.js");
const {getDatabase, ref, child, set, get } = require("firebase/database");
const database = getDatabase(app); 
const dbRef = ref(database);

module.exports = {
    saveData : (req, callback) => {
        let username = req.username;
        set(ref(database, "users/"+username),{
            name:req.username,
            email: req.email
        })
        callback(null, {"statuscode":200, "message": "Inserted Successfully"})
    },
    getData : (queryParam, callback) => {
        let username = queryParam.username;
        get(child(dbRef, `users/${username}`)).then((snapshot) => {
            if (snapshot.exists()) {
              const userdata = snapshot.val();
              callback(null, {"statuscode":200, "message": `User ${username} found Successfully with email : ${userdata.email}`})
            } else {
                callback(null, {"statuscode":404, "message": `User ${username} does not exist.`})
            }
          }).catch((error) => {
            console.error(error);
            callback("Error in fetching data");
          });
    }
}