"use strict";

const userInput = document.querySelector(".user-input");
const submitBtn = document.querySelector(".submit-btn");

const messageHistory = document.querySelector(".message-history");

console.log("The script is correctly linked!");

messageHistory.innerHTML = "";

submitBtn.addEventListener("click", function () {
  createNewUserMessage(userInput.value);
});

function createNewUserMessage(message) {
  console.log("the function has been called.");
  const userHtml = `<div class="message-box user-message-box">
    <img
      class="user-pfp"
      src="360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
    />
    <p class="message user-message">
    ${message}
    </p>
  </div>`;

  messageHistory.insertAdjacentHTML("beforeend", userHtml);
}

function createAIMessage(message) {
  console.log("the function has been called.");
  const aiHtml = `
    <div class="message-box ai-message-box">
                            <img
                                class="ai-pfp"
                                src="chatgpt-green-circular-logo-22057.svg"
                            />
                            <p class="message ai-message">
                            ${message}
                            </p>
                        </div>
`;

  messageHistory.insertAdjacentHTML("beforeend", aiHtml);
}

createAIMessage("Hi, How can I help you today?");
