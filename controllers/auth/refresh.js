import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// @desc Refresh
// @route GET /api/v1/auth/refresh
// @access Public - because access token has expired
const refreshSession = asyncHandler(async (req, res) => {
  const { cookies } = req;

  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } = process.env;

  if (!cookies?.jwt) return res.status(404).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(400).json(err);

      const foundUser =
        (await User.findOne({ username: decoded.username }).exec()) ||
        (await User.findOne({ email: decoded.email }).exec());

      if (!foundUser) return res.status(404).json({ message: "Unauthorized" });

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

      if (NODE_ENV === "development") {
        res.cookie("access", accessToken, {
          httpOnly: true, //accessible only by web server
          maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
        });
      }

      if (NODE_ENV === "production") {
        res.cookie("access", accessToken, {
          httpOnly: true, //accessible only by web server
          secure: true, //https
          sameSite: "none", //cross-site cookie
          maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
        });
      }

      return res.json({
        // accessToken,
        user: foundUser,
      });
    })
  );
});

export default refreshSession;