const express = require('express');
const router = express.Router();
const authController = require('@controllers/auth.controller');
const { validate } = require('@middlewares/validateRequest.middleware');
const {
  loginValidation,
  createAdminValidation,
} = require('@validators/auth.validator');

/**
 * @module AuthRoutes
 * @description Defines authentication-related HTTP routes for login and admin registration.
 */

/**
 * POST /login
 *
 * Authenticates an admin user and returns a JWT token if credentials are valid.
 *
 * @name POST /login
 * @function
 * @memberof module:AuthRoutes
 * @param {express.Request} req - Express request object containing `username` and `password` in the body.
 * @param {express.Response} res - Returns a 200 status with a token and user info if successful,
 * or 401 if authentication fails.
 */
router.post('/login', validate(loginValidation), authController.login);

/**
 * POST /
 *
 * Creates a new admin account with hashed password.
 *
 * @name POST /
 * @function
 * @memberof module:AuthRoutes
 * @param {express.Request} req - Express request object containing `username` and `password` in the body.
 * @param {express.Response} res - Returns a 201 status with admin details if successful,
 * or 400 if creation fails.
 */
router.post('/', validate(createAdminValidation), authController.createAdmin);

module.exports = router;
