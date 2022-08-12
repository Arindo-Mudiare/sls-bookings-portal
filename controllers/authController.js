const User = require("../models/userModel");
const authMiddleware = require("../middleware/authMiddleware");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// send password link
const forgotPass = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });
    // .redirect("/login");

    // set reset tokens and expiry on their account
    user.resetPasswordToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    //   send them an email with the token
    const resetUrl = `http://${process.env.BASE_URL}/api/password-reset/forgot/${user.resetPasswordToken}`;

    return res.status(200).send({
      message: `Success!, Password Reset link -- ${resetUrl}`,
      url: resetUrl,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// verify reset token
const verifyToken = async (req, res) => {
  try {
    let user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user)
      return (
        res
          // .status(409)
          .send({ message: "Password reset is invalid or has expired." })
      );

    console.log(`Render reset Password form`);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const confirmPasswords = async (req, res) => {
  try {
    if (req.body.password === req.body["password-confirm"]) {
      next(); // keepit going!
      return;
    } else {
      return res.status(409).send({ message: "Passwords do not match" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { confirmPasswords, forgotPass, verifyToken };
