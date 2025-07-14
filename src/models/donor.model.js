/**
 * @module DonorModel
 *
 * This module handles interactions with the donor data in the database using Prisma ORM.
 * It provides functions to create, retrieve, update, and delete donor records.
 * The operations are logged for better traceability.
 *
 * @requires module:@config - The configuration module where the Prisma client is initialized.
 * @requires module:@utils/logger - A utility for logging operations and errors.
 */

/**
 * Donor model that interacts with the database.
 *
 * This model provides several methods for handling donor records in the system:
 * - create: Add a new donor to the database.
 * - findAll: Retrieve all donors from the database.
 * - findById: Retrieve a donor by their ID.
 * - findByBloodType: Retrieve donors based on their blood type.
 * - update: Update an existing donor's details.
 * - delete: Remove a donor from the database.
 *
 * @namespace Donor
 */
const log = require('../utils/logger');
const { prisma } = require('../../prisma/client');

const Donor = {
  /**
   * Retrieves all donors from the database.
   *
   * @function
   * @name findAll
   * @memberof Donor
   * @returns {Promise<Array>} An array of all donor objects.
   */
  findAll: async () => {
    try {
      log('Finding all donors...', 'info');
      return await prisma.donor.findMany();
    } catch (error) {
      log(`Prisma error on find all donors: ${error}`, 'error');
      throw error;
    }
  },

  /**
   * Retrieves a donor by their ID.
   *
   * @function
   * @name findById
   * @memberof Donor
   * @param {string} id - The ID of the donor to retrieve.
   * @returns {Promise<Object|null>} The donor object if found, otherwise null.
   */
  findById: async (id) => {
    try {
      log(`Finding donor with ID: ${id}...`, 'info');
      return await prisma.donor.findUnique({ where: { id } });
    } catch (error) {
      log(`Prisma error on find to donor: ${error}`, 'error');
      throw error;
    }
  },

  /**
   * Retrieves donors by their blood type.
   *
   * @function
   * @name findByBloodType
   * @memberof Donor
   * @param {string} bloodType - The blood type to search for.
   * @returns {Promise<Array>} An array of donor objects that match the given blood type.
   */
  findByBloodType: async (bloodType) => {
    try {
      log(`Finding donors with blood type: ${bloodType}...`, 'info');
      return await prisma.donor.findMany({
        where: {
          blood_type: bloodType,
        },
      });
    } catch (error) {
      log(`Prisma error on find by blood type: ${error}`, 'error');
      throw error;
    }
  },

  /**
   * Updates an existing donor's details.
   *
   * @function
   * @name update
   * @memberof Donor
   * @param {string} id - The ID of the donor to update.
   * @param {Object} data - The data to update the donor with.
   * @returns {Promise<Object>} The updated donor object.
   */
  update: async (id, data) => {
    try {
      log(`Updating donor with ID: ${id}...`, 'info');
      return await prisma.donor.update({
        where: { id },
        data,
      });
    } catch (error) {
      log(`Prisma error on update: ${error}`, 'error');
      throw error;
    }
  },

  /**
   * Deletes a donor from the database.
   *
   * @function
   * @name delete
   * @memberof Donor
   * @param {string} id - The ID of the donor to delete.
   * @returns {Promise<Object>} The deleted donor object.
   */
  delete: async (id) => {
    try {
      log(`Deleting donor with ID: ${id}...`, 'info');
      const existingUser = await prisma.donor.findUnique({
        where: { id },
      });

      if (!existingUser) {
        log('Donor deletion failed: donor not found', 'warn');
        throw new Error('Donor not found');
      }

      return await prisma.donor.delete({ where: { id } });
    } catch (error) {
      log(`Prisma error on delete: ${error}`, 'error');
      throw error;
    }
  },
};

module.exports = Donor;
