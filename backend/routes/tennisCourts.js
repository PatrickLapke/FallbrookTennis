const { tennisCourt, validate } = require("../models/tennisCourt");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const checkOverlap = require("../../app/functions/checkOverlap");

router.get("/", async (req, res) => {
  const { startTime, endTime } = req.query;
  try {
    const startTimeDate = startTime;
    const endTimeDate = endTime;

    const tennisCourts = await tennisCourt.find().sort("courtName");

    const availableCourts = tennisCourts.filter((tennisCourt) => {
      return !checkOverlap(startTimeDate, endTimeDate, tennisCourt.bookings);
    });
    res.send(availableCourts);
  } catch (error) {
    console.log(error);
  }
});

router.post("/bookings", async (req, res) => {
  const { startTime, endTime, courtId } = req.body;
  try {
    const court = await tennisCourt.findById(courtId);
    if (!court) return res.status(404).send("Could not find the court.");
    court.bookings.push({ startTime, endTime });

    await court.save();
    res.status(200).send("Booking added to court.");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
