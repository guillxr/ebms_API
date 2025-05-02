/**
 * Module to load all the application routes.
 * @module routes
 */

const donorRoutes = require('./donor.routes');

/**
 * Load all routes into the provided Express app.
 * 
 * This function sets up the route `/donors` to handle requests related to donor operations.
 *
 * @param {Object} app - The Express application instance.
 */
const loadRoutes = (app) => {
  app.use('/donors', donorRoutes);
};

module.exports = { loadRoutes };
