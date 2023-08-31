const auth = require("../middleware/auth");
const { pickleballCourt, validate } = require("../models/pickleballCourt");
const { User } = require("../models/user");
const { tennisCourt } = require("../models/tennisCourt");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/bookings/pickleball:
 *   get:
 *
 *     description: Retrieve all pickleball courts that the authenticated user has booked.
 *     tags:
 *       - Bookings
 *     responses:
 *       200:
 *         description: A list of booked pickleball courts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: User was not found with the decoded token provided.
 *       500:
 *         description: There was a server error.
 *
 * /api/bookings/tennis:
 *   get:
 *
 *     description: Retrieve all tennis courts that the authenticated user has booked.
 *     tags:
 *       - Bookings
 *     responses:
 *       200:
 *         description: A list of booked tennis courts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: User was not found with the decoded token provided.
 *       500:
 *         description: There was a server error.
 *
 * /api/bookings/pickleball/{bookingId}:
 *   delete:
 *
 *     description: Delete a specific booking from a pickleball court.
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking successfully deleted.
 *       404:
 *         description: Booking not found.
 *       500:
 *         description: There was a server error.
 *
 * /api/bookings/tennis/{bookingId}:
 *   delete:
 *
 *     description: Delete a specific booking from a tennis court.
 *     tags:
 *       - Bookings
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: ID of the booking to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking successfully deleted.
 *       404:
 *         description: Booking not found.
 *       500:
 *         description: There was a server error.
 */

router.get("/pickleball", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
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

    return res.status(200).send(courts);
  } catch (error) {
    console.log("Error finding/decoding the token.", error);
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
  }
});

router.get("/tennis", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(400)
        .send("User was not found with the decoded token provided.");
    }

    let courts = await tennisCourt.find({ "bookings.userId": user._id });

    courts = courts.map((court) => {
      court.bookings = court.bookings.filter((booking) =>
        booking.userId.equals(user._id)
      );
      return court;
    });

    return res.status(200).send(courts);
  } catch (error) {
    console.log("Error finding/decoding the token.", error);
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
  }
});

router.delete("/pickleball/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const court = await pickleballCourt.findOne({ "bookings._id": bookingId });
    if (!court) {
      return res.status(404).send("Booking not found.");
    }

    const booking = court.bookings.id(bookingId);

    booking.deleteOne();

    await court.save();
    return res.status(200).send("Booking successfully deleted.");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
  }
});

router.delete("/tennis/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const court = await tennisCourt.findOne({ "bookings._id": bookingId });
    if (!court) {
      return res.status(404).send("Booking not found.");
    }

    const booking = court.bookings.id(bookingId);

    booking.deleteOne();

    await court.save();
    return res.status(200).send("Booking successfully deleted.");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
  }
});

module.exports = router;
