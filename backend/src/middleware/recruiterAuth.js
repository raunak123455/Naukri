const jwt = require("jsonwebtoken");
const Recruiter = require("../models/Recruiter");

const recruiterAuth = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    // Find recruiter by id
    const recruiter = await Recruiter.findById(decoded.id).select("-password");

    if (!recruiter) {
      return res.status(401).json({ message: "Token is not valid" });
    }

    // Add recruiter to request object
    req.recruiter = recruiter;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = recruiterAuth;
