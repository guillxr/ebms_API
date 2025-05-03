/**
 * Module to load all the application routes.
 * @module routes
 */

const donorRoutes = require('./donor.routes');
const authRoutes = require('./auth.route');

/**
 * Loads all route groups into the given Express app instance.
 *
 * @function loadRoutes
 * @memberof module:routes
 * @param {Object} app - The Express application instance.
 *
 * @description
 * Registers the following route groups:
 * - `/donors` → handles donor-related endpoints.
 * - `/admins` → handles admin authentication and management endpoints.
 */
const loadRoutes = (app) => {
  app.use('/donors', donorRoutes);
  app.use('/admins', authRoutes);
};

module.exports = { loadRoutes };
