const prisma = require('@config').prisma;
const log = require('@utils/logger');

/**
 * Admin authentication module.
 * Provides functionality to create and retrieve admin users from the database.
 */
const auth = {
  /**
   * Creates a new admin user in the database.
   *
   * @async
   * @function create
   * @param {string} username - The username of the new admin.
   * @param {string} password - The password of the new admin (presumably already hashed).
   * @returns {Promise<Object>} The created admin object.
   * @throws {Error} Throws an error if the user already exists or if creation fails.
   */
  create: async (username, password) => {
    log(`Attempting to create admin with username: ${username}`, 'info');
    try {
      const existingUser = await prisma.admin.findUnique({
        where: { username },
      });

      if (existingUser) {
        log(
          `Admin creation failed: username "${username}" already exists`,
          'warn'
        );
        throw new Error('User already exists');
      }

      const newAdmin = await prisma.admin.create({
        data: {
          username,
          password,
        },
      });

      log(`Admin created successfully: ${username}`, 'info');
      return newAdmin;
    } catch (err) {
      log(`Prisma error on create admin: ${err.message}`, 'error');
      throw err;
    }
  },

  /**
   * Retrieves an admin user from the database by username.
   *
   * @async
   * @function findAdmin
   * @param {string} username - The username of the admin to retrieve.
   * @returns {Promise<Object|null>} The admin object if found, or null if not found.
   * @throws {Error} Throws an error if the database query fails.
   */
  findAdmin: async (username) => {
    log(`Searching for admin with username: ${username}`, 'info');
    try {
      const admin = await prisma.admin.findUnique({
        where: { username },
      });

      if (admin) {
        log(`Admin found: ${username}`, 'info');
      } else {
        log(`Admin not found: ${username}`, 'warn');
      }

      return admin;
    } catch (err) {
      log(`Prisma error on find admin: ${err.message}`, 'error');
      throw err;
    }
  },
};

module.exports = auth;
