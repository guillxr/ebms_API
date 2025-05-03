const authService = require('@services/auth.service');
const log = require('@utils/logger');

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
   * @param {import('express').Request} req - Express request object containing username and password in the body.
   * @param {import('express').Response} res - Express response object used to return the result.
   * @returns {Promise<void>}
   * Sends a 200 response with credentials if successful,
   * or a 401 response if authentication fails.
   */
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const credentials = await authService.findAdmin(username, password);
      res.status(200).json(credentials);
    } catch (err) {
      log(`Login failed: ${err.message}`, 'warn');
      res.status(401).json({ error: 'Username or password invalid' });
    }
  },

  /**
   * Handles admin account creation requests.
   * Hashes the password and creates a new admin in the database.
   *
   * @async
   * @function createAdmin
   * @param {import('express').Request} req - Express request object containing username and password in the body.
   * @param {import('express').Response} res - Express response object used to return the result.
   * @returns {Promise<void>}
   * Sends a 201 response with the new admin data if successful,
   * or a 400 response if creation fails.
   */
  createAdmin: async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await authService.createAdmin(username, password);
      res.status(201).json({
        id: admin.id,
        username: admin.username,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      });
    } catch (err) {
      log(`Error creating admin: ${err.message}`, 'error');
      res.status(400).json({ error: `Error creating admin: ${err}` });
    }
  },
};

module.exports = authController;
