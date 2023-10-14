// const jwt = require('jsonwebtoken')
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { User as user } from "../constants/index.js";

export const userLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  const token = authHeader.split(" ")[1];

  jwt.decode();

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.username = decoded.username;
    req.email = decoded.email;
    req.verified = decoded.verified;
    req.role = decoded.role;
    try {
      req.user = await User.findOne({ username: req.username }).exec();
    } catch (error) {
      res.json(error);
    }
    next();
  });
};

export const userIsVerified = (req, res, next) => {
  const { verified } = req;

  if (verified === false)
    return res.status(400).json({ message: "User not verified" });

  next();
};

export const isAdmin = (req, res, next) => {
  const { role } = req;

  const {
    role: { admin },
  } = user;

  if (role !== admin)
    return res
      .status(400)
      .json({ message: "You are not authorized(Admins only)" });

  next();
};
