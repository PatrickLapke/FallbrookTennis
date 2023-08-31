const auth = require("../middleware/auth");
const { pickleballCourt, validate } = require("../models/pickleballCourt");
const emailVerification = require("../middleware/emailVerification");
const express = require("express");
const router = express.Router();
const checkOverlap = require("../../app/functions/checkOverlap");

/**
 * @swagger
 * /api/pickleBallCourts:
 *   get:
 *     description: Get available pickleball courts
 *     tags:
 *       - Pickleball Courts
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: startTime
 *         description: Start time for availability check.
 *         in: query
 *         required: true
 *         type: string
 *       - name: endTime
 *         description: End time for availability check.
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A list of available pickleball courts.
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *       404:
 *         description: No courts available at the selected date and time.
 *       500:
 *         description: Internal Server Error.
 *
 * /api/pickleballCourts/bookings:
 *   post:
 *     description: Book a pickleball court
 *     tags:
 *       - Pickleball Courts
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: booking
 *         description: Booking details.
 *         schema:
 *           type: object
 *           required:
 *             - startTime
 *             - endTime
 *             - pickleballCourtId
 *             - userId
 *           properties:
 *             startTime:
 *               type: string
 *             endTime:
 *               type: string
 *             pickleballCourtId:
 *               type: string
 *             userId:
 *               type: string
 *     responses:
 *       201:
 *         description: Booking added to pickleball court.
 *       404:
 *         description: Could not find the pickleball court.
 *       500:
 *         description: Internal Server Error.
 */

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
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
  }
});

module.exports = router;
