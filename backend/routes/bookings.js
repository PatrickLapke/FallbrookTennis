// const auth = require("../middleware/auth");
// const { pickleballCourt, validate } = require("../models/pickleballCourt");
const { User } = require("../models/user");
const { pickleballCourt } = require("../models/pickleballCourt");
const { tennisCourt } = require("../models/tennisCourt");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/pickleball", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).send("Access denied. No token provided.");

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res
        .status(400)
        .send("User was not found with the decoded token provided.");
    }

    let courts = await pickleballCourt.find({ "bookings.userId": user._id });

    courts = courts.map((court) => {
      court.bookings = court.bookings.filter((booking) =>
        booking.userId.equals(user._id)
      );
      return court;
    });

    res.send(courts);
  } catch (error) {
    console.log("Error finding/decoding the token.", error);
    return res.status(500).send("There was a server error.");
  }
});

router.get("/tennis", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).send("Access denied. No token provided."); //THIS IS JUST AUTH ISN'T IT?

    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const user = await User.findOne({ _id: decoded._id });
    if (!user) {
      return res
        .status(400)
        .send("User was not found with the decoded token provided.");
    }

    const courts = await tennisCourt.find({ "bookings.userId": user._id });
    // console.log(courts);
    res.send(courts);
  } catch (error) {
    console.log("Error finding/decoding the token.", error);
    return res.status(500).send("There was a server error.");
  }
});

router.delete("/pickleball/:bookingId", async (req, res) => {
  const bookingId = req.params.bookingId;
  const court = await pickleballCourt.findOne({ "bookings._id": bookingId });
  if (!court) {
    return res.status(404).send("Booking not found.");
  }

  const booking = court.bookings.id(bookingId);

  booking.deleteOne();

  await court.save();
  return res.status(200).send("Booking successfully deleted.");
});

router.delete("/tennis/:bookingId", async (req, res) => {
  const bookingId = req.params.bookingId;
  const court = await tennisCourt.findOne({ "bookings._id": bookingId });
  if (!court) {
    return res.status(404).send("Booking not found.");
  }

  const booking = court.bookings.id(bookingId);

  booking.deleteOne();

  await court.save();
  return res.status(200).send("Booking successfully deleted.");
});
module.exports = router;
