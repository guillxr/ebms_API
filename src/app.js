/**
 * @module App
 * 
 * This module initializes the Express application, loads middlewares, and sets up routes.
 * It is responsible for preparing the application for handling incoming requests.
 * 
 * @requires module:express - The Express framework to create the application.
 * @requires module:@middlewares - A function to load all middleware into the Express app.
 * @requires module:@routes - A function to load all routes into the Express app.
 * 
 * @example
 * // To initialize the application, simply require this module:
 * const app = require('@src/app');
 * 
 * // Start the app by calling `app.listen(port)`
 */

/**
 * Initializes the Express application, loads middlewares, and sets up routes.
 * 
 * This function creates an instance of an Express application, applies all the necessary 
 * middlewares to handle requests, and loads the application's routes for routing requests
 * appropriately.
 * 
 * @function
 * @name initializeApp
 * @memberof module:App
 * @param {Express.Application} app - The Express application instance.
 * @returns {void}
 * @throws {Error} If any middleware or routes fail to load.
 */
const express = require('express');
const loadMiddlewares = require('@middlewares');
const { loadRoutes } = require('@routes');

const app = express();

// Load middlewares into the app
loadMiddlewares(app);

// Load routes into the app
loadRoutes(app);

module.exports = app;
