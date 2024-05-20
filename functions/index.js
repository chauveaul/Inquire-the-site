const { onRequest } = require("firebase-functions/v2/https");
const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const { defineSecret, defineString } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const engines = require("consolidate");
const path = require("path");

const ai = require("./ai.js");
const crawler = require("./crawler.js");
const scraper = require("./scraper.js");

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAjgCealkLcvoWS7GTJGYNLSgFPSg3F9wI",
  authDomain: "inquire-the-site.firebaseapp.com",
  projectId: "inquire-the-site",
  storageBucket: "inquire-the-site.appspot.com",
  messagingSenderId: "821476119024",
  appId: "1:821476119024:web:0d9abb0374230d8dbb0d35",
  measurementId: "G-RQ8QY3B798",
});

const express = require("express");

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const openaiKey = defineString("OPENAI_API_KEY");

exports.ai = onRequest(
  { OPENAI_API_KEY: openaiKey, cors: true },
  async (req, res) => {
    console.log(req.body);
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
        req.body.timer,
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
  },
);
// app.post("/api/ai", async (req, res) => {
//   console.log("api request");
//   const userMessage = req.body.userMessage;
//   try {
//     if (userMessage == null) {
//       throw new Error("No prompt was provided.");
//     }

//     aiResponseKeyword = aiResponseKeyword.split(" ");
//     console.log(aiResponseKeyword);
//     console.log(`Keyword: ${aiResponseKeyword}`);

//     const link = await crawler.findURL(
//       req.body.baseUrl,
//       req.body.baseUrl,
//       aiResponseKeyword,
//       req.body.timer,
//     );

//     console.log(`Link: ${link}`);

//     let aiResponse = aiResponseKeyword;

//     if (link !== "DNE") {
//       const htmlTextContent = await scraper.htmlTextContents(link);
//       aiResponse = await ai.main(userMessage, htmlTextContent);
//       console.log(`AI Reponse: ${aiResponse}`);
//     }

//     if (aiResponse === aiResponseKeyword)
//       aiResponse =
//         "Sorry, I was not able to find a match. Maybe try again or switch up the url.";

//     return res.status(200).json({
//       success: true,
//       message: aiResponse,
//     });
//   } catch (error) {
//     console.log(error.message);
//   }
// });

exports.app = onRequest(app);
