//PASSWORD NOT WORKING!!!!!
// require("dotenv").config();
// console.log(process.env.DATABASE_PASSWORD);
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://plapke:Car37lou@cluster0.osek9lx.mongodb.net/?retryWrites=true&w=majority";
const Court = require("./courseSchema");

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));
