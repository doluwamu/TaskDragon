// const jwt = require('jsonwebtoken')
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.username = decoded.UserInfo.username;
    req.email = decoded.UserInfo.email;
    try {
      req.user = await User.findOne({ username: req.username }).select(
        "-password"
      );
    } catch (error) {
      res.json(error);
    }
    next();
  });
};

export const isAdmin = (req, res, next) => {
  const { admin } = req.user;

  if (admin === false)
    return res
      .status(400)
      .json({ message: "You are not authorized(Admins only)" });

  next();
};
