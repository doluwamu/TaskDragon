import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { User as user } from "../constants/index.js";

// Clear DB
const clearDB = asyncHandler(async (req, res) => {
  await User.deleteMany({});

  return res.json({ message: "All users cleared" });
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
    role: admin,
  };

  await User.create(newAdmin);

  return res.status(201).json({ message: "Admin user created" });
});

export { clearDB, createAdmin };

// export default clearDB;
