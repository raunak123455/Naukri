const express = require("express");
const router = express.Router();
const {
  getJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByRecruiter,
  applyForJob,
} = require("../controllers/jobsController");
const recruiterAuth = require("../middleware/recruiterAuth");
const auth = require("../middleware/auth");

// Public routes
router.get("/", getJobs);
router.get("/:id", getJobById);

// Protected routes (require authentication)
router.post("/", recruiterAuth, createJob);
router.put("/:id", recruiterAuth, updateJob);
router.delete("/:id", recruiterAuth, deleteJob);
router.get("/recruiter/jobs", recruiterAuth, getJobsByRecruiter);

// User routes
router.post("/:id/apply", auth, applyForJob);

module.exports = router;
