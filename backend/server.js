const config = require("config");
const express = require("express");
const app = express();

const users = require("./routes/users");
const tennisCourts = require("./routes/tennisCourts");
const auth = require("./routes/auth");

//USED SETX HERE DEAL W/ LATER
if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

app.use(express.json());
app.use("/api/users", users);
app.use("/api/tennisCourts", tennisCourts);
app.use("/api/auth", auth);

app.listen(3000, () => {
  console.log("Listening...");
});

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://plapke:Car37lou@cluster0.osek9lx.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDb...", err));
