const express = require("express");
const app = express();
const Court = require("./courtSchema");

app.use(express.json());

app.listen(3000, () => {
  console.log("Listening...");
});

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://plapke:@cluster0.osek9lx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));

app.get("/courts", async (req, res) => {
  const courts = await Court.find({}, "courtId -_id");
  res.send(courts);
});

app.get("/courts/bookings", async (req, res) => {
  const courts = await Court.find();
  const days = new Set();
  courts.forEach((court) => {
    court.bookings.forEach((booking) => {
      days.add(booking.day);
    });
  });
  res.send([...days]);
});

app.get("/courts/:courtId", async (req, res) => {
  const court = await Court.findOne({ courtId: req.params.courtId });
  res.send(court);
});
