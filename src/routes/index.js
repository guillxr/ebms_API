/**
 * Module to load all the application routes.
 * @module routes
 */

import donorRoutes from './donor.routes.js';
import authRoutes from './auth.route.js';
import histBloodRoutes from './histBlood.route.js';
import estBloodRoutes from './estBlood.route.js';
import localityRoutes from './locality.route.js';

/**
 * Loads all route groups into the given Express app instance.
 *
 * @function loadRoutes
 * @memberof module:routes
 * @param {import('express').Express} app - The Express application instance.
 */
export function loadRoutes(app) {
  app.use('/donors', donorRoutes);
  app.use('/admins', authRoutes);
  app.use('/histBlood', histBloodRoutes);
  app.use('/estBlood', estBloodRoutes);
  app.use('/locality', localityRoutes);
}

module.exports = { loadRoutes };
