/**
 * @module DebugLoggerMiddleware
 * 
 * This module defines a debugging middleware for Express applications. 
 * It logs detailed information about incoming requests, including method, URL, headers, 
 * and body, if the application is configured to log debug information.
 * 
 * @requires module:@utils/logger - Logger utility for logging messages.
 * @requires module:@config - Application configuration, including debug and logging settings.
 * @requires module:express - Express framework.
 */

/**
 * Middleware for logging debug information about incoming requests.
 * 
 * This function logs the HTTP method, URL, headers, and body of each incoming request 
 * to the console, provided that debugging is enabled in the configuration. The log 
 * level is controlled by the `config.logging` setting. If the logging level is set to 
 * `'verbose'`, it includes detailed information such as headers and body content.
 * 
 * @function
 * @name debugLogger
 * @param {Object} req - The Express request object containing request details.
 * @param {Object} res - The Express response object (not used in this middleware).
 * @param {Function} next - The next middleware function to pass control to the next middleware.
 * @returns {void} 
 * 
 * @example
 * // Use this middleware to log debug information for incoming requests
 * const { debugLogger } = require('@middlewares/debugLogger.middleware');
 * 
 * const app = express();
 * app.use(debugLogger); // Register debug logger middleware in the application
 */
const log = require('@utils/logger');
const config = require('@config');

const debugLogger = (req, res, next) => {
  try {
    // Check if debug logging is enabled in the configuration
    if (config.debug) {
      const timestrap = new Date().toISOString();
      const { method, originalUrl, headers, body } = req;

      const logMessage = `[DEBUG] [${timestrap}] ${method} ${originalUrl}`;
      log(logMessage, config.logging);

      // If the logging level is 'verbose', log the headers and body
      if (config.logging === 'verbose') {
        log(`[DEBUG] Headers: ${JSON.stringify(headers)}`, config.logging);
        log(`[DEBUG] body: ${JSON.stringify(body)}`, config.logging);
      }
    }
  } catch (error) {
    console.error('[Logger Error]', error);
  } finally {
    // Proceed to the next middleware in the stack
    next();
  }
};

module.exports = { debugLogger };
