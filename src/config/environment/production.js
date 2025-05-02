/**
 * Application Configuration.
 * 
 * This module exports the configuration settings for the HemoSync API application. It defines critical
 * parameters for the application, including the application name, environment settings, port number, 
 * and logging preferences. These values can be adjusted based on the deployment environment (e.g., 
 * development, production).
 *
 * @module config
 * 
 * @example
 * const config = require('@config');
 * console.log(config.appName); // Outputs: HemoSync API
 * 
 * @returns {Object} The application configuration object.
 * @property {string} appName - The name of the application. Defaults to 'HemoSync API'.
 * @property {string} env - The environment in which the application is running. Defaults to 'production'.
 * @property {number} port - The port number on which the application will listen for incoming requests. Defaults to 5000.
 * @property {boolean} debug - Flag to enable or disable debugging logs. Defaults to false.
 * @property {string} logging - The level of logging to be used. Can be 'error', 'warn', 'info', or 'verbose'. Defaults to 'error'.
 */
module.exports = {
  appName: 'HemoSync API',
  env: 'production',
  port: 5000,
  debug: false,
  logging: 'error',
};
