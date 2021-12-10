const firebase = require("firebase/app");
// Our web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "hackathon2-server.firebaseapp.com",
  projectId: "hackathon2-server",
  storageBucket: "hackathon2-server.appspot.com",
  messagingSenderId: "550673882565",
  appId: "1:550673882565:web:81660c77346fea99537fac",
  databaseURL:
    "https://hackathon2-server-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
module.exports = app;
