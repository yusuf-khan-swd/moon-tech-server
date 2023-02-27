require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.send("MoonTech Server is running");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
