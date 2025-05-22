import donorModel from '@models/donor.model.js';
import log from '@utils/logger.js';

/**
 * @module DonorService
 */
const DonorService = {
  /**
   * Retrieves all donors from the database.
   *
   * @function
   * @name getAllDonors
   * @returns {Promise<Array>}
   */
  getAllDonors: async () => {
    return await donorModel.findAll();
  },

  /**
   * Retrieves a donor by their ID.
   *
   * @function
   * @name getDonorById
   * @param {string} id
   * @throws {Error}
   * @returns {Promise<Object>}
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
   * Retrieves donors by blood type.
   *
   * @function
   * @name getByBloodType
   * @param {string} bloodType
   * @throws {Error}
   * @returns {Promise<Array>}
   */
  getByBloodType: async (bloodType) => {
    if (!bloodType) {
      log('Blood type is required to search donors.', 'error');
      throw new Error('Blood type is required');
    }
    return await donorModel.findByBloodType(bloodType);
  },

  /**
   * Updates donor information.
   *
   * @function
   * @name updateDonor
   * @param {string} id
   * @param {Object} data
   * @throws {Error}
   * @returns {Promise<Object>}
   */
  updateDonor: async (id, data) => {
    if (!id) {
      throw new Error('ID is required');
    }
    if (!data) {
      throw new Error('Update data is required');
    }
    return await donorModel.update(id, data);
  },

  /**
   * Deletes a donor by ID.
   *
   * @function
   * @name deleteDonor
   * @param {string} id
   * @throws {Error}
   * @returns {Promise<void>}
   */
  deleteDonor: async (id) => {
    if (!id) {
      throw new Error('ID is required');
    }

    return await donorModel.delete(id);
  },
};

export default DonorService;