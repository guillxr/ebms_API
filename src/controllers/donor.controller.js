/**
 * @module DonorController
 *
 * This module defines controller functions for handling HTTP requests related to donors.
 * It uses DonorService to perform business logic and Logger utility to log operations
 * and errors.
 *
 * @requires module:@services/donor.service - Service for donor data operations.
 * @requires module:@utils/logger - Logger utility for logging messages.
 */
const donorService = require('../services/donor.service');
const log = require('../utils/logger');

/**
 * Controller for donor-related HTTP endpoints.
 *
 * @namespace DonorController
 */
const donorController = {
  /**
   * Handles donor creation requests.
   *
   * Logs the creation process, invokes the service to create a donor, and responds
   * with the result. On error, logs the error and responds with status 400.
   *
   * @method
   * @name create
   * @memberof DonorController
   * @param {Object} req - Express request object containing donor data in req.body.
   * @param {Object} res - Express response object for sending responses.
   * @returns {Promise<void>}
   */
  create: async (req, res) => {
    try {
      log('Creating donor...', 'info');
      const donor = await donorService.create(req.body);
      res.status(201).json({
        message: 'Donor created successfully!',
        data: donor,
      });
      log(`Donor created successfully: ${donor.id}`, 'info');
    } catch (err) {
      log(`Error creating donor: ${err.message}`, 'error');
      res.status(400).json({
        error: 'Error creating donor',
        details: err.message,
      });
    }
  },

  /**
   * Handles request to fetch all donors.
   *
   * @method
   * @name getAll
   * @memberof DonorController
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object for sending responses.
   * @returns {Promise<void>}
   */
  getAll: async (req, res) => {
    try {
      log('Fetching all donors...', 'info');
      const donors = await donorService.getAllDonors();
      res.status(200).json(donors);
      log(`Fetched ${donors.length} donors`, 'info');
    } catch (err) {
      log(`Error fetching all donors: ${err.message}`, 'error');
      res.status(500).json({
        error: 'Error fetching donors',
        details: err.message,
      });
    }
  },

  /**
   * Handles request to fetch a donor by ID.
   *
   * @method
   * @name getById
   * @memberof DonorController
   * @param {Object} req - Express request object containing donor ID in req.params.id.
   * @param {Object} res - Express response object for sending responses.
   * @returns {Promise<void>}
   */
  getById: async (req, res) => {
    try {
      log(`Fetching donor by ID: ${req.params.id}...`, 'info');
      const donor = await donorService.getDonorById(req.params.id);
      res.status(200).json(donor);
      log(`Donor fetched successfully: ${donor.id}`, 'info');
    } catch (err) {
      log(
        `Error fetching donor by ID ${req.params.id}: ${err.message}`,
        'error'
      );
      res.status(404).json({
        error: 'Donor not found',
        details: err.message,
      });
    }
  },

  /**
   * Handles request to fetch donors by blood type.
   *
   * @method
   * @name getByBloodType
   * @memberof DonorController
   * @param {Object} req - Express request object containing blood type in req.params.bloodType.
   * @param {Object} res - Express response object for sending responses.
   * @returns {Promise<void>}
   */
  getByBloodType: async (req, res) => {
    try {
      log(`Fetching donors by blood type: ${req.params.bloodType}...`, 'info');
      const donors = await donorService.getByBloodType(req.params.bloodType);
      res.status(200).json(donors);
      log(
        `Fetched ${donors.length} donors with blood type ${req.params.bloodType}`,
        'info'
      );
    } catch (err) {
      log(
        `Error fetching donors by blood type ${req.params.bloodType}: ${err.message}`,
        'error'
      );
      res.status(400).json({
        error: 'Error fetching donors by blood type',
        details: err.message,
      });
    }
  },

  /**
   * Handles donor update requests.
   *
   * @method
   * @name update
   * @memberof DonorController
   * @param {Object} req - Express request object containing donor ID in req.params.id and update data in req.body.
   * @param {Object} res - Express response object for sending responses.
   * @returns {Promise<void>}
   */
  update: async (req, res) => {
    try {
      log(`Updating donor with ID: ${req.params.id}...`, 'info');
      const donor = await donorService.updateDonor(req.params.id, req.body);
      res.status(200).json({
        message: 'Donor updated successfully',
        data: donor,
      });
      log(`Donor updated successfully: ${donor.id}`, 'info');
    } catch (err) {
      log(
        `Error updating donor with ID ${req.params.id}: ${err.message}`,
        'error'
      );
      res.status(400).json({
        error: 'Error updating donor',
        details: err.message,
      });
    }
  },

  /**
   * Handles donor deletion requests.
   *
   * @method
   * @name delete
   * @memberof DonorController
   * @param {Object} req - Express request object containing donor ID in req.params.id.
   * @param {Object} res - Express response object for sending responses.
   * @returns {Promise<void>}
   */
  delete: async (req, res) => {
    try {
      log(`Deleting donor with ID: ${req.params.id}...`, 'info');
      await donorService.deleteDonor(req.params.id);
      res.status(200).json({
        message: 'Donor deleted successfully',
      });
      log(`Donor deleted successfully: ${req.params.id}`, 'info');
    } catch (err) {
      res.status(400).json({
        error: 'Error deleting donor',
        details: err.message,
      });
    }
  },
};

module.exports = donorController;
