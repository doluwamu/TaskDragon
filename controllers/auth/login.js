import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// @desc Refresh
// @route GET /api/v1/auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } = process.env;

  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if ((!username && !email) || !password)
    return res.status(400).json({ message: "All fields are required" });

  // if (email || !email.match(regex))
  //   return res.status(400).json({ message: "Invalid email" });

  const foundUser =
    (await User.findOne({ username }).select("+password").exec()) ||
    (await User.findOne({ email }).select("+password").exec());

  if (!foundUser)
    return res.status(400).json({ message: "User does not exist" });

  try {
  } catch (error) {
    return res.status(500).json(error);
  }

  const matchingPasswords = await bcrypt.compare(password, foundUser.password);

  if (!matchingPasswords)
    return res
      .status(400)
      .json({ message: "Incorrect password. Please try again." });

  const accessToken = jwt.sign(
    {
      username: foundUser.username,
      email: foundUser.email,
      role: foundUser.role,
      verified: foundUser.verified,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );

  const refreshToken = jwt.sign(
    {
      username: foundUser.username,
      email: foundUser.email,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  if (NODE_ENV === "development") {
    // Create cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.cookie("access", accessToken, {
      httpOnly: true, //accessible only by web server
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
  }

  if (NODE_ENV === "production") {
    // Create cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.cookie("access", accessToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
  }

  const user =
    (await User.findOne({ username }).select("-password").exec()) ||
    (await User.findOne({ email }).select("-password").exec());

  return res.json({
    // accessToken,
    user,
  });
});

export default login;
