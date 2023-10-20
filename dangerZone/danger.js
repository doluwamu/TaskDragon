import User from "../models/User.js";
import Task from "../models/Task.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User as user } from "../constants/index.js";

// Clear DB
const clearDB = asyncHandler(async (req, res) => {
  await User.deleteMany({});
  await Task.deleteMany({});

  return res.json({ message: "DB cleared" });
});

// Create Base Admin User
const createAdmin = asyncHandler(async (req, res) => {
  const {
    role: { admin },
  } = user;

  const foundAdmin =
    (await User.findOne({ username: "admin" })) ||
    (await User.findOne({ email: "admin@gmail.com" }));

  if (foundAdmin) return res.status(403).json({ message: "Admin exists" });

  const newAdmin = {
    username: "admin",
    email: "admin@gmail.com",
    password: await bcrypt.hash("adminUser", 10),
    verified: true,
    userSecrets: {
      color: "yellow",
      DOB: "2003-06-23",
      food: "bread",
    },
    secretSet: true,
    role: admin,
  };

  await User.create(newAdmin);

  return res.status(201).json({ message: "Admin user created" });
});

export { clearDB, createAdmin };

// export default clearDB;
