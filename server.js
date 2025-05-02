/**
 * @module Server
 * 
 * This module is responsible for initializing and starting the application server.
 * It imports the necessary configuration and application files and listens on the specified port.
 * 
 * @requires module:@config - The configuration file that contains environment settings.
 * @requires module:@src/app - The application entry point that contains the core logic of the application.
 * 
 * @example
 * // To start the server, ensure the configuration file is properly set up,
 * // then run the server with:
 * // node server.js
 * 
 * @param {string} config.port - The port on which the server should listen.
 * @param {string} config.appName - The name of the application for logging purposes.
 * @param {string} config.env - The environment in which the application is running (e.g., development, production).
 */

/**
 * Starts the server and logs the success message.
 * 
 * This function initializes the application server using the specified port and environment settings from the config.
 * Once the server is successfully started, a message is logged to the console indicating the app name, port, and environment.
 * 
 * @function
 * @name startServer
 * @memberof module:Server
 * @returns {void}
 * @throws {Error} If the server fails to start.
 */
require('module-alias/register');

const config = require('@config');
const app = require('@src/app');

app.listen(config.port, () => {
  console.log(`${config.appName} works at port ${config.port} [${config.env}]`);
});
