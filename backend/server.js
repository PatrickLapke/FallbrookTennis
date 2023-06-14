const express = require("express");
const app = express();
const Court = require("./courtSchema");
const checkOverlap = require("./functions/checkOverlap");

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

// app.get("/courts", async (req, res) => {
//   const courts = await Court.find();
//   res.send(courts);
// });

app.get("/courts", async (req, res) => {
  const { startTime, endTime } = req.query;
  try {
    const startTimeDate = new Date(startTime);
    const endTimeDate = new Date(endTime);
    const courts = await Court.find();

    const availableCourts = courts.filter((court) => {
      return !checkOverlap(startTimeDate, endTimeDate, court.bookings);
    });
    res.send(availableCourts);
  } catch (error) {
    console.log(error);
  }
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

app.post("/courts/bookings", async (req, res) => {
  const { startTime, endTime, courtId } = req.body;
  try {
    const court = await Court.findById(courtId);
    if (!court) return res.status(404).send("Could not find the court.");
    court.bookings.push({ startTime, endTime });

    await court.save();
    res.status(200).send("Booking added to court.");
  } catch (error) {
    console.log(error);
  }
});
