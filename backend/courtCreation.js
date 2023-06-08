const Court = require("./courtSchema");

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://plapke:Car37lou@cluster0.osek9lx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));

const timeslots = [
  "08:00-09:30",
  "09:30-11:00",
  "11:00-12:30",
  "12:30-14:00",
  "14:00-15:30",
  "15:30-17:00",
  "17:00-18:30",
  "18:30-20:00",
  "20:00-21:30",
];

const bookings = [];

for (let i = 0; i < 3; i++) {
  const day = new Date();
  day.setDate(day.getDate() + i);

  const month = String(day.getMonth() + 1).padStart(2, "0");
  const date = String(day.getDate()).padStart(2, "0");
  const dateString = `${month}-${date}`;

  for (const timeslot of timeslots) {
    bookings.push({
      day: dateString,
      timeSlot: timeslot,
      isBooked: false,
    });
  }
}

const createCourt = async (id) => {
  const court = new Court({
    courtId: id,
    bookings: bookings,
  });

  try {
    await court.save();
    console.log(`Court ${id} created.`);
  } catch (err) {
    console.error(`Could not create court ${id}.`, err);
  }
};

createCourt(3);
