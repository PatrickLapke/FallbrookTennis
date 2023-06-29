const Joi = require("joi");
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const pickleballCourt = new mongoose.model(
  "pickleballCourt",
  new mongoose.Schema({
    courtName: {
      type: String,
      required: true,
      unique: true,
    },
    bookings: [bookingSchema],
  })
);

function validateCourt(pickleballCourt) {
  const schema = {
    courtName: Joi.string().required(),
    bookings: Joi.array().items(
      Joi.object({
        startTime: Joi.date().required(),
        endTime: Joi.date().required(),
      })
    ),
  };

  return Joi.validate(pickleballCourt, schema);
}

exports.pickleballCourt = pickleballCourt;
exports.validate = validateCourt;
