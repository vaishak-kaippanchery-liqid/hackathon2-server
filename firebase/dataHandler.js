const app = require("./connection.js");
const { getDatabase, ref, child, set, get } = require("firebase/database");
const database = getDatabase(app);
const dbRef = ref(database);

const saveData = (request, response) => {

  const {username, email}  = request.body;
  set(ref(database, "users/" + username), {
    name: username,
    email: email,
  });
  
  responseData = {
    statuscode: 200, 
    message: "User Data Inserted Successfully"
  }

  response.send(responseData);
};

const getData = (request, response) => {
  const username = request.query.username;
  let responseData = null;

  get(child(dbRef, `users/${username}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userdata = snapshot.val();
        responseData =  {
          statuscode: 200,
          message: `User ${username} found Successfully with email : ${userdata.email}`,
        };

      } else {
        responseData =  {
          statuscode: 404,
          message: `User ${username} does not exist.`,
        };
      }

      response.send(responseData);
    })
    .catch((error) => {
      console.error(error);
      responseData = {
          statuscode: 500,
          message: "Internal server error - Not able to fetch the user data"
      }

      response.send(responseData);
    });
};

module.exports = {
  saveData,
  getData,
};
