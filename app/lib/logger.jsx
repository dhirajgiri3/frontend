// src/app/lib/logger.jsx

// Log levels in order of severity
const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
};

// Current log level - can be configured based on environment
const currentLogLevel =
  process.env.NODE_ENV === "production" ? LOG_LEVELS.ERROR : LOG_LEVELS.DEBUG;

// Helper to check if a log level should be shown
const shouldLog = (level) => level <= currentLogLevel;

// Helper to get timestamp
const getTimestamp = () => new Date().toISOString();

// Helper to format messages
const formatMessage = (level, message, ...args) => {
  const timestamp = getTimestamp();
  const formattedArgs = args.map((arg) => {
    if (arg instanceof Error) {
      return arg.stack || arg.message;
    }
    return typeof arg === "object" ? JSON.stringify(arg) : arg;
  });

  return `[${timestamp}] [${level}] ${message} ${formattedArgs.join(" ")}`;
};

// Main logger object
const logger = {
  error: (message, ...args) => {
    if (shouldLog(LOG_LEVELS.ERROR)) {
      console.error(formatMessage("ERROR", message, ...args));
    }
  },

  warn: (message, ...args) => {
    if (shouldLog(LOG_LEVELS.WARN)) {
      console.warn(formatMessage("WARN", message, ...args));
    }
  },

  info: (message, ...args) => {
    if (shouldLog(LOG_LEVELS.INFO)) {
      console.info(formatMessage("INFO", message, ...args));
    }
  },

  debug: (message, ...args) => {
    if (shouldLog(LOG_LEVELS.DEBUG)) {
      console.debug(formatMessage("DEBUG", message, ...args));
    }
  },

  // Group related logs
  group: (label) => {
    if (typeof console.group === "function") {
      console.group(label);
    }
  },

  groupEnd: () => {
    if (typeof console.groupEnd === "function") {
      console.groupEnd();
    }
  },

  // Measure performance
  time: (label) => {
    if (typeof console.time === "function") {
      console.time(label);
    }
  },

  timeEnd: (label) => {
    if (typeof console.timeEnd === "function") {
      console.timeEnd(label);
    }
  },
};

export default logger;
