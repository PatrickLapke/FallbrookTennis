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

/**
 * @swagger
 * /:
 *   post:
 *     description: Register a new user
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User's data.
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - email
 *             - password
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request (e.g. user already registered).
 *       500:
 *         description: Internal Server Error.
 *
 * /resendVerification:
 *   post:
 *     description: Resend the verification email to a user
 *     tags:
 *       - Verification
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User ID to resend verification for.
 *         schema:
 *           type: object
 *           required:
 *             - userId
 *           properties:
 *             userId:
 *               type: string
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 *
 * /password-reset:
 *   post:
 *     description: Request a password reset token
 *     tags:
 *       - Password Reset
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User's email for password reset.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *     responses:
 *       200:
 *         description: Token saved and sent to email.
 *       400:
 *         description: No account with provided email.
 *       500:
 *         description: Internal Server Error.
 *
 * /password-reset/confirm:
 *   post:
 *     description: Confirm the received password reset token
 *     tags:
 *       - Password Reset
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: reset
 *         description: Reset token from email.
 *         schema:
 *           type: object
 *           required:
 *             - passwordResetToken
 *           properties:
 *             passwordResetToken:
 *               type: string
 *     responses:
 *       200:
 *         description: Code accepted.
 *       400:
 *         description: Code is incorrect.
 *       500:
 *         description: Internal Server Error.
 *
 * /change-password:
 *   post:
 *     description: Change the user's password using the reset token
 *     tags:
 *       - Password Reset
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: reset
 *         description: New password and reset token.
 *         schema:
 *           type: object
 *           required:
 *             - passwordResetToken
 *             - password
 *           properties:
 *             passwordResetToken:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Password changed successfully.
 *       400:
 *         description: Code is incorrect.
 *       500:
 *         description: Internal Server Error.
 */

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

    return res.status(200).send("Email sent");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
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
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
  }
});

router.post("/password-reset/confirm", async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.passwordResetToken);
    let user = await User.findOne({
      passwordResetToken: req.body.passwordResetToken,
    });
    if (!user)
      return res.status(400).send("The code you entered is incorrect.");
    return res.status(200).send("Code Accepted.");
  } catch (error) {
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
  }
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
    return res.status(200).send("Password Changed.");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send("Internal Server Error. Please try again later.");
  }
});

module.exports = router;
