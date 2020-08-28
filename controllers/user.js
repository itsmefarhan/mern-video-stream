const User = require("../models/user");
const bcrypt = require("bcryptjs");

// Register user
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashed_password = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashed_password,
    });
    await user.save();
    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    // console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -__v");
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

// Get user by id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select(
      "-password -__v"
    );
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  // Check authorization
  if (req.params.userId !== req.user._id) {
    return res.status(403).json({ message: "Access Denied" });
  }

  try {
    await User.findOneAndUpdate(req.params.userId, req.body, {
      new: true,
    }).select("-password -__v");
    return res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  // Check authorization
  if (req.params.userId !== req.user._id) {
    return res.status(403).json({ message: "Access Denied" });
  }
  try {
    await User.findOneAndDelete(req.params.userId);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};
