/**
 * CORS Configuration.
 * 
 * This module exports an object containing the configuration for Cross-Origin Resource 
 * Sharing (CORS). 
 * CORS allows web servers to specify which origins are permitted to 
 * access resources, and it defines the methods and headers allowed in the requests.
 *
 * The configuration ensures that CORS is set up properly for handling requests 
 * between different origins while supporting the necessary HTTP methods and headers f
 * or the application.
 * 
 * @module cors.config
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
 *
 * @example
 * const corsOptions = require('@config/cors.config');
 * app.use(cors(corsOptions));
 * 
 * @returns {Object} The CORS configuration object.
 * @property {string} origin - The allowed origin for CORS requests. Defaults to '*' (any origin).
 * @property {string[]} methods - The HTTP methods allowed for cross-origin requests.
 * @property {string[]} allowedHeaders - The headers allowed in cross-origin requests.
 * @property {boolean} credentials - Whether or not to allow credentials in the requests.
 * @property {number} optionsSuccessStatus - The status code to return for successful OPTIONS requests (typically for preflight requests).
 * @property {boolean} preflightContinue - Whether to pass the CORS preflight response to the next handler.
 */
module.exports = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
  preflightContinue: false,
};
