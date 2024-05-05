const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "..", "/public")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

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
