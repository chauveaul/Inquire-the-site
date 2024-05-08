"use strict";

require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main(userInput, findKeyword) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: findKeyword
          ? "You will extract the main keyword from this user input."
          : "You will summarize the given input to be concise, informative, and clear",
      },
      {
        role: "user",
        content: userInput,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const openAIOutput = completion.choices[0].message.content.toLowerCase();
  return openAIOutput;
}

exports.main = main;
