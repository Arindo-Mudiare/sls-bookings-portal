const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
// reset password imports
const crypto = require("crypto");

// Register a new User
router.post("/register", async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newuser = new User(req.body);
    await newuser.save();
    res
      .status(200)
      .send({ message: "User created successfully.", success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error creating user.", success: false, error });
  }
});

// Login registered user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "Password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10800s",
      });
      res
        .status(200)
        .send({ message: "Login Successful", success: true, data: token });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error Authenticating User", success: false, error });
  }
});
//  Retrieve registered user from database
router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
});

// submit Booking
router.post("/submit-new-booking", authMiddleware, async (req, res) => {
  try {
    // const user = await User.findOne({ _id: req.body.userId });
    req.body.createdBy = req.body.userId;
    const newBooking = new Booking({
      ...req.body,
      createdBy: req.body.userId,
    });
    await newBooking.save();
    const adminUser = await User.findOne({ isSuperAdmin: true });

    // after saving a booking create a new notification for admin
    const unseenNotifications = adminUser.unseenNotifications;
    unseenNotifications.push({
      type: "new-booking-request",
      message: `${newBooking.name} has made a new Booking`,
      data: {
        bookingId: newBooking._id,
        name: newBooking.name,
      },
      onClickPath: "/admin/bookings",
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "New Booking Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error Saving Your Booking", success: false, error });
  }
});

//  Retrieve All Bookings from Current User
router.get("/get-user-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ createdBy: req.body.userId }).sort({
      updatedAt: -1,
    });
    res.status(200).send({
      message: "User's Bookings fetched successfully",
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error getting User's Bookings",
      success: false,
      error,
    });
  }
});

//  Delete Current User Booking
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

//  Retrieve Current Booking by id
router.post("/get-booking-info-by-id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.body.bookingId });
    // console.log(booking);
    res.status(200).send({
      success: true,
      message: "booking info fetched successfully",
      data: booking,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting booking info", success: false, error });
  }
});

// update Single Booking
router.patch("/update-current-booking", authMiddleware, async (req, res) => {
  try {
    const bookingId = req.body.bookingId;
    // console.log(req.body);
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId },
      req.body
    );
    // console.log(booking);
    res.status(200).send({
      success: true,
      message: "Your booking has been updated successfully",
      data: booking,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error Updating user booking", success: false, error });
  }
});

// Mark Notifications as seen
router.post(
  "/mark-all-notifications-as-seen",
  authMiddleware,
  async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error Marking Notifications",
        success: false,
        error,
      });
    }
  }
);

// Delete all Notifications
router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All Notifications have been Deleted",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error Deleting Notifications",
      success: false,
      error,
    });
  }
});

module.exports = router;
