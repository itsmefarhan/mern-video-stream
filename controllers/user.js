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
