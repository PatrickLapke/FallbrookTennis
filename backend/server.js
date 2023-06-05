const express = require("express");
const app = express();
const Court = require("./courseSchema");

app.use(express.json());

app.listen(3000, () => {
  console.log("Listening...");
});

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://plapke:Car37lou@cluster0.osek9lx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));

app.get("/courts", async (req, res) => {
  const courts = await Court.find();
  res.send(courts);
});
