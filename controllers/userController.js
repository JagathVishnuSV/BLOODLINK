const User = require("../models/User");

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    
    res.json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch profile." });
  }
};

exports.updateMe = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.userId, updates, {
      new: true,
      runValidators: true
    }).select("-password");

    res.json({ message: "Profile updated.", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update profile." });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name bloodGroup badges");
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user." });
  }
};
