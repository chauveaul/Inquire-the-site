const express = require("express");
const path = require("path");
const ai = require("./ai.js");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "/public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.post("/api/ai", async (req, res) => {
  const userMessage = req.body.userMessage;

  try {
    if (userMessage == null) {
      throw new Error("No prompt was provided.");
    }

    const response = await ai.main(userMessage, true);
    return res.status(200).json({
      success: true,
      message: response,
    });
  } catch (error) {
    console.log(error.message);
  }
});

// app.post("/api/openai", (req, res) => {
//   console.log("Hi from the backend");
//   const userInput = req.body.userInput;
//   const aiOutput = main(userInput, true);
//   res.json(aiOutput);
// });

app.get("/api/users", (req, res) => {
  const users = [
    {
      id: "123",
      name: "Shaun",
    },
    {
      id: "234",
      name: "Bob",
    },
    {
      id: "345",
      name: "Sue",
    },
  ];
  res.json(users);
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
