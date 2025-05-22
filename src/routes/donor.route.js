/**
 * @fileoverview Express router for donor management endpoints.
 * Defines comprehensive CRUD operations for donor resources including:
 * - Donor creation with validation
 * - Retrieval of donors (all, by ID, by blood type)
 * - Donor updates with authentication
 * - Donor deletion with authentication
 * @module routes/donor.router
 */

const express = require('express');

const donorController = require('../controllers/donor.controller');
const { authenticateJWT } = require('../middlewares/authenticate.middleware');
const { validate } = require('../middlewares/validateRequest.middleware');
const {
  validateCreateDonor,
  validateIdParam,
  validateBloodTypeParam,
  validateUpdateDonor
} = require('../validators');

const router = express.Router();
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 * @typedef {import('@middlewares').DonorCreateSchema} DonorCreateSchema
 * @typedef {import('@validators').DonorUpdateSchema} DonorUpdateSchema
 */

/**
 * @route POST /donors
 * @summary Create a new donor record
 * @tags Donors - Donor management
 * @consumes application/json
 * @produces application/json
 * @param {DonorCreateSchema} request.body.required - Donor creation data
 * @returns {Response} 201 - Created donor object
 * @returns {Response} 400 - Validation error
 * @returns {Response} 500 - Internal server error
 * @security none
 */
router.post('/', validate(validateCreateDonor), donorController.create);

/**
 * @route GET /donors
 * @summary Retrieve all donor records
 * @tags Donors - Donor management
 * @produces application/json
 * @returns {Response} 200 - Array of donor objects
 * @returns {Response} 500 - Internal server error
 * @security none
 */
router.get('/', donorController.getAll);

/**
 * @route GET /donors/:id
 * @summary Retrieve a specific donor by ID
 * @tags Donors - Donor management
 * @produces application/json
 * @param {string} id.path.required - Donor ID (UUID format)
 * @returns {Response} 200 - Requested donor object
 * @returns {Response} 404 - Donor not found
 * @returns {Response} 400 - Invalid ID format
 * @returns {Response} 500 - Internal server error
 * @security none
 */
router.get('/:id', validate(validateIdParam), donorController.getById);

/**
 * @route GET /donors/blood-type/:bloodType
 * @summary Retrieve donors by blood type
 * @tags Donors - Donor management
 * @produces application/json
 * @param {string} bloodType.path.required - Blood type (A+, B-, O+, etc.)
 * @returns {Response} 200 - Array of matching donor objects
 * @returns {Response} 400 - Invalid blood type format
 * @returns {Response} 404 - No donors found with specified blood type
 * @returns {Response} 500 - Internal server error
 * @security none
 */
router.get(
  '/blood-type/:bloodType',
  validate(validateBloodTypeParam),
  donorController.getByBloodType
);

/**
 * @route PUT /donors/:id
 * @summary Update an existing donor record
 * @tags Donors - Donor management
 * @consumes application/json
 * @produces application/json
 * @param {string} id.path.required - Donor ID (UUID format)
 * @param {DonorUpdateSchema} request.body.required - Donor update data
 * @returns {Response} 200 - Updated donor object
 * @returns {Response} 400 - Validation error or invalid ID
 * @returns {Response} 401 - Unauthorized (missing/invalid token)
 * @returns {Response} 404 - Donor not found
 * @returns {Response} 500 - Internal server error
 * @security BearerAuth
 */
router.put(
  '/:id',
  validate(validateUpdateDonor),
  authenticateJWT,
  donorController.update
);

/**
 * @route DELETE /donors/:id
 * @summary Delete a donor record
 * @tags Donors - Donor management
 * @produces application/json
 * @param {string} id.path.required - Donor ID (UUID format)
 * @returns {Response} 204 - No content (successful deletion)
 * @returns {Response} 400 - Invalid ID format
 * @returns {Response} 401 - Unauthorized (missing/invalid token)
 * @returns {Response} 404 - Donor not found
 * @returns {Response} 500 - Internal server error
 * @security BearerAuth
 */
router.delete(
  '/:id',
  validate(validateIdParam),
  authenticateJWT,
  donorController.delete
);

module.exports = router;
