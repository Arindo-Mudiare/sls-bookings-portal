const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bookingType: {
    type: String,
    required: true,
  },
  pickUpFrom: {
    type: String,
    required: true,
  },
  deliverTo: {
    type: String,
    required: true,
  },
  sphoneNumber: {
    type: String,
    required: true,
  },
  rphoneNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  inputOffer: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const bookingModel = mongoose.model("bookings", BookingSchema);
module.exports = bookingModel;
