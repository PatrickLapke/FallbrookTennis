const auth = require("../middleware/auth");
const emailVerification = require("../middleware/emailVerification");
const { tennisCourt, validate } = require("../models/tennisCourt");
const express = require("express");
const router = express.Router();
const checkOverlap = require("../../app/functions/checkOverlap");

/**
 * @swagger
 * /api/tennisCourts:
 *   get:
 *     description: Get available tennis courts
 *     tags:
 *       - tennisCourts
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
 *         description: A list of available tennis courts or a message indicating none are available.
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *       500:
 *         description: Internal Server Error.
 *
 * /api/tennisCourts/bookings:
 *   post:
 *     description: Book a tennis court
 *     tags:
 *       - tennisCourts
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
 *             - courtId
 *             - userId
 *           properties:
 *             startTime:
 *               type: string
 *             endTime:
 *               type: string
 *             courtId:
 *               type: string
 *             userId:
 *               type: string
 *     responses:
 *       201:
 *         description: Booking added to tennis court.
 *       404:
 *         description: Could not find the tennis court.
 *       500:
 *         description: Internal Server Error.
 *
 * definitions:
 *   TennisCourt:
 *     type: object
 *     properties:
 *       courtName:
 *         type: string
 *       bookings:
 *         type: array
 *         items:
 *           type: object
 *
 *   Booking:
 *     type: object
 *     properties:
 *       startTime:
 *         type: string
 *       endTime:
 *         type: string
 *       userId:
 *         type: string
 */

router.get("/", async (req, res) => {
  const { startTime, endTime } = req.query;
  try {
    const startTimeDate = startTime;
    const endTimeDate = endTime;

    const tennisCourts = await tennisCourt.find().sort("courtName");

    const availableCourts = tennisCourts.filter((tennisCourt) => {
      return !checkOverlap(startTimeDate, endTimeDate, tennisCourt.bookings);
    });
    if (availableCourts.length === 0) {
      return res
        .status(200)
        .json("No courts available at the selected date and time.");
    } else res.send(availableCourts);
  } catch (error) {
    console.log(error);
  }
});

router.post("/bookings", auth, emailVerification, async (req, res) => {
  const { startTime, endTime, courtId, userId } = req.body;

  try {
    const court = await tennisCourt.findById(courtId);

    if (!court) return res.status(404).send("Could not find the court.");
    court.bookings.push({ startTime, endTime, userId });

    await court.save();
    return res.status(201).send("Booking added to court.");
  } catch (error) {
    console.log("Some error in the backend for posting a tennis court");
    console.log(error);
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
  }
});

module.exports = router;
