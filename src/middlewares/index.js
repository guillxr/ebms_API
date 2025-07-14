/**
 * @module MiddlewareLoader
 *
 * This module is responsible for loading and applying various middlewares to an Express
 * application.
 * These middlewares enhance security, performance, and error handling,
 * as well as provide rate limiting and debugging functionality.
 *
 * @requires module:helmet - Middleware for securing HTTP headers.
 * @requires module:compression - Middleware for compressing response bodies.
 * @requires module:cors - Middleware for enabling Cross-Origin Resource Sharing (CORS).
 * @requires module:@config - Application configuration, including CORS options.
 * @requires module:express - Express framework.
 * @requires module:./rateLimits.middleware - Rate limiting middleware for controlling request frequency.
 * @requires module:./debugLogger.middleware - Middleware for logging debug information.
 * @requires module:./errorHandler.middleware - Middleware for handling errors in the application.
 */

/**
 * Loads and applies multiple middlewares to the given Express application.
 *
 * This function sets up essential middlewares for the Express app, such as security
 * headers, CORS, compression, JSON body parsing, rate limiting, error handling,
 * and debug logging.
 *
 * @function
 * @name loadMiddlewares
 * @param {Object} app - The Express application instance to apply the middlewares to.
 * @returns {void}
 *
 * @example
 * const express = require('express');
 * const loadMiddlewares = require('@middlewares/loadMiddlewares');
 *
 * const app = express();
 * loadMiddlewares(app);
 * app.listen(3000, () => {
 *   console.log('Server running on port 3000');
 * });
 */
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const config = require('@config');
const express = require('express');
const cookieParser = require('cookie-parser');

const { createLimiter } = require('./rateLimits.middleware');
const { debugLogger } = require('./debugLogger.middleware');
const { errorHandler } = require('./errorHandler.middleware');

const loadMiddlewares = (app) => {
  // Apply middlewares in sequence
  app.use(helmet()); // Adds security-related HTTP headers
  app.use(cors(config.corsOptions)); // Configures CORS using the options from config

  app.use(compression()); // Compresses response bodies for better performance
  app.use(express.json()); // Parses incoming JSON payloads
  app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded payloads
  app.use(cookieParser()); // Parses cookies from the request headers

  app.use(createLimiter()); // Applies rate limiting middleware
  app.use(errorHandler); // Applies custom error handling middleware
  app.use(debugLogger); // Logs debugging information for every request
};

module.exports = loadMiddlewares;
