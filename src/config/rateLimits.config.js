const RATE_LIMITS = {
  DEFAULT: {
    windowMs: 10 * 60 * 1000,
    max: 40,
    message: 'Too many requests, please try again later.',
  },
};

module.exports = { RATE_LIMITS };
