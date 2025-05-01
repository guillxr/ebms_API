const RATE_LIMITS = {
  DEFAULT: {
    windowMs: 1 * 60 * 1000,
    max: 2,
    message: 'Too many requests, please try again later.',
  },
};

module.exports = { RATE_LIMITS };
