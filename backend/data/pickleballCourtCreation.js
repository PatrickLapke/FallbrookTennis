require("dotenv").config({ path: "../.env" });
const { pickleballCourt } = require("../models/pickleballCourt");

const mongoose = require("mongoose");
const uri = process.env.DATA_CONNECTION;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));

const createCourt = async (name) => {
  const court = new pickleballCourt({
    courtName: name,
  });

  try {
    await court.save();
    console.log(`Court ${name} created.`);
  } catch (err) {
    console.error(`Could not create court ${name}.`, err);
  }
};

// createCourt("Court 12");
