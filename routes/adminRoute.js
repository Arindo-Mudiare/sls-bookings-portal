const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const authMiddleware = require("../middleware/authMiddleware");

//  Retrieve All Bookings from database
router.get("/get-all-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).send({
      message: "Bookings fetched successfully",
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting Bookings", success: false, error });
  }
});

//  Retrieve All registered users from database
router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting users", success: false, error });
  }
});

module.exports = router;
