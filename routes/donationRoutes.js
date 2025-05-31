const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");
const protect = require("../middlewares/authMiddleware");

router.post("/", protect, donationController.makeDonation); 
router.get("/my", protect, donationController.getMyDonations); 

module.exports = router;
