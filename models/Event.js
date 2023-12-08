import { Schema, model } from "mongoose";
import { Event as event, User as user } from "../constants/index.js";

const {
  EVENT,
  Status: { upcoming, ongoing, ended },
} = event;

const { USER } = user;

const eventSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: USER,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 200,
    },
    description: {
      type: String,
      maxLength: 2000,
    },
    status: {
      type: String,
      required: true,
      default: upcoming,
      enum: [upcoming, ongoing, ended],
    },
    reminder: {
      type: Boolean,
      required: true,
      default: false,
    },
    startDate: {
      type: Date,
      default: null,
    },
    endDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Event = model(EVENT, eventSchema);
export default Event;
