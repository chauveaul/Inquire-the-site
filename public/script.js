"use strict";

const userInput = document.querySelector(".user-input");
const submitBtn = document.querySelector(".submit-btn");

const messageHistory = document.querySelector(".message-history");

const changeLink = document.querySelector(".change-link");
const newChat = document.querySelector(".new-chat");
const linkPopUp = document.querySelector(".popup");
const bgPopUp = document.querySelector(".background");
const btnChangeLink = document.querySelector(".btn--input");
const userLink = document.querySelector(".input-link");

const userPfp = document.querySelector(".nav-user-pfp");
const signInWithGoogleBtn = document.querySelector(".google-signin");

const timerEl = document.querySelector(".input-timer");

let link = "";
let timer = 10;

messageHistory.innerHTML = "";

userInput.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    e.preventDefault();
    submitBtn.click();
  }
});

submitBtn.addEventListener("click", function () {
  createNewUserMessage(userInput.value);
  userInput.value = "";
});

changeLink.addEventListener("click", function () {
  linkPopUp.classList.add("active");
  bgPopUp.classList.add("active");
});

bgPopUp.addEventListener("click", function () {
  linkPopUp.classList.remove("active");
  bgPopUp.classList.remove("active");
  document.querySelector(".login-window").classList.remove("active");

  if (timerEl.value) {
    timer = timerEl.value;
    console.log(timer);
  } else {
    timer = 10;
  }
});

document.onkeydown = function (event) {
  if (event.key === "Escape") {
    linkPopUp.classList.remove("active");
    bgPopUp.classList.remove("active");
    document.querySelector(".login-window").classList.remove("active");

    if (timerEl.value) {
      timer = timerEl.value;
      console.log(timer);
    } else {
      timer = 10;
    }
  }
};

btnChangeLink.addEventListener("click", function () {
  link = userLink.value;
  linkPopUp.classList.remove("active");
  bgPopUp.classList.remove("active");

  if (timerEl.value) {
    timer = timerEl.value;
    console.log(timer);
  } else {
    timer = 10;
  }
});

userLink.addEventListener("keypress", function (e) {
  if (e.code === "Enter") {
    e.preventDefault();
    btnChangeLink.click();
  }
});

newChat.addEventListener("click", function () {
  window.location.reload();
});

userPfp.addEventListener("click", function () {
  document.querySelector(".login-window").classList.add("active");
  document.querySelector(".background").classList.add("active");
});

// signInWithGoogleBtn.addEventListener("click", async function () {
//   console.log("Button clicked");
//   // await fetch("https://authfunc-6etpq3xqgq-uc.a.run.app");
//   await fetch("http://127.0.0.1:5001/inquire-the-site/us-central1/authFunc");
// });

function createNewUserMessage(userMessage) {
  if (userMessage !== "") {
    const userHtml = `<div class="message-box user-message-box">
    <img
      class="user-pfp"
      src="img/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
    />
    <p class="message user-message">
    ${userMessage}
    </p>
  </div>`;

    messageHistory.insertAdjacentHTML("beforeend", userHtml);
    messageHistory.scrollTop = messageHistory.scrollHeight;

    if (link !== "") {
      console.log(
        JSON.stringify({
          userMessage: userMessage,
          baseUrl: link,
          timer: timer,
        }),
      );
      console.log("Sending api request");
      // fetch("http://127.0.0.1:5001/inquire-the-site/us-central1/ai", {
      fetch("https://ai-6etpq3xqgq-uc.a.run.app", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userMessage,
          baseUrl: link,
          timer: timer,
        }),
      })
        .then((response) => response.json())
        .then((aiOutput) => createAIMessage(aiOutput.message));
    } else {
      createAIMessage(
        "You did not provide any link. Please change the link by clicking the change link button.",
      );
    }
  }
}

function createAIMessage(message) {
  const aiHtml = `
    <div class="message-box ai-message-box">
        <img
            class="ai-pfp"
            src="img/image.svg"
        />
        <div>
        <p class="message ai-message">
        ${message}
        </p>
        </div>
    </div>`;

  messageHistory.insertAdjacentHTML("beforeend", aiHtml);
  messageHistory.scrollTop = messageHistory.scrollHeight;
}

createAIMessage("How can I help you today?");
