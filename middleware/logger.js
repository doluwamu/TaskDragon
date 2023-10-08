// const { format } = require("date-fns");
// const { v4: uuid } = require('uuid')
// const fs = require('fs')
// const fsPromises = require('fs').promises
// import path from "path";
import { fileURLToPath } from "url";

import { format } from "date-fns";
import { v4 } from "uuid";

import fs from "fs";
import path from "path";

const uuid = v4;

const fsPromises = fs.promises;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "yyyyMMdd\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};

export { logEvents, logger };
