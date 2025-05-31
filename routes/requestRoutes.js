const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const {
    createRequest,
    getNearbyRequests,
    fulfillRequest,
    getMyRequests,
    searchRequests,
    getRequestById
} = require("../controllers/requestController");

router.post("/",auth,createRequest);
router.get("/nearby",auth,getNearbyRequests);
router.put("/:id/fulfill",auth,fulfillRequest);
router.get("/me",auth,getMyRequests);
router.get("/search", searchRequests);
router.get('/:id', auth, getRequestById);

module.exports = router;
