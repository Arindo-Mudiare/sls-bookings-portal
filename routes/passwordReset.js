const router = require("express").Router();
const User = require("../models/userModel");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const postmark = require("postmark");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// send password link
router.post("/", async (req, res) => {
  try {
    const emailSchema = Joi.object({
      email: Joi.string().email().required().label("Email"),
    });
    const { error } = emailSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(409)
        .send({ message: "User with given email does not exist!" });

    // set reset tokens and expiry on their account
    user.resetPasswordToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();
    // let token = await Token.findOne({ userId: user._id });
    // if (!token) {
    //   token = await new Token({
    //     userId: user._id,
    //     token: crypto.randomBytes(32).toString("hex"),
    //   }).save();
    // }

    const url = `${process.env.LIVE_URL}/password-reset/${user._id}/${user.resetPasswordToken}`;
    await sendEmail(user.email, "Password Reset", url);
    // const serverToken = process.env.API_TOKEN;
    // const client = new postmark.ServerClient(serverToken);

    // await client.sendEmail({
    //   From: "slsbookings@slsportation.com",
    //   To: "testbook@slsportation.com",
    //   Subject: "Password Reset",
    //   TextBody: `Click this link to reset your password ${url}`,
    // });

    res.status(200).send({
      message: `Password reset link sent to ${user.email}'s email account`,
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// verify password reset link
router.get("/:id/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await User.findOne({
      userId: user._id,
      resetPasswordToken: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    res.status(200).send("Valid Url");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//  set new password
router.post("/:id/:token", async (req, res) => {
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await User.findOne({
      userId: user._id,
      resetPasswordToken: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    // if (!user.verified) user.verified = true;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    user.resetPasswordExpires = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    // await token.remove();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
