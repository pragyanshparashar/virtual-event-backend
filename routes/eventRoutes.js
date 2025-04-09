const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, eventController.createEvent);

module.exports = router;
