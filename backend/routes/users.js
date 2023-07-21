const bcryptjs = require("bcryptjs");
const _ = require("lodash");
const express = require("express");
const auth = require("../middleware/auth");

let nanoid;
import("nanoid").then((nano) => {
  nanoid = nano.nanoid;
});

const sendVerification = require("../utility/sendVerification");
const sendPasswordReset = require("../utility/sendPasswordReset");
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
  console.log(`Here is the hashed password: ${user.password}`);
  await user.save();

  const token = user.generateAuthToken();
  console.log(`Here is the token ${token}`);

  try {
    await sendVerification(user.email, token);
    console.log("Email sent...");
  } catch (error) {
    console.log(error);
  }

  res
    .status(201)
    .header("x-auth-token", token)
    .header("x-user-id", user._id)
    .send(_.pick(user, ["name", "email"]));
});

router.post("/resendVerification", auth, async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.body.userId });
    if (!user) return res.status(404).send("The user was not found.");

    const token = req.header("x-auth-token");

    await sendVerification(user.email, token);

    res.status(200).send("Email sent");
  } catch (error) {
    console.log(error);
  }
});

router.post("/password-reset", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).send("There is no account with the provided email.");

  user.passwordResetToken = nanoid(6);
  await user.save();
  res.status(200).send("Token saved.");

  try {
    await sendPasswordReset(user.email, user.passwordResetToken);
    console.log("Reset token sent");
  } catch (error) {
    console.log(error);
  }
});

router.post("/password-reset/confirm", async (req, res) => {
  console.log(req.body);
  console.log(req.body.passwordResetToken);
  let user = await User.findOne({
    passwordResetToken: req.body.passwordResetToken,
  });
  if (!user) return res.status(400).send("The code you entered is incorrect.");
  return res.status(200).send("Code Accepted.");
});

router.post("/change-password", async (req, res) => {
  try {
    let user = await User.findOne({
      passwordResetToken: req.body.passwordResetToken,
    });
    if (!user)
      return res.status(400).send("The code you entered is incorrect.");

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(req.body.password, salt);
    console.log(user.password);

    await user.save();
    res.status(200).send("Password Changed.");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
