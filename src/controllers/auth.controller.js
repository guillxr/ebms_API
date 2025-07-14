const authService = require('../services/auth.service');
const log = require('../utils/logger');

/**
 * Controller responsible for handling HTTP requests related to admin authentication.
 */
const authController = {
  /**
   * Handles admin login requests.
   * Verifies credentials and returns a JWT token with user information.
   *
   * @async
   * @function login
 * @param {import('express').Request} req - Express request object containing email and password in the body.
   * @param {import('express').Response} res - Express response object used to return the result.
   * @returns {Promise<void>}
   * Sends a 200 response with credentials if successful,
   * or a 401 response if authentication fails.
   */
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const credentials = await authService.findUser(email, password);
      res.cookie('token', credentials.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
      res.status(200).json(credentials);
    } catch (err) {
      log(`Login failed: ${err.message}`, 'warn');
      res.status(401).json({ error: 'Email or password invalid' });
    }
  },

  /**
   * Handles admin account creation requests.
   * Hashes the password and creates a new admin in the database.
   *
   * @async
   * @function createAdmin
 * @param {import('express').Request} req - Express request object containing email and password in the body.
   * @param {import('express').Response} res - Express response object used to return the result.
   * @returns {Promise<void>}
   * Sends a 201 response with the new admin data if successful,
   * or a 400 response if creation fails.
   */
  createUser: async (req, res) => {
    const { email, password, role, donorData, adminData } = req.body;
    try {
      const user = await authService.createUser(email, password, role, donorData, adminData);
      res.status(201).json(user);
    } catch (err) {
      log(`Error creating user: ${err.message}`, 'error');
      res.status(400).json({ error: `Error creating user: ${err.message}` });
    }
  },
};

module.exports = authController;
