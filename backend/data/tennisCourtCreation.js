require("dotenv").config({ path: "../.env" });
const { tennisCourt } = require("../models/tennisCourt");

const mongoose = require("mongoose");
const uri = process.env.DATA_CONNECTION;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));

const createCourt = async (name) => {
  const court = new tennisCourt({
    courtName: name,
  });

  try {
    await court.save();
    console.log(`Court ${name} created.`);
  } catch (err) {
    console.error(`Could not create court ${name}.`, err);
  }
};

createCourt("Court 1");
createCourt("Court 2");
createCourt("Court 3");
createCourt("Court 4");
createCourt("Court 5");
createCourt("Court 6");
createCourt("Court 7");
