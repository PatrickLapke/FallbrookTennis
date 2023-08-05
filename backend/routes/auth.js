const Joi = require("joi");
const bcryptjs = require("bcryptjs");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

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
