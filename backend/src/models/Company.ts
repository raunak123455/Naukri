import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    required: true,
    enum: ["MNC", "Indian MNC", "Startup"],
  },
  industry: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  foundedYear: {
    type: Number,
  },
  employeeCount: {
    type: String,
  },
  activeJobs: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
