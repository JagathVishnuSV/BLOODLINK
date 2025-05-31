const Donation = require("../models/Donation");
const BloodRequest = require("../models/BloodRequest");
const User = require("../models/User");
const Notification = require("../models/Notification");

exports.makeDonation = async (req, res) => {
  try {
    const { requestId } = req.body;
    //const donorId = req.user.userId;
    const donorId = req.user._id; // ✅ this is correct

    const request = await BloodRequest.findById(requestId);
    if (!request || request.status !== "active") {
      return res.status(404).json({ message: "Request not found or already fulfilled." });
    }

    const existingDonation = await Donation.findOne({ donor: donorId, request: requestId });
    if (existingDonation) {
      return res.status(400).json({ message: "You already fulfilled this request." });
    }

    const donation = await Donation.create({ donor: donorId, request: requestId });

    // Update BloodRequest
    request.fulfilledBy.push(donorId);
    if (request.fulfilledBy.length >= request.unitsNeeded) {
      request.status = "fulfilled";

      // Notify requester
      await Notification.create({
        recipient: request.requester,
        type: "request_fulfilled",
        message: `Your blood request for ${request.bloodGroup} has been fulfilled!`,
        link: "/my-requests"
      });
    }

    await request.save();

    // Update donor badges
    const donor = await User.findById(donorId);
    const donationCount = await Donation.countDocuments({ donor: donorId });

    const earnedBadges = [];

    if (donationCount === 1 && !donor.badges.includes("First Donation")) {
      donor.badges.push("First Donation");
      earnedBadges.push("First Donation");
    }
    if (donationCount === 5 && !donor.badges.includes("Bronze Donor")) {
      donor.badges.push("Bronze Donor");
      earnedBadges.push("Bronze Donor");
    }
    if (donationCount === 10 && !donor.badges.includes("Silver Donor")) {
      donor.badges.push("Silver Donor");
      earnedBadges.push("Silver Donor");
    }
    if (donationCount === 20 && !donor.badges.includes("Gold Donor")) {
      donor.badges.push("Gold Donor");
      earnedBadges.push("Gold Donor");
    }

    await donor.save();

    if (earnedBadges.length > 0) {
      const badgeNotifications = earnedBadges.map(badge => ({
        recipient: donorId,
        type: "badge_award",
        message: `🎉 Congratulations! You've earned the "${badge}" badge.`,
        link: "/profile"
      }));
      await Notification.insertMany(badgeNotifications);
    }

    res.status(201).json({ message: "Donation recorded.", donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to record donation." });
  }
};

exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user.userId }).populate("request");
    res.json({ donations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch donations." });
  }
};
