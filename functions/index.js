const firebase = require("firebase-admin");
const functions = require("firebase-functions");
firebase.initializeApp({
  apiKey: "AIzaSyBC_xeeS-0GBBgX1v7SRFYCffajTMS6INc",
  authDomain: "payroll-manager-e2a68.firebaseapp.com",
  databaseURL: "https://payroll-manager-e2a68.firebaseio.com",
  projectId: "payroll-manager-e2a68",
  storageBucket: "payroll-manager-e2a68.appspot.com",
  messagingSenderId: "912247135378",
  appId: "1:912247135378:web:3f214bcfea8efdbebd1a4b",
  measurementId: "G-C4S4B6TLQE"
});

const db = firebase.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.accountCreate = functions.auth.user().onCreate(user => {
  const userDoc = {
    email: user.data.email,
    displayName: user.data.displayName
  };
  db.collection("users")
    .doc(user.data.uid)
    .set(userDoc)
    .catch(err => {
      console.log(err);
    });
});
