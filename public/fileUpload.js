"use strict";

const storage = firebase.storage();
const storageRef = storage.ref();

const submitBtn = document.querySelector(".confirm-upload");
const fileInputEl = document.querySelector(".upload-img");
const navUserPfp = document.querySelector(".nav-user-pfp");
const profileUserPfp = document.querySelector(".profile-pfp");

submitBtn.addEventListener("click", function () {
  const user = firebase.auth().currentUser;
  const pfpRef = storageRef.child(`${user.uid}/image.jpg`);

  const file = fileInputEl.files[0];
  pfpRef.put(file).then((snapshot) => {
    console.log("Uploaded a blob or file!");

    const messageUserPfp = document.querySelectorAll(".user-pfp");

    pfpRef.getDownloadURL().then((url) => {
      navUserPfp.src = url;
      profileUserPfp.src = url;
      messageUserPfp.forEach(function (item) {
        item.src = url;
      });
    });
  });
});
