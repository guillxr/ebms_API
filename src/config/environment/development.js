/**
 * Development Application Configuration.
 * 
 * This module exports the configuration settings for the HemoSync API application in the development 
 * environment. It is designed to facilitate debugging and provide more verbose logging for development 
 * purposes.
 *
 * @module config
 * 
 * @example
 * const config = require('@config');
 * console.log(config.appName); // Outputs: HemoSync [DEV]
 * 
 * @returns {Object} The application configuration object.
 * @property {string} appName - The name of the application in the development environment. Defaults to 'HemoSync [DEV]'.
 * @property {string} env - The environment in which the application is running. Defaults to 'development'.
 * @property {number} port - The port number on which the application will listen for incoming requests. Defaults to 3000, 
 *                            but can be overridden by the `PORT` environment variable.
 * @property {boolean} debug - Flag to enable or disable debugging logs. Defaults to true in development.
 * @property {string} logging - The level of logging to be used. Can be 'error', 'warn', 'info', or 'verbose'. Defaults to 'verbose' in development.
 */
module.exports = {
  appName: 'HemoSync [DEV]',
  env: 'development',
  port: process.env.PORT || 3000,
  debug: true,
  logging: 'verbose',
};
