const { User } = require("../models/user");

module.exports = async function (req, res, next) {
  try {
    const user = await User.findById(req.user._id).select("isVerified");
    console.log(user);

    if (!user.isVerified) {
      console.log(user.isVerified);
      return res
        .status(406)
        .send("Access denied. Please register your email address.");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
