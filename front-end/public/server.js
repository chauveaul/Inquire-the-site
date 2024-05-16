"use strict";

const express = require("express");
const path = require("path");
const ai = require("./ai.js");
const crawler = require("./crawler.js");
const scraper = require("./scraper.js");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "/public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

//Make api endpoints for crawler and scraper and separate api calls in variables.
app.post("/api/ai", async (req, res) => {
  console.log("api request");
  const userMessage = req.body.userMessage;
  try {
    if (userMessage == null) {
      throw new Error("No prompt was provided.");
    }

    let aiResponseKeyword = await ai.main(userMessage);
    aiResponseKeyword = aiResponseKeyword.split(" ");
    console.log(aiResponseKeyword);
    console.log(`Keyword: ${aiResponseKeyword}`);

    const link = await crawler.findURL(
      req.body.baseUrl,
      req.body.baseUrl,
      aiResponseKeyword,
    );

    console.log(`Link: ${link}`);

    let aiResponse = aiResponseKeyword;

    if (link !== "DNE") {
      const htmlTextContent = await scraper.htmlTextContents(link);
      aiResponse = await ai.main(userMessage, htmlTextContent);
      console.log(`AI Reponse: ${aiResponse}`);
    }

    if (aiResponse === aiResponseKeyword)
      aiResponse =
        "Sorry, I was not able to find a match. Maybe try again or switch up the url.";

    return res.status(200).json({
      success: true,
      message: aiResponse,
    });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
