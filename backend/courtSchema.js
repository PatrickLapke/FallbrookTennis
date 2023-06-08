const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  day: { type: String, required: true },
  timeSlot: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

const courtSchema = new mongoose.Schema({
  courtId: { type: Number, required: true, unique: true },
  bookings: [bookingSchema],
});

module.exports = mongoose.model("Court", courtSchema);
