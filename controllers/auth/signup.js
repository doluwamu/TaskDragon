import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

// @desc Refresh
// @route GET /api/v1/auth/signup
// @access Public
const signup = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!username || !email || !password || !confirmPassword)
    return res.status(400).json({ message: "All fields are required" });

  if (!email.match(regex))
    return res.status(400).json({ message: "Invalid email" });

  if (password !== confirmPassword)
    return res.status(400).json({ message: "Passwords don't match" });

  const userWithUsername = await User.findOne({ username });

  if (userWithUsername)
    return res.status(400).json({ message: "Username taken" });

  const userWithEmail = await User.findOne({ email });

  if (userWithEmail)
    return res.status(400).json({ message: "User with this email exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    message: "Account created. Please login",
    user: newUser._id,
  });
});

export default signup;
