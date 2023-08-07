const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Authenticate a user during login.
 *     description: Use to authenticate a user based on email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Successfully authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 _id:
 *                   type: string
 *       400:
 *         description: Invalid email or password.
 *       500:
 *         description: Internal Server Error.
 */

router.post("/", async (req, res) => {
  try {
    const { error } = validateRequest(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("Invalid email");

    const validPassword = await bcryptjs.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).send("Invalid password");

    const token = user.generateAuthToken();

    res
      .status(200)
      .header("x-auth-token", token)
      .header("x-user-id", user._id)
      .send(_.pick(user, ["name", "email", "_id"]));
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error. Please try again later.");
  }
});

function validateRequest(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
