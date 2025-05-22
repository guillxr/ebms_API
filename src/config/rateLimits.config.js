/**
 * Configuration module for rate limiting.
 *
 * Defines the rate limiting parameters for the application.
 *
 * @module rateLimits.config
 */

/**
 * Rate limiting configuration object.
 *
 * This object specifies the default rate limit settings for the application,
 * including the time window in milliseconds, the maximum number of requests allowed,
 * and the error message to be returned when the limit is exceeded.
 *
 * @constant
 * @type {Object}
 * @property {Object} DEFAULT - Default rate limiting settings.
 * @property {number} DEFAULT.windowMs - Time window in milliseconds (default is 10 minutes).
 * @property {number} DEFAULT.max - Maximum number of requests allowed within the window (default is 40).
 * @property {string} DEFAULT.message - Message returned when the rate limit is exceeded.
 */
const RATE_LIMITS = {
  DEFAULT: {
    windowMs: 10 * 60 * 1000, // 10 minutes in milliseconds
    max: 40, // max number of requests
    message: 'Too many requests, please try again later.',
  },
};

module.exports = { RATE_LIMITS };
