/**
 * @module authenticateJWT
 *
 * This module provides middleware to authenticate requests using JSON Web Tokens (JWT).
 * It verifies the provided JWT token from the request's Authorization header.
 * If the token is valid, the user data is attached to the request object; otherwise, it responds with an error.
 *
 * @requires module:@config - The configuration module that contains the JWT secret key.
 */

const jwt = require('jsonwebtoken');
const config = require('@config');

/**
 * Middleware function that authenticates a request using a JWT token.
 *
 * This function checks for a valid token in the request's Authorization header. If the token is valid,
 * it decodes the user data and attaches it to the `req.user` object. If the token is missing or invalid,
 * it responds with a 403 status code and an error message.
 *
 * @function
 * @name authenticateJWT
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function to proceed with the request.
 * @returns {void} Calls the next middleware if authentication is successful, or responds with an error if the token is invalid.
 *
 * @throws {Error} If the token is missing or invalid, a 403 status code is returned with an error message.
 */
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) res.status(403).json({ error: 'missing token!' });

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) res.status(403).json({ error: err.message });
    req.user = user;
    next();
  });
};

module.exports = { authenticateJWT };
