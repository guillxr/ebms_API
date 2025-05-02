/**
 * Configuration module for the application.
 *
 * This module loads the environment-specific configuration, along with other
 * essential configurations like rate limits, CORS options, and database setup.
 * It also loads environment variables from the `.env` file.
 *
 * @module config
 */

/**
 * @constant
 * @type {string}
 * @default 'development'
 * @description The current environment, loaded from the `NODE_ENV` environment variable or set to 'development' by default.
 */
const env = process.env.NODE_ENV || 'development';

/**
 * Loads the environment-specific configuration from the `environment` folder.
 *
 * Based on the value of `env`, this imports the corresponding environment configuration
 * file, such as `development.js`, `production.js`, etc.
 *
 * @constant
 * @type {Object}
 */
require('dotenv').config();
const environConfig = require(`./environment/${env}`);
const rateLimits = require('./rateLimits.config');
const corsOptions = require('./cors.config');
const prisma = require('./database.config');

/**
 * Exports all configurations merged into one object.
 *
 * This module combines the environment-specific configuration, rate limits, CORS options,
 * and Prisma database setup and exports them together for use throughout the application.
 *
 * @module config
 * @returns {Object} The complete configuration object.
 */
module.exports = {
  ...environConfig,
  rateLimits,
  corsOptions,
  prisma,
};
