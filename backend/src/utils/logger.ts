import path from "path";
import { config } from "../config/app.config";

const isProduction = config.NODE_ENV === "production";

// ANSI escape codes for colors
const COLORS = {
  reset: "\x1b[0m",
  info: "\x1b[33m", // Orange (Yellow is closest)
  debug: "\x1b[32m", // Green
  error: "\x1b[31m", // Red
  warn: "\x1b[33m", // Yellow
};

// Function to format date properly
const getFormattedTimestamp = (): string => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
};

// Function to get the caller's filename from the stack trace
const getFileName = (): string => {
  const error = new Error();
  const stackLines = error.stack?.split("\n") || [];
  const callerLine = stackLines.find((line) => line.includes("src") && !line.includes("logger.ts"));

  if (callerLine) {
    const match = callerLine.match(/\((.*?):\d+:\d+\)/);
    if (match && match[1]) {
      return path.basename(match[1]); // Extract only the filename
    }
  }
  return "unknown-file";
};

// Logger functions with colors
export const logger = {
  info: (message: string, data?: unknown) => {
    console.log(
      `${COLORS.info}[INFO] [${getFormattedTimestamp()}] [${getFileName()}] - ${message}${COLORS.reset}`,
      data || ""
    );
  },
  warn: (message: string, data?: unknown) => {
    console.warn(
      `${COLORS.warn}[WARN] [${getFormattedTimestamp()}] [${getFileName()}] - ${message}${COLORS.reset}`,
      data || ""
    );
  },
  error: (message: string, data?: unknown) => {
    console.error(
      `${COLORS.error}[ERROR] [${getFormattedTimestamp()}] [${getFileName()}] - ${message}${COLORS.reset}`,
      data || ""
    );
  },
  debug: (message: string, data?: unknown) => {
    if (!isProduction) {
      console.debug(
        `${COLORS.debug}[DEBUG] [${getFormattedTimestamp()}] [${getFileName()}] - ${message}${COLORS.reset}`,
        data || ""
      );
    }
  },
};
