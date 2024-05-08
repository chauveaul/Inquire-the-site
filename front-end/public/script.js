"use strict";

const userInput = document.querySelector(".user-input");
const submitBtn = document.querySelector(".submit-btn");

const messageHistory = document.querySelector(".message-history");

console.log("Test from new javascript file");

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

function createNewUserMessage(message) {
  if (message !== "") {
    const userHtml = `<div class="message-box user-message-box">
    <img
      class="user-pfp"
      src="img/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
    />
    <p class="message user-message">
    ${message}
    </p>
  </div>`;

    messageHistory.insertAdjacentHTML("beforeend", userHtml);
    messageHistory.scrollTop = messageHistory.scrollHeight;

    console.log("Hi from the front end");
    getAIResponse(message);
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

function getAIResponse(userInput) {
  fetch("/api/openai", {
    method: "post",
    body: JSON.stringify({
      userInput: userInput,
    }),
  })
    // .then((response) => response.json())
    .then((aiOutput) => console.log(aiOutput));
}

fetch("/api/users")
  .then((response) => response.json())
  .then((users) => console.log(users));
