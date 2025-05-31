const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BloodRequest",
    required: true,
  },
  donatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Donation", donationSchema);
