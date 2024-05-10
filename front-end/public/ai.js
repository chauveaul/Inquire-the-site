"use strict";

require("dotenv").config();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main(userInput, htmlTextContents = null) {
  console.log(htmlTextContents);
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          htmlTextContents == null
            ? "You will extract the main keyword from this user input by returning only the keyword."
            : `You will respond to the user prompt by summarizing the following: ${htmlTextContents} `,
      },
      {
        role: "user",
        content: userInput,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  const openAIOutput =
    htmlTextContents == null
      ? completion.choices[0].message.content.toLowerCase()
      : completion.choices[0].message.content;
  return openAIOutput;
}

exports.main = main;
