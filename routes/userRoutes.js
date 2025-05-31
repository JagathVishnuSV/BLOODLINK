const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/me", authMiddleware, userController.getMe);
router.put("/me", authMiddleware, userController.updateMe);
router.get("/:id", userController.getUserById); 

module.exports = router;
