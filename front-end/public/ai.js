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
            ? "You will extract the main keywords from this user input by returning only the keywords with no commas."
            : `You will respond to the user prompt by summarizing the following: ${htmlTextContents}. Replace all new line skips with <br>, never skip a line another way. I encourage you to use html lists to format your response when necessary and keep all your text inside html elements. Replace '-' with <li> and wrap bold text between <strong> and </strong> instead of **. Finally, avoid any mention of website locations.`,
      },
      {
        role: "user",
        content: userInput,
      },
    ],
    model: "gpt-4o",
  });
  const openAIOutput =
    htmlTextContents == null
      ? completion.choices[0].message.content.toLowerCase()
      : completion.choices[0].message.content;
  return openAIOutput;
}

exports.main = main;
