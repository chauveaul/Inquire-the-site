"use strict";

const storage = firebase.storage();
const storageRef = storage.ref();

const submitBtn = document.querySelector(".confirm-upload");
const fileInputEl = document.querySelector(".upload-img");

submitBtn.addEventListener("click", function () {
  const user = firebase.auth().currentUser;
  const pfpRef = storageRef.child(`${user.uid}/image.jpg`);

  const file = fileInputEl.files[0];
  pfpRef.put(file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
});
