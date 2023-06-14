const Court = require("./courtSchema");

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://plapke:Car37lou@cluster0.osek9lx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));

const createCourt = async (name) => {
  const court = new Court({
    courtName: name,
  });

  try {
    await court.save();
    console.log(`Court ${name} created.`);
  } catch (err) {
    console.error(`Could not create court ${name}.`, err);
  }
};

createCourt("Court 2");
