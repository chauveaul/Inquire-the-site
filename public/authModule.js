"use strict";

const signInEmailField = document.querySelector(".email-input-signin");
const signInPasswordField = document.querySelector(".password-input-signin");
const signInSubmitButton = document.querySelector(".Sign-in");

const signUpEmailField = document.querySelector(".email-input-signup");
const signUpPasswordField = document.querySelector(".password-input-signup");
const signUpPasswordRepeatField = document.querySelector(
  ".password-input-repeat-signup",
);
const signUpSubmitButton = document.querySelector(".sign-up");

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

signInSubmitButton.addEventListener("click", function (e) {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(
      signInEmailField.value,
      signInPasswordField.value,
    )
    .then((userCredential) => {
      var user = userCredential.user;
      console.log(`Logged in as: ${user}`);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(`Error Code: ${errorCode}\nError Message: ${errorMessage}`);
    });
});

signUpSubmitButton.addEventListener("click", function (e) {
  console.log(
    `email: ${signUpEmailField.value} \n password: ${signUpPasswordField.value}`,
  );
  e.preventDefault();
  if (signUpPasswordField.value !== signUpPasswordRepeatField.value) {
    console.warn("Passwords must be identical");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        signUpEmailField.value,
        signUpPasswordField.value,
      )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(`Logged in as ${user}`);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          `Error Code: ${errorCode} \nError Message: ${errorMessage}`,
        );
        // ..
      });
  }
});

auth.onAuthStateChanged(auth, (user) => {
  if (user) {
    // https://firebase.google.com/docs/reference/js/auth.user
    console.log(`Signed in as ${user.name}`);
    const uid = user.uid;
    console.log("Signing out");
    auth.signOut().then(function () {
      console.log("Signed out");
    });
  } else {
    // User is signed out
    // ...
  }
});
