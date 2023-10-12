import { Schema, model } from "mongoose";
import { User as user } from "../constants/index.js";

const { USER, role } = user;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: role.user,
      lowercase: true,
      enum: [role.admin, role.user],
    },
    userSecrets: {
      type: {
        color: { type: String, lowercase: true },
        DOB: { type: String },
        food: { type: String, lowercase: true },
      },
      required: true,
      default: {
        color: "",
        DOB: null,
        food: "",
      },
    },
    allowPasswordReset: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model(USER, userSchema);

export default User;

// DOB = Date Of Birth
