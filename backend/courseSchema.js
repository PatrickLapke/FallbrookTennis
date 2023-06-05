const mongoose = require("mongoose");

const courtSchema = new mongoose.Schema({
  id: Number,
  isBooked: Boolean,
});

module.exports = mongoose.model("Court", courtSchema);
