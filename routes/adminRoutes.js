const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

const { getAllUsers, getAllRequests, sendNotification, manageBadges } = require("../controllers/adminController");

router.get("/users", auth, admin, getAllUsers);
router.get("/requests", auth, admin, getAllRequests);
router.post("/badge", auth, admin, manageBadges);
router.post("/notification", auth, admin, sendNotification);
router.get("/stats", auth, admin, getDonationStats);

module.exports = router;
