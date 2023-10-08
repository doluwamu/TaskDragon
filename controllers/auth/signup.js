import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

const signup = asyncHandler(async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (!username || !email || !password || !confirmPassword)
    return res.status(400).json({ message: "All fields are required" });

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

  return res.json({
    message: "Account created. Please login",
    user: newUser._id,
  });
});

export default signup;
