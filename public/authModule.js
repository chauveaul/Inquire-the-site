"use strict";

const userPfp = document.querySelector(".nav-user-pfp");

const selectSignIn = document.querySelector(".select-signin");
const selectSignUp = document.querySelector(".select-signup");
const loginHeader = document.querySelector(".login-header");
const repeatPassword = document.querySelector(".repeat-password");

const signUpForm = document.querySelector(".signup-form");
const signInForm = document.querySelector(".signin-form");
const loginWindow = document.querySelector(".login-window");

const signInEmailField = document.querySelector(".email-input-signin");
const signInPasswordField = document.querySelector(".password-input-signin");
const signInSubmitButton = document.querySelector(".Sign-in");

const signUpEmailField = document.querySelector(".email-input-signup");
const signUpPasswordField = document.querySelector(".password-input-signup");
const signUpPasswordRepeatField = document.querySelector(
  ".password-input-repeat-signup",
);
const signUpSubmitButton = document.querySelector(".sign-up");

const bgPopUp = document.querySelector(".background");

const profileName = document.querySelector(".read-user-name");
const profileEmail = document.querySelector(".read-user-email");

const signOutBtn = document.querySelector(".sign-out");

let user;

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

userPfp.addEventListener("click", function () {
  if (!document.querySelector(".user-profile").classList.contains("hidden"))
    document.querySelector(".user-profile").classList.add("hidden");
  else if (user) {
    document.querySelector(".user-profile").classList.remove("hidden");
  } else {
    document.querySelector(".login-window").classList.add("active");
    document.querySelector(".background").classList.add("active");
  }
});

selectSignIn.addEventListener("click", function () {
  selectSignIn.classList.add("active");
  selectSignUp.classList.remove("active");
  signInForm.classList.remove("hidden");
  signUpForm.classList.add("hidden");
  loginHeader.innerHTML = "Login";
  repeatPassword.classList.add("hidden");
  loginWindow.style.height = "40rem";
});

selectSignUp.addEventListener("click", function () {
  selectSignIn.classList.remove("active");
  selectSignUp.classList.add("active");
  signInForm.classList.add("hidden");
  signUpForm.classList.remove("hidden");
  loginHeader.innerHTML = "Sign Up";
  repeatPassword.classList.remove("hidden");
  loginWindow.style.height = "48rem";
});

signInSubmitButton.addEventListener("click", function (e) {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(
      signInEmailField.value,
      signInPasswordField.value,
    )
    .then((userCredential) => {
      console.log(user);
      user = userCredential.user;
      console.log(user);
      console.log(`Logged in as: ${user}`);
      bgPopUp.click();

      profileName.value = user.displayName;
      profileEmail.value = user.email;
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
        user = userCredential.user;
        console.log(`Logged in as ${user}`);
        bgPopUp.click();

        const currUser = firebase.auth().currentUser;

        currUser
          .updateProfile({
            displayName: signUpEmailField.value.slice(
              0,
              signUpEmailField.value.indexOf("@"),
            ),
          })
          .then(() => {
            console.log("Set display name");
            user = firebase.auth().currentUser;

            profileName.value = user.displayName;
            profileEmail.value = user.email;
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          `Error Code: ${errorCode} \nError Message: ${errorMessage}`,
        );
      });
  }
});

signOutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Signed out");
      user = undefined;
      document.querySelector(".user-profile").classList.add("hidden");

      signInEmailField.value = "";
      signInPasswordField.value = "";

      signUpEmailField.value = "";
      signUpPasswordField.value = "";
      signUpPasswordRepeatField.value = "";
    })
    .catch((error) => {
      console.log(error);
    });
});
