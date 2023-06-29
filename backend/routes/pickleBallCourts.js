const auth = require("../middleware/auth");
const { pickleballCourt, validate } = require("../models/pickleballCourt");
const express = require("express");
const router = express.Router();
const checkOverlap = require("../../app/functions/checkOverlap");

router.get("/", async (req, res) => {
  const { startTime, endTime } = req.query;
  try {
    const pickleballCourts = await pickleballCourt.find().sort("courtName");
    const availableCourts = pickleballCourts.filter((pickleballCourt) => {
      return !checkOverlap(startTime, endTime, pickleballCourt.bookings);
    });
    res.send(availableCourts);
  } catch (error) {
    console.log(error);
  }
});

router.post("/bookings", auth, async (req, res) => {
  const { startTime, endTime, pickleballCourtId, userId } = req.body;
  try {
    const court = await pickleballCourt.findById(pickleballCourtId);
    if (!court)
      return res.status(404).send("Could not find the pickleballCourt.");
    court.bookings.push({ startTime, endTime, userId });

    await court.save();
    res.status(200).send("Booking added to pickleballCourt.");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
