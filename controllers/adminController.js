const User = require("../models/User");
const BloodRequest = require("../models/BloodRequest");
const Notification = require("../models/Notification");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password"); // Don't send passwords
  res.json({ users });
};

exports.getAllRequests = async (req, res) => {
  const requests = await BloodRequest.find().populate("createdBy", "name email");
  res.json({ requests });
};

exports.sendNotification = async (req, res) => {
  const { recipientIds, message, link } = req.body;

  const notifications = recipientIds.map(id => ({
    recipient: id,
    type: "admin_alert",
    message,
    link
  }));

  await Notification.insertMany(notifications);

  recipientIds.forEach(id => {
    req.app.get("io").to(id.toString()).emit("newNotification", { message, link });
  });

  res.json({ message: "Notifications sent." });
};

exports.manageBadges = async (req, res) => {
  res.json({ message: "Badge rule management is not yet implemented." });
};

exports.getDonationStats = async (req, res) => {
    try {
      const users = await User.find({}, "donationHistory badges city bloodGroup name");
  
      const monthly = {};
      users.forEach(user => {
        user.donationHistory.forEach(donation => {
          const month = new Date(donation.date).toLocaleString("default", { month: "short", year: "numeric" });
          monthly[month] = (monthly[month] || 0) + 1;
        });
      });
  
      const topDonors = users
        .map(user => ({
          name: user.name,
          count: user.donationHistory.length
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
  
      const bloodGroupStats = {};
      users.forEach(user => {
        const group = user.bloodGroup;
        bloodGroupStats[group] = (bloodGroupStats[group] || 0) + user.donationHistory.length;
      });
  
      const cityStats = {};
      users.forEach(user => {
        const city = user.city || "Unknown";
        cityStats[city] = (cityStats[city] || 0) + user.donationHistory.length;
      });
  
      const badgeCounts = {};
      users.forEach(user => {
        user.badges.forEach(badge => {
          badgeCounts[badge] = (badgeCounts[badge] || 0) + 1;
        });
      });
  
      res.json({
        monthlyStats: monthly,
        topDonors,
        bloodGroupStats,
        cityStats,
        badgeCounts
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  };
  