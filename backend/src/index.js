const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const companyRoutes = require("./routes/companies");
const jobRoutes = require("./routes/jobs");
const trendingJobsRoutes = require("./routes/trendingJobs");
const recruiterRoutes = require("./routes/recruiter");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://raunakrana101:raunak123@task.ipcmm.mongodb.net/Naukriclone?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/trending-jobs", trendingJobsRoutes);
app.use("/api/recruiter", recruiterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
