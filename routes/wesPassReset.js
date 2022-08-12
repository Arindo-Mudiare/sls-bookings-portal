const router = require("express").Router();
const {
  confirmPasswords,
  forgotPass,
  verifyToken,
} = require("../controllers/authController");

// send password link
router.route("/forgot").post(forgotPass);
router.route("/reset/:token").get(verifyToken);
router.route("/reset/:token").post(confirmPasswords);

// // verify reset token
// router.post("/verify-rtoken", async (req, res) => {
//   try {
//     let user = await User.findOne({
//       resetPasswordToken: req.params.token,
//       resetPasswordExpires: { $gt: Date.now() },
//     });
//     if (!user)
//       return res
//         .status(409)
//         .send({ message: "Password reset is invalid or has expired." });

//     console.log(`Render reset Password form`);
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// // confirm password from verify token
// router.post("/verify-rtoken", async (req, res) => {
//   try {
//     if (req.body.password === req.body["password-confirm"]) {
//       next(); // keepit going!
//       return;
//     } else {
//       return res.status(409).send({ message: "Passwords do not match" });
//     }
//   } catch (error) {
//     res.status(500).send({ message: "Internal Server Error" });
//   }
// });

// confirmedPasswords = (req, res, next) => {
//   if (req.body.password === req.body["password-confirm"]) {
//     next(); // keepit going!
//     return;
//   }
//   req.flash("error", "Passwords do not match!");
//   res.redirect("back");
// };

// exports.update = async (req, res) => {
//   const user = await User.findOne({
//     resetPasswordToken: req.params.token,
//     resetPasswordExpires: { $gt: Date.now() },
//   });

//   if (!user) {
//     req.flash("error", "Password reset is invalid or has expired");
//     return res.redirect("/login");
//   }

//   const setPassword = promisify(user.setPassword, user);
//   await setPassword(req.body.password);
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpires = undefined;
//   const updatedUser = await user.save();
//   await req.login(updatedUser);
//   req.flash(
//     "success",
//     "💃 Nice! Your password has been reset! You are now logged in!"
//   );
//   res.redirect("/");
// };

module.exports = router;
