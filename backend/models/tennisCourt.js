const Joi = require("joi");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const tennisCourt = new mongoose.model(
  "tennisCourt",
  new mongoose.Schema({
    courtName: {
      type: String,
      required: true,
      unique: true,
    },
    bookings: [bookingSchema],
  })
);

function validateCourt(tennisCourt) {
  const schema = {
    courtName: Joi.string().required(),
    bookings: Joi.array().items(
      Joi.object({
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
      })
    ),
  };

  return Joi.validate(tennisCourt, schema);
}

exports.tennisCourt = tennisCourt;
exports.validate = validateCourt;
