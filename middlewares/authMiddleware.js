const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided." });
  }
  const token = authHeader.split(" ")[1];
  console.log('Received token:', token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // <-- Use decoded.userId, not decoded.id
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
