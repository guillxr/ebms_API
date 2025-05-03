const authModel = require('@models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const log = require('@utils/logger');
const config = require('@config');

/**
 * Service module responsible for admin authentication and registration.
 */
const authService = {
  /**
   * Authenticates an admin user by verifying their credentials and issuing a JWT.
   *
   * @async
   * @function findAdmin
   * @param {string} username - The username of the admin attempting to log in.
   * @param {string} password - The plain-text password provided by the admin.
   * @returns {Promise<{token: string, user: {id: number, username: string}}>}
   * An object containing the JWT token and basic user info if authentication is successful.
   * @throws {Error} Throws an error if the admin is not found or if the password is incorrect.
   */
  findAdmin: async (username, password) => {
    log(`Authenticating admin: ${username}`, 'info');
    try {
      const admin = await authModel.findAdmin(username);

      if (!admin) {
        log(`Admin not found during login: ${username}`, 'warn');
        throw new Error('Username or password invalid!');
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        log(`Invalid password attempt for user: ${username}`, 'warn');
        throw new Error('Password invalid!');
      }

      const payload = { id: admin.id, username: admin.username };
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });

      log(`Authentication successful for admin: ${username}`, 'info');
      return { token, user: payload };
    } catch (err) {
      log(`Error during admin authentication: ${err.message}`, 'error');
      throw err;
    }
  },

  /**
   * Creates a new admin user with a hashed password.
   *
   * @async
   * @function createAdmin
   * @param {string} username - The username for the new admin.
   * @param {string} password - The plain-text password for the new admin.
   * @returns {Promise<Object>} The created admin object.
   * @throws {Error} Throws an error if creation fails.
   */
  createAdmin: async (username, password) => {
    log(`Registering new admin: ${username}`, 'info');
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const admin = await authModel.create(username, hashedPassword);
      log(`Admin registered successfully: ${username}`, 'info');
      return admin;
    } catch (err) {
      log(`Error during admin registration: ${err.message}`, 'error');
      throw err;
    }
  },
};

module.exports = authService;
