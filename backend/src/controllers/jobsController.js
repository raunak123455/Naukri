const Job = require("../models/Job");

// Get all jobs with optional filters
const getJobs = async (req, res) => {
  try {
    const {
      keyword,
      experience,
      location,
      workMode,
      department,
      salary,
      company,
    } = req.query;

    let query = {};

    // Handle keyword search
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
        { skills: { $regex: keyword, $options: "i" } },
      ];
    }

    // Handle company filter
    if (company) {
      query.company = { $regex: company, $options: "i" };
    }

    // Handle experience range
    if (experience) {
      const [minExp, maxExp] = experience.split("-");
      if (maxExp) {
        // For ranges like "0-5 Yrs"
        const maxYears = parseInt(maxExp);
        query.$or = [
          // Exact match
          { experience: experience },
          // Jobs with ranges that fall within the selected range
          {
            experience: {
              $regex: new RegExp(`^[0-${maxYears}]-[0-${maxYears}] Yrs$`),
            },
          },
          // Jobs with single number experience that falls within the range
          {
            experience: {
              $regex: new RegExp(`^[0-${maxYears}] Yrs$`),
            },
          },
        ];
      } else if (experience.includes("+")) {
        // For "15+ Yrs"
        const minYears = parseInt(experience);
        query.experience = {
          $or: [
            { $regex: `^${minYears}\\+` },
            {
              $regex: new RegExp(
                `^[${minYears}-9]\\d*-[${minYears}-9]\\d* Yrs$`
              ),
            },
          ],
        };
      }
    }

    // Handle location search
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Handle work mode filter
    if (workMode) {
      const workModes = workMode.split(",");
      query.workMode = { $in: workModes };
    }

    // Handle department filter
    if (department) {
      const departments = department.split(",");
      query.department = { $in: departments };
    }

    // Handle salary filter
    if (salary) {
      const salaryRanges = salary.split(",");
      query.salary = { $in: salaryRanges };
    }

    const jobs = await Job.find(query);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

// Create a new job or multiple jobs
const createJob = async (req, res) => {
  try {
    // Check if the request body is an array for bulk creation
    if (Array.isArray(req.body)) {
      // Add recruiterId to each job in the array
      const jobsWithRecruiter = req.body.map((job) => ({
        ...job,
        recruiterId: req.recruiter._id,
      }));

      const jobs = await Job.insertMany(jobsWithRecruiter);
      res.status(201).json(jobs);
    } else {
      // Single job creation
      const job = new Job({
        ...req.body,
        recruiterId: req.recruiter._id,
      });
      await job.save();
      res.status(201).json(job);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get job by ID
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: "Error fetching job", error });
  }
};

// Update job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res.status(400).json({ message: "Error updating job", error });
  }
};

// Delete job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};

// Get jobs by recruiter ID
const getJobsByRecruiter = async (req, res) => {
  try {
    const recruiterId = req.recruiter._id;
    const jobs = await Job.find({ recruiterId }).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Apply for a job
const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    // Check if job exists
    const job = await Job.findById(jobId);
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
    await Job.findByIdAndUpdate(
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
  getJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
  getJobsByRecruiter,
  applyForJob,
};
