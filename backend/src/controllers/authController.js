const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "30d",
  });
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        workStatus: user.workStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Register Controller
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, mobile, workStatus, receiveUpdates } =
      req.body;

    // Validate required fields
    if (!fullName || !email || !password || !mobile || !workStatus) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    // Validate work status
    if (!["experienced", "fresher"].includes(workStatus)) {
      return res.status(400).json({ message: "Invalid work status" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      fullName,
      email,
      password,
      mobile,
      workStatus,
      receiveUpdates: receiveUpdates || false,
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        workStatus: user.workStatus,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
