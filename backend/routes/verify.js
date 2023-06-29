const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

router.get("/:token", async (req, res) => {
  try {
    console.log(process.env.JWT_PRIVATE_KEY);
    const payload = jwt.verify(req.params.token, process.env.JWT_PRIVATE_KEY);

    const user = await User.findById(payload._id);
    if (!user)
      return res.status(400).send("Invalid Token: no member was found");

    if (user.isVerified)
      return res.status(400).send("User is already verified");

    user.isVerified = true;
    await user.save();

    res.send("Account verified.");
  } catch (error) {
    console.error(error);
    res.status(400).send("Invalid Token: unknown error");
  }
});

module.exports = router;
