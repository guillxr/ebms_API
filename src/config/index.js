require('dotenv').config();

const env = process.env.NODE_ENV || 'development';

const environConfig = require(`./environment/${env}`);

const rateLimits = require('./rateLimits.config');
const corsOptions = require('./cors.config');

module.exports = {
  ...environConfig,
  rateLimits,
  corsOptions,
};
