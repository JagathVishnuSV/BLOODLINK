const BloodRequest = require("../models/BloodRequest");
const Notification = require("../models/Notification");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail"); // <-- Add this line

exports.createRequest = async (req, res) => {
  console.log('req.user:', req.user); 

  try {
    const { patientName, bloodGroup, unitsNeeded, hospital, reason, contactNumber, location, neededBefore ,urgency} = req.body;
    console.log('Received urgency:', urgency);
    const request = await BloodRequest.create({
      requester: req.user._id,
      patientName,
      bloodGroup,
      unitsNeeded,
      hospital,
      reason,
      contactNumber,
      location,
      neededBefore,
      urgency
    });

    const nearbyUsers = await User.find({
      bloodGroup,
      location: {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: location.coordinates },
          $maxDistance: 20000 // 10 km
        }
      }
    });

    const notifications = nearbyUsers.map(user => ({
      recipient: user._id,
      type: "donation_opportunity",
      message: `Urgent request for ${bloodGroup} blood near you.`,
      link: `/requests`
    }));

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
    }
    if (urgency === "urgent" || urgency === "critical") {
      const emails = nearbyUsers
        .map(user => user.email)
        .filter(email => !!email); // filter out undefined/null

      if (emails.length > 0) {
        await sendEmail({
          bcc: emails,
          subject: `Urgent Blood Request: ${bloodGroup} Needed`,
          text: `Urgent blood request for ${patientName} (${bloodGroup}) at ${hospital}. Needed before ${new Date(neededBefore).toLocaleString()}. Reason: ${reason}. Please log in to BloodLink for details.`
        });
      }}
    res.status(201).json({ message: "Blood request created.", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create request." });
  }
};
exports.getNearbyRequests = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query;

    const lng = parseFloat(longitude);
    const lat = parseFloat(latitude);
    const maxDist = parseInt(maxDistance);

    // 🚫 Invalid coordinates
    if (isNaN(lng) || isNaN(lat)) {
      return res.status(400).json({ message: "Invalid coordinates provided" });
    }

    const requests = await BloodRequest.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: maxDist
        }
      },
      status: "active"
    }).populate("requester", "name bloodGroup phone");

    res.json({ requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch requests." });
  }
};


exports.fulfillRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await BloodRequest.findById(id);

    if (!request || request.status !== "active") {
      return res.status(404).json({ message: "Request not found or already fulfilled." });
    }

    if (!request.fulfilledBy.includes(req.user.userId)) {
      request.fulfilledBy.push(req.user.userId);
    }

    if (request.fulfilledBy.length >= request.unitsNeeded) {
      request.status = "fulfilled";

      // 🔔 Notify requester when fulfilled
      const fulfillmentNotification = {
        recipient: request.requester,
        type: "request_fulfilled",
        message: `Your blood request for ${request.bloodGroup} has been fulfilled!`,
        link: "/my-requests"
      };
      await Notification.create(fulfillmentNotification);
    }

    await request.save();

    // 🏅 Badge calculation
    const donor = await User.findById(req.user.userId);

    const donationCount = await BloodRequest.countDocuments({
      fulfilledBy: donor._id
    });

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

    // 🔔 Create badge notifications
    const badgeNotifications = earnedBadges.map(badge => ({
      recipient: donor._id,
      type: "badge_award",
      message: `🎉 Congratulations! You've earned the "${badge}" badge.`,
      link: "/profile"
    }));

    if (badgeNotifications.length > 0) {
      await Notification.insertMany(badgeNotifications);
    }

    res.json({ message: "Marked as fulfilled.", request });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update request." });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ requester: req.user._id });
    res.json({ requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get your requests." });
  }
};

exports.searchRequests = async (req, res) => {
  const { city, bloodGroup, urgency } = req.query;
  const filters = {};

  if (city) filters.city = new RegExp(city, "i");
  if (bloodGroup) filters.bloodGroup = bloodGroup;
  if (urgency) filters.urgency = urgency;

  try {
    const results = await BloodRequest.find(filters).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
};

exports.getRequestById = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id).populate('requester', 'name email phone');
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching request details' });
  }
};
