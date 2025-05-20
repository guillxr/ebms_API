/**
 * @module RateLimitMiddleware
 *
 * This module provides a function to create rate limiters using the `express-rate-limit`
 * library, protecting routes from excessive requests by limiting the number of requests
 * a user can make in a given time frame.
 *
 * @requires module:@config/rateLimits.config - Configuration for rate limits.
 * @requires module:express-rate-limit - A library for setting up rate limiting for
 * Express routes.
 */

/**
 * Creates a rate limiter middleware using the `express-rate-limit` library.
 *
 * This function configures a rate limiter with custom options and a handler for when
 * the rate limit is exceeded. The handler logs a warning about the blocked request and
 * sends a `429` response with an error message.
 *
 * @function
 * @name createLimiter
 * @param {Object} option - Additional options to customize the rate limiter, such as
 * max requests or time window.
 * @returns {Function} An Express middleware function that enforces rate limiting.
 *
 * @example
 * const { createLimiter } = require('@middlewares/rateLimit.middleware');
 *
 * const limiter = createLimiter({ max: 100, windowMs: 15 * 60 * 1000 }); // Limit 100 requests per 15 minutes
 * app.use('/some-route', limiter, (req, res) => {
 *   res.send('Request successful');
 * });
 */
const { RATE_LIMITS } = require('@config/rateLimits.config');
const rateLimit = require('express-rate-limit');

const createLimiter = (option) => {
  return rateLimit({
    ...RATE_LIMITS.DEFAULT,
    ...option,
    handler: (req, res) => {
      console.warn(
        `[RATE LIMIT] Request blocked: IP ${req.ip} on route ${req.originalUrl}`
      );
      res.status(429).json({
        error: 'Too many requests, please try again later.',
      });
    },
  });
};

module.exports = { createLimiter };
