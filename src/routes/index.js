/**
 * Module to load all the application routes.
 * @module routes
 */

const donorRoutes = require('./donor.routes');
const authRoutes = require('./auth.route');
const histBloodroutes = require('./histBlood.route');
const estBlood = require("./estBlood.route");
const localityRoute = require("./locality.route");


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
 * - `/histBlood` → handles blood historical endpoints.
 * - `/estBlood` → handles blood stock endpoits.

 */
const loadRoutes = (app) => {
  app.use('/donors', donorRoutes);
  app.use('/admins', authRoutes);
  app.use('/histBlood', histBloodroutes);
  app.use('/estBlood', estBlood);
  app.use('/locality', localityRoute);
};

module.exports = { loadRoutes };
