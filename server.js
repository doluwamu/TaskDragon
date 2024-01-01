import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Middlewares
import errorHandler from "./middleware/errorHandler.js";
import { logger, logEvents } from "./middleware/logger.js";

// Configs
// import corsOptions from "./config/corsOptions.js";
import connectDB from "./config/dbconnection.js";

// Routes
import AuthRoutes from "./routes/auth.js";
import UserRoutes from "./routes/user.js";
import TaskRoutes from "./routes/task.js";
import EventRoutes from "./routes/event.js";
import DangerRoutes from "./routes/danger.js";

dotenv.config();

connectDB();

const { PORT, NODE_ENV } = process.env;

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// const origin = "https://taskdragon.netlify.app";
const origin =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5173"
    : "https://taskdragon.netlify.app";

app.use(cookieParser());
app.use(logger);

app.use(
  cors({
    credentials: true,
    origin,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/tasks", TaskRoutes);
app.use("/api/v1/events", EventRoutes);

if (NODE_ENV === "development") {
  // Danger zone(Remove after development)
  app.use("/api/v1/danger", DangerRoutes);
}

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
