const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
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
    pickupAddress: {
      type: String,
      required: false,
    },
    deliverTo: {
      type: String,
      required: true,
    },
    deliverToAddress: {
      type: String,
      required: false,
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
      type: Number,
      required: true,
    },
    additionalInfo: {
      type: String,
      required: false,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    inputOffer: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.model("bookings", BookingSchema);
module.exports = bookingModel;
