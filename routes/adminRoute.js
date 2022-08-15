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
//  Delete Booking
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id: bookId } = req.params;
    const booking = await Booking.findOne({ _id: bookId });

    if (!booking) {
      throw new NotFoundError(`No booking with id :${bookId}`);
    }
    await booking.remove();
    res.status(200).send({
      message: "Booking deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error deleting Bookings", success: false, error });
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

router.post("/get-admin-info-by-id", authMiddleware, async (req, res) => {
  try {
    const admin = await User.findOne({ _id: req.body.userId });
    res.status(200).send({
      success: true,
      message: "admin info fetched successfully",
      data: admin,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting admin info", success: false, error });
  }
});

router.post("/update-admin-profile", authMiddleware, async (req, res) => {
  try {
    const admin = await User.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Admin profile updated successfully",
      data: admin,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting Admin info", success: false, error });
  }
});

module.exports = router;
