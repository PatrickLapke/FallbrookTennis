const bcryptjs = require("bcryptjs");
const _ = require("lodash");
const express = require("express");

const sendVerification = require("../utility/sendVerification");
const { User, validateUser } = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcryptjs.genSalt(10);
  user.password = await bcryptjs.hash(user.password, salt);
  console.log(user.password);
  await user.save();

  const token = user.generateAuthToken();

  try {
    await sendVerification(user.email, token);
    console.log("Email sent...");
  } catch (error) {
    console.log(error);
  }

  res.header("x-auth-token", token).send(_.pick(user, ["name", "email"]));
});

module.exports = router;
