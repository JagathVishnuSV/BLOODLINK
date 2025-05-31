const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateOTP = require("../utils/generateOTP");
const sendEmail = require("../utils/sendEmail");
const { generateResetToken } = require("../utils/tokenUtils");

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, bloodGroup, location } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      bloodGroup,
      location
    });
    await OTP.deleteMany({ email }); 
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + process.env.OTP_EXPIRES_MINUTES * 60000);

    await OTP.create({ email, otp, expiresAt });

    await sendEmail({
      to: email,
      subject: "BloodLink Email Verification",
      html: `<h2>Your OTP is: <strong>${otp}</strong></h2><p>It expires in ${process.env.OTP_EXPIRES_MINUTES} minutes.</p>`
    });

    res.status(201).json({ message: "User registered. OTP sent to email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed." });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!record || record.otp !== String(otp) || record.expiresAt < new Date()) {
      console.log("sent otp:",otp);
      console.log("Stored OTP:", record?.otp);
      console.log("Stored Expiry:", record?.expiresAt);
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    await User.updateOne({ email }, { $set: { isVerified: true } });
    await OTP.deleteMany({ email });

    res.json({ message: "Email verified successfully." });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed." });
  }
};

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found." });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });
  
      if (!user.isVerified) {
        return res.status(403).json({ message: "Please verify your email first." });
      }
  
      const payload = {
        userId: user._id,
        email: user.email,
        bloodGroup: user.bloodGroup
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d"
      });
  
      res.status(200).json({
        message: "Login successful.",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          bloodGroup: user.bloodGroup,
          location: user.location,
          badges: user.badges,
          donatedTimes: user.donatedTimes
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Login failed." });
    }
  };
  
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const { token, hash } = generateResetToken();
  user.resetToken = hash;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 10; // 10 min
  await user.save();

  const resetLink = `https://yourfrontend.com/reset-password/${token}`;
  await sendEmail(email, "Reset your BloodLink password", `Click to reset: ${resetLink}`);

  res.json({ message: "Reset link sent" });
};

exports.resetPassword = async (req, res) => {
    const { token, password } = req.body;
    const hashed = crypto.createHash("sha256").update(token).digest("hex");
  
    const user = await User.findOne({
      resetToken: hashed,
      resetTokenExpiry: { $gt: Date.now() }
    });
  
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });
  
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
  
    res.json({ message: "Password reset successfully" });
};

