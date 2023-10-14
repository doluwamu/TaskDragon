import { Schema, model } from "mongoose";
import { Task as task, User as user } from "../constants/index.js";

const {
  TASK,
  Status: { undone, doing, done },
  Priority: { normal, important, veryImportant },
} = task;
const { USER } = user;

const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxLength: 200,
    },
    description: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: undone,
      enum: [undone, doing, done],
    },
    priority: {
      type: String,
      required: true,
      default: important,
      enum: [normal, important, veryImportant],
    },
    startTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Task = model(TASK, taskSchema);

export default Task;
