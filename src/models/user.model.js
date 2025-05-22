const log = require('../utils/logger');
const { prisma } = require('../../prisma/client');

/**
 * @module UserModel
 */
const UserModel = {
  /**
   * Finds a user by their email.
   *
   * @async
   * @function findByEmail
   * @param {string} email
   * @returns {Promise<Object|null>}
   */
  findByEmail: async (email) => {
    try {
      return await prisma.user.findUnique({
        where: { email },
        include: { donor: true, admin: true },
      });
    } catch (error) {
      log(`Error finding user by email: ${error.message}`, 'error');
      throw error;
    }
  },

  /**
   * Finds a user by their ID.
   *
   * @async
   * @function findById
   * @param {string} id
   * @returns {Promise<Object|null>}
   */
  findById: async (id) => {
    try {
      return await prisma.user.findUnique({
        where: { id },
        include: { donor: true, admin: true },
      });
    } catch (error) {
      log(`Error finding user by ID: ${error.message}`, 'error');
      throw error;
    }
  },

  /**
   * Deletes a user by ID.
   *
   * @async
   * @function deleteUser
   * @param {string} id
   * @returns {Promise<Object>}
   */
  deleteUser: async (id) => {
    try {
      return await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      log(`Error deleting user: ${error.message}`, 'error');
      throw error;
    }
  },

  /**
   * Retrieves all users with their roles.
   *
   * @async
   * @function findAll
   * @returns {Promise<Array>}
   */
  findAll: async () => {
    try {
      return await prisma.user.findMany({
        include: { donor: true, admin: true },
      });
    } catch (error) {
      log(`Error retrieving users: ${error.message}`, 'error');
      throw error;
    }
  },
};

module.exports = UserModel;