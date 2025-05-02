/**
 * @module Logger
 * 
 * This module provides a logging utility that logs messages to the console at different levels (verbose, info, warn, error).
 * The logging level is configurable via the `config.logging` setting.
 * 
 * @requires module:@config - The configuration file that contains the logging level setting.
 * 
 * @example
 * // To use the logger, simply require the module and call the log function:
 * const log = require('@utils/logger');
 * log('This is an informational message');
 * 
 * // You can also specify a log level:
 * log('This is an error message', 'error');
 */

/**
 * Logs a message to the console based on the configured logging level.
 * 
 * The `log` function checks the configured logging level (from the config file) and only logs messages
 * if their level is equal to or greater than the configured level. If an unknown logging level is provided,
 * a warning is shown in the console.
 * 
 * @function
 * @name log
 * @memberof module:Logger
 * @param {string} message - The message to be logged.
 * @param {string} [level='info'] - The log level for the message. Can be 'verbose', 'info', 'warn', or 'error'.
 * @returns {void}
 * @throws {Error} If the `level` or `config.logging` is invalid.
 */
const config = require('@config');

const log = (message, level = 'info') => {
  const levels = ['verbose', 'info', 'warn', 'error'];

  const currentLevel = levels.indexOf(config.logging);
  const messageLevel = levels.indexOf(level);

  if (currentLevel === -1 || messageLevel === -1) {
    console.warn(
      `[WARN] Unknown logging level used: ${config.logging} or ${level}`
    );
    return;
  }

  if (messageLevel >= currentLevel) {
    console.log(`[${level.toUpperCase()}] ${message}`);
  }
};

module.exports = log;
