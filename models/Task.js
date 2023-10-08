import { Schema, model } from "mongoose";
import { Task as task, User as user } from "../constants";

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
    name: {
      type: String,
      required: true,
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
      default: important,
      enum: [normal, important, veryImportant],
    },
    "start-time": {
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
