const Recruiter = require("../models/Recruiter");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (recruiterId) => {
  return jwt.sign(
    { id: recruiterId },
    process.env.JWT_SECRET || "your-secret-key",
    {
      expiresIn: "30d",
    }
  );
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if recruiter exists
    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await recruiter.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(recruiter._id);

    res.status(200).json({
      token,
      recruiter: {
        id: recruiter._id,
        email: recruiter.email,
        fullName: recruiter.fullName,
        companyName: recruiter.companyName,
        designation: recruiter.designation,
        isVerified: recruiter.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Register Controller
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, mobile, companyName, designation } =
      req.body;

    // Validate required fields
    if (
      !fullName ||
      !email ||
      !password ||
      !mobile ||
      !companyName ||
      !designation
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Check if recruiter already exists
    let recruiter = await Recruiter.findOne({ email });
    if (recruiter) {
      return res.status(400).json({ message: "Recruiter already exists" });
    }

    // Create new recruiter
    recruiter = new Recruiter({
      fullName,
      email,
      password,
      mobile,
      companyName,
      designation,
    });

    await recruiter.save();

    // Generate token
    const token = generateToken(recruiter._id);

    res.status(201).json({
      token,
      recruiter: {
        id: recruiter._id,
        email: recruiter.email,
        fullName: recruiter.fullName,
        companyName: recruiter.companyName,
        designation: recruiter.designation,
        isVerified: recruiter.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Recruiter Profile
exports.getProfile = async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.recruiter.id).select(
      "-password"
    );

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    res.status(200).json(recruiter);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Recruiter Profile
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, mobile, companyName, designation } = req.body;

    const recruiter = await Recruiter.findById(req.recruiter.id);

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found" });
    }

    // Update fields if provided
    if (fullName) recruiter.fullName = fullName;
    if (mobile) recruiter.mobile = mobile;
    if (companyName) recruiter.companyName = companyName;
    if (designation) recruiter.designation = designation;

    await recruiter.save();

    res.status(200).json({
      message: "Profile updated successfully",
      recruiter: {
        id: recruiter._id,
        email: recruiter.email,
        fullName: recruiter.fullName,
        companyName: recruiter.companyName,
        designation: recruiter.designation,
        isVerified: recruiter.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
