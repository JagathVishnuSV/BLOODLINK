const Notification = require("../models/Notification");

exports.getUserNotifications = async (req, res) => {
    try {
      const notifications = await Notification.find({ recipient: req.user._id })
        .sort({ createdAt: -1 });
      res.json(notifications);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
};

exports.markAsRead = async (req, res) => {
    const { id } = req.params;
  
    try {
      const notification = await Notification.findOneAndUpdate(
        { _id: id, recipient: req.user._id },
        { $set: { read: true } },
        { new: true }
      );
  
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }
  
      res.json({ message: "Notification marked as read" });
    } catch (err) {
      res.status(500).json({ message: "Failed to mark as read" });
    }
};
  
