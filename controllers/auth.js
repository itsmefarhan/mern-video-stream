const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Login user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

// Get logged in user
exports.loggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password -__v");
    res.json(user);
  } catch (error) {
    // console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

// Authenticate user middleware
exports.requireLogin = (req, res, next) => {
  if (req.headers.authorization) {
    // Get token from header
    const token = req.headers.authorization.split(" ")[1];
    // Verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // Attach token with request
    req.user = decode;
    next();
  } else {
    return res.status(400).json({ message: "Unauthorized" });
  }
};
