"use strict";

firebase.initializeApp({
  apiKey: "AIzaSyAjgCealkLcvoWS7GTJGYNLSgFPSg3F9wI",
  authDomain: "inquire-the-site.firebaseapp.com",
  projectId: "inquire-the-site",
  storageBucket: "inquire-the-site.appspot.com",
  messagingSenderId: "821476119024",
  appId: "1:821476119024:web:0d9abb0374230d8dbb0d35",
  measurementId: "G-RQ8QY3B798",
});

const auth = firebase.auth();

const googleSignInBtn = document.querySelector(".google-signin");
const provider = new firebase.auth.GoogleAuthProvider();

googleSignInBtn.addEventListener("click", function () {
  auth.signInWithPopup(provider);
});
