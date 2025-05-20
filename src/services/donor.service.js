/**
 * @module DonorService
 * 
 * This module provides services for managing donor records, including creating, retrieving,
 * updating, and deleting donors. It interacts with the donor model and logs important information
 * about each operation.
 * 
 * @requires module:@models/donor.model - The model for donor data management.
 * @requires module:@utils/logger - The logger utility to log messages at various levels.
 * 
 * @example
 * // To create a new donor, use:
 * const donorData = {
 *   name: 'John Doe',
 *   blood_type: 'O+',
 *   birth_date: '1980-01-01',
 * };
 * await DonorService.createDonor(donorData);
 */

/**
 * Service to manage donor data, including operations to create, retrieve, update, and delete donors.
 * 
 * @namespace DonorService
 */
const donorModel =  ('@models/donor.model');
const log = require('@utils/logger');

const DonorService = {
  /**
   * Creates a new donor by validating and filtering the provided data.
   * 
   * This function ensures that required fields (name and blood type) are present.
   * It filters the data to include only allowed fields and formats dates as needed.
   * 
   * @function
   * @name createDonor
   * @memberof DonorService
   * @param {Object} data - The data to create the donor.
   * @param {string} data.name - The name of the donor.
   * @param {string} data.blood_type - The blood type of the donor.
   * @param {string} [data.birth_date] - The birth date of the donor.
   * @param {string} [data.gender] - The gender of the donor.
   * @param {string} [data.phone] - The phone number of the donor.
   * @param {string} [data.email] - The email address of the donor.
   * @param {string} [data.identity_document] - The identity document of the donor.
   * @param {string} [data.address] - The address of the donor.
   * @param {number} [data.latitude] - The latitude of the donor’s location.
   * @param {number} [data.longitude] - The longitude of the donor’s location.
   * @param {string} [data.last_donation] - The date of the last donation made by the donor.
   * @param {string} [data.donation_frequency] - The donation frequency preference of the donor.
   * @param {string} [data.eligibility_status] - The eligibility status of the donor.
   * @param {string} [data.contact_preferences] - The contact preferences of the donor.
   * @throws {Error} If required fields (name or blood_type) are missing.
   * @returns {Promise<Object>} The created donor object.
   */
  createDonor: async (data) => {
    if (!data.name || !data.blood_type) {
      log('Name and blood type are required for creating a donor.', 'error');
      throw new Error('Name and blood type are required');
    }

    const allowedFields = [
      'name',
      'birth_date',
      'blood_type',
      'gender',
      'phone',
      'email',
      'identity_document',
      'address',
      'latitude',
      'longitude',
      'last_donation',
      'donation_frequency',
      'eligibility_status',
      'contact_preferences',
    ];

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );

    if (filteredData.birth_date) {
      filteredData.birth_date = new Date(filteredData.birth_date);
    }
    if (filteredData.last_donation) {
      filteredData.last_donation = new Date(filteredData.last_donation);
    }
    
    log('Creating new donor...', 'info');
    return await donorModel.create(filteredData);
  },

  /**
   * Retrieves all donors from the database.
   * 
   * @function
   * @name getAllDonors
   * @memberof DonorService
   * @returns {Promise<Array>} List of all donors.
   */
  getAllDonors: async () => {
    return await donorModel.findAll();
  },

  /**
   * Retrieves a donor by their ID.
   * 
   * @function
   * @name getDonorById
   * @memberof DonorService
   * @param {string} id - The ID of the donor.
   * @throws {Error} If the donor with the provided ID is not found.
   * @returns {Promise<Object>} The donor object.
   */
  getDonorById: async (id) => {
    const donor = await donorModel.findById(id);
    if (!donor) {
      log(`Donor with ID ${id} not found.`, 'warn');
      throw new Error('Donor not found');
    }
    return donor;
  },

  /**
   * Retrieves donors by their blood type.
   * 
   * @function
   * @name getByBloodType
   * @memberof DonorService
   * @param {string} bloodType - The blood type to search for.
   * @throws {Error} If the blood type is not provided.
   * @returns {Promise<Array>} List of donors with the given blood type.
   */
  getByBloodType: async (bloodType) => {
    if (!bloodType) {
      log('Blood type is required to search donors.', 'error');
      throw new Error('Blood type is required');
    }
    return await donorModel.findByBloodType(bloodType);
  },

  /**
   * Updates a donor's information.
   * 
   * @function
   * @name updateDonor
   * @memberof DonorService
   * @param {string} id - The ID of the donor to be updated.
   * @param {Object} data - The new data for the donor.
   * @throws {Error} If the ID or data is missing.
   * @returns {Promise<Object>} The updated donor object.
   */
  updateDonor: async (id, data) => {
    if (!id) {
      log('ID is required to update a donor.', 'error');
      throw new Error('ID is required')
    };
    if (!data) {
      log('Update data is required to update a donor.', 'error');
      throw new Error('Update data is required');
    };
    return await donorModel.update(id, data);
  },

  /**
   * Deletes a donor by their ID.
   * 
   * @function
   * @name deleteDonor
   * @memberof DonorService
   * @param {string} id - The ID of the donor to be deleted.
   * @throws {Error} If the ID is missing.
   * @returns {Promise<void>} A promise that resolves when the donor is deleted.
   */
  deleteDonor: async (id) => {
    if (!id) {
      log('ID is required to delete a donor.', 'error');
      throw new Error('ID is required');
    };
    
    return await donorModel.delete(id);
  },
};

module.exports = DonorService;
