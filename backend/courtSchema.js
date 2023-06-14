const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

const courtSchema = new mongoose.Schema({
  courtName: { type: String, required: true, unique: true },
  bookings: [bookingSchema],
});

module.exports = mongoose.model("Court", courtSchema);
