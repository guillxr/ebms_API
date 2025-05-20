/**
 * @module ErrorHandlerMiddleware
 *
 * This module defines an error-handling middleware for Express applications.
 * It catches unhandled errors, logs the error stack, and sends a standardized
 * error response to the client.
 *
 * @requires module:express - Express framework.
 */

/**
 * Middleware for handling errors in the Express application.
 *
 * This function is designed to catch errors that occur during the request lifecycle,
 * log the error stack to the console, and send a standardized JSON response with the
 * status code `500` and the error details.
 *
 * @function
 * @name errorHandler
 * @param {Error} err - The error object passed by the previous middleware or route handler.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} _next - The next middleware function (not used in this case).
 * @returns {void}
 *
 * @example
 * // Use this middleware in an Express app to handle errors
 * const { errorHandler } = require('@middlewares/errorHandler.middleware');
 *
 * const app = express();
 * app.use(errorHandler); // Register the error handler as the last middleware
 */
const errorHandler = (err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    details: err.message,
  });
};

module.exports = { errorHandler };
