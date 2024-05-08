"use strict";

const userInput = document.querySelector(".user-input");
const submitBtn = document.querySelector(".submit-btn");

const messageHistory = document.querySelector(".message-history");

const changeLink = document.querySelector(".change-link");
const linkPopUp = document.querySelector(".popup");
const bgPopUp = document.querySelector(".background");
const btnChangeLink = document.querySelector(".btn--input");

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
});

document.onkeydown = function (event) {
  if (event.key === "Escape") {
    linkPopUp.classList.remove("active");
    bgPopUp.classList.remove("active");
  }
};

btnChangeLink.addEventListener("click", function () {
  //Send new link to crawler
  linkPopUp.classList.remove("active");
  bgPopUp.classList.remove("active");
});

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

    fetch("/api/ai", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userMessage: userMessage,
      }),
    })
      .then((response) => response.json())
      .then((aiOutput) => createAIMessage(aiOutput.message));
  }
}

function createAIMessage(message) {
  const aiHtml = `
    <div class="message-box ai-message-box">
        <img
            class="ai-pfp"
            src="img/chatgpt-green-circular-logo-22057.svg"
        />
        <p class="message ai-message">
        ${message}
        </p>
    </div>`;

  messageHistory.insertAdjacentHTML("beforeend", aiHtml);
}

createAIMessage("How can I help you today?");

function getAIResponse(userInput) {}
