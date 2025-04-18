const express = require("express");
const router = express.Router();
const recruiterController = require("../controllers/recruiterController");
const recruiterAuth = require("../middleware/recruiterAuth");

// Public routes
router.post("/login", recruiterController.login);
router.post("/register", recruiterController.register);

// Protected routes (require authentication)
router.get("/profile", recruiterAuth, recruiterController.getProfile);
router.put("/profile", recruiterAuth, recruiterController.updateProfile);

module.exports = router;
