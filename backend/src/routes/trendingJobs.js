const express = require("express");
const router = express.Router();
const {
  getTrendingJobs,
  getTrendingJobsByCategory,
  createTrendingJob,
  createBulkTrendingJobs,
  getTrendingJob,
  updateTrendingJob,
  deleteTrendingJob,
  applyForTrendingJob,
} = require("../controllers/trendingJobsController");
const auth = require("../middleware/auth");

// Get all trending jobs
router.get("/", getTrendingJobs);

// Get trending jobs by category
router.get("/category/:category", getTrendingJobsByCategory);

// Create a new trending job
router.post("/", createTrendingJob);

// Create multiple trending jobs
router.post("/bulk", createBulkTrendingJobs);

// Get a single trending job
router.get("/:id", getTrendingJob);

// Update a trending job
router.put("/:id", updateTrendingJob);

// Delete a trending job
router.delete("/:id", deleteTrendingJob);

// Apply for a trending job
router.post("/:id/apply", auth, applyForTrendingJob);

module.exports = router;
