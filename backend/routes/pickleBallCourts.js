const auth = require("../middleware/auth");
const { pickleballCourt, validate } = require("../models/pickleballCourt");
const emailVerification = require("../middleware/emailVerification");
const express = require("express");
const router = express.Router();
const checkOverlap = require("../../app/functions/checkOverlap");

router.get("/", async (req, res) => {
  const { startTime, endTime } = req.query;
  try {
    const pickleballCourts = await pickleballCourt
      .find()
      .collation({ locale: "en", numericOrdering: true })
      .sort("courtName");
    const availableCourts = pickleballCourts.filter((pickleballCourt) => {
      return !checkOverlap(startTime, endTime, pickleballCourt.bookings);
    });
    if (availableCourts.length === 0) {
      return res
        .status(404)
        .json("No courts available at the selected date and time.");
    } else res.status(200).send(availableCourts);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
  }
});

router.post("/bookings", auth, emailVerification, async (req, res) => {
  const { startTime, endTime, pickleballCourtId, userId } = req.body;
  try {
    const court = await pickleballCourt.findById(pickleballCourtId);
    if (!court)
      return res.status(404).send("Could not find the pickleballCourt.");
    court.bookings.push({ startTime, endTime, userId });

    await court.save();
    res.status(201).send("Booking added to pickleballCourt.");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
