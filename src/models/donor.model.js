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
const prisma = require('@config').prisma;
const log = require('@utils/logger');

const Donor = {
  /**
   * Creates a new donor in the database.
   *
   * This function creates a new donor record with the provided data and handles
   * the possibility of a unique constraint violation for the email field.
   *
   * @function
   * @name create
   * @memberof Donor
   * @param {Object} data - The donor data to be added.
   * @param {string} data.name - The full name of the donor.
   * @param {string} data.birth_date - The birth date of the donor (ISO format).
   * @param {string} data.blood_type - The blood type of the donor.
   * @param {string} data.gender - The gender of the donor.
   * @param {string} data.phone - The phone number of the donor.
   * @param {string} data.email - The email address of the donor.
   * @param {string} data.identity_document - The ID document of the donor.
   * @param {string} data.address - The address of the donor.
   * @param {number} [data.latitude] - The latitude of the donor's location.
   * @param {number} [data.longitude] - The longitude of the donor's location.
   * @param {string} [data.last_donation] - The last donation date (ISO format).
   * @param {number} [data.donation_frequency] - The donation frequency preference of the donor.
   * @param {boolean} [data.eligibility_status] - The eligibility status of the donor.
   * @param {Array} [data.contact_preferences] - The contact preferences of the donor (e.g., 'email', 'sms').
   * @throws {Error} If there is an error during donor creation, such as a duplicate email.
   * @returns {Promise<Object>} The created donor object.
   */
  create: async (data) => {
    try {
      log('Creating donor...', 'info');
      return await prisma.donor.create({ data });
    } catch (error) {
      log(`Prisma error on create: ${error}`, 'error');
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  },

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
          blood_type: {
            contains: bloodType,
            mode: 'insensitive',
          },
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
        log(
          `Donor creation failed: username "${existingUser.name}" already exists`,
          'warn'
        );
        throw new Error('User already exists');
      }

      return await prisma.donor.delete({ where: { id } });
    } catch (error) {
      log(`Prisma error on delete: ${error}`, 'error');
      throw error;
    }
  },
};

module.exports = Donor;
