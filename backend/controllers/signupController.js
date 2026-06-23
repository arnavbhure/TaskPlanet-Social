const User = require("../models/user.schema");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingEmail = await User.findOne({ email: email.toLowerCase() });

    if (existingEmail) {
      return res
        .status(409)
        .json({ message: "Email already registered", success: false });
    }

    const existingUsername = await User.findOne({
      username: username.toLowerCase(),
    });

    if (existingUsername) {
      return res
        .status(409)
        .json({ message: "Username already taken", success: false });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password_hash,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully. Login to Continue",
    });
  } catch (err) {
    console.log("Error in signupController:", err.message || err);
    return res.status(500).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
};

module.exports = signupController;
