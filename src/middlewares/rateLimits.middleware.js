const { RATE_LIMITS } = require('@config/rateLimits.config');
const rateLimit = require('express-rate-limit');

const createLimiter = (option = {}) => {
  return rateLimit({
    ...RATE_LIMITS.DEFAULT,
    ...option,
    handler: (req, res) => {
      console.warn(`[RATE LIMIT] Request blocked: IP ${req.ip} on route ${req.originalUrl}`);
      res.status(429).json({
        error: 'Too many requests, please try again later.',
      });
    },
  });
};

module.exports = { createLimiter };
