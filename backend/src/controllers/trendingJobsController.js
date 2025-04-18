const TrendingJob = require("../models/TrendingJob");

// Get all trending jobs
const getTrendingJobs = async (req, res) => {
  try {
    const jobs = await TrendingJob.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get trending jobs by category
const getTrendingJobsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const jobs = await TrendingJob.find({ category });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new trending job
const createTrendingJob = async (req, res) => {
  const job = new TrendingJob(req.body);
  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create multiple trending jobs
const createBulkTrendingJobs = async (req, res) => {
  try {
    const jobs = req.body; // Array of job objects
    if (!Array.isArray(jobs)) {
      return res
        .status(400)
        .json({ message: "Request body must be an array of jobs" });
    }

    const createdJobs = await TrendingJob.insertMany(jobs);
    res.status(201).json({
      message: `${createdJobs.length} jobs created successfully`,
      jobs: createdJobs,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single trending job
const getTrendingJob = async (req, res) => {
  try {
    const job = await TrendingJob.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a trending job
const updateTrendingJob = async (req, res) => {
  try {
    const job = await TrendingJob.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    Object.assign(job, req.body);
    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a trending job
const deleteTrendingJob = async (req, res) => {
  try {
    const job = await TrendingJob.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    await job.remove();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply for a trending job
const applyForTrendingJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    // Check if job exists
    const job = await TrendingJob.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user has already applied
    if (job.applicants.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    // Add user to applicants array using findByIdAndUpdate
    await TrendingJob.findByIdAndUpdate(
      jobId,
      { $push: { applicants: userId } },
      { new: true }
    );

    res.json({ success: true, message: "Successfully applied for the job" });
  } catch (error) {
    console.error("Apply error:", error);
    res
      .status(500)
      .json({ message: "Error applying for job", error: error.message });
  }
};

module.exports = {
  getTrendingJobs,
  getTrendingJobsByCategory,
  createTrendingJob,
  createBulkTrendingJobs,
  getTrendingJob,
  updateTrendingJob,
  deleteTrendingJob,
  applyForTrendingJob,
};
