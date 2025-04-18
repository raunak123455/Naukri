const mongoose = require("mongoose");

const trendingJobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  company: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
  },
  experience: {
    type: String,
    required: [true, "Experience is required"],
  },
  salary: {
    type: String,
    required: [true, "Salary is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  skills: [
    {
      type: String,
    },
  ],
  postedDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  requirements: [
    {
      type: String,
    },
  ],
  benefits: [
    {
      type: String,
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
  workMode: {
    type: String,
    enum: ["Work from office", "Remote", "Hybrid"],
    required: [true, "Work mode is required"],
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },
  category: {
    type: String,
    enum: [
      "remote-jobs",
      "mnc-jobs",
      "it-jobs",
      "fresher-jobs",
      "marketing-jobs",
      "hr-jobs",
    ],
    required: [true, "Category is required"],
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TrendingJob = mongoose.model("TrendingJob", trendingJobSchema);

module.exports = TrendingJob;
