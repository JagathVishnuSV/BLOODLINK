const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { getUserNotifications, markAsRead } = require("../controllers/notificationController");

router.get("/",auth,getUserNotifications);
router.put("/:id/read",auth,markAsRead);

module.exports = router;