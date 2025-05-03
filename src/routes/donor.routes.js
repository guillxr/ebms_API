/**
 * @module DonorRouter
 *
 * This module defines the routing for the donor management API. It handles the HTTP requests
 * for creating, retrieving, updating, and deleting donor records, and validates the request
 * data using middlewares. The routes interact with the donor controller to process the donor data.
 *
 * @requires module:express - The Express library for routing.
 * @requires module:@controllers/donor.controller - The controller that handles the logic for donor operations.
 * @requires module:@middlewares/validateRequest.middleware - The middleware to validate incoming requests.
 *
 * @example
 * // To use this router, you should require and use it in your Express application:
 * const donorRouter = require('@routes/donor.routes');
 * app.use('/donors', donorRouter);
 */

/**
 * Router for managing donor data in the system.
 *
 * This router exposes several routes to handle donor-related operations:
 * - POST /: Create a new donor
 * - GET /: Get a list of all donors
 * - GET /:id: Get donor details by ID
 * - GET /blood-type/:bloodType: Get donors by blood type
 * - PUT /:id: Update donor details
 * - DELETE /:id: Delete a donor
 *
 * @namespace DonorRouter
 */

const express = require('express');
const router = express.Router();
const donorController = require('@controllers/donor.controller');
const { authenticateJWT } = require('@middlewares/authenticate.middleware');
const {
  validate,
  body,
  param,
} = require('@middlewares/validateRequest.middleware');

const validGenders = ['Masculino', 'Feminino', 'Outro'];
const validContactPreferences = ['email', 'sms', 'whatsapp', 'call'];
const validBloodTypes = [
  'A_POSITIVO',
  'A_NEGATIVO',
  'B_POSITIVO',
  'B_NEGATIVO',
  'AB_POSITIVO',
  'AB_NEGATIVO',
  'O_POSITIVO',
  'O_NEGATIVO',
];

/**
 * Route to create a new donor.
 *
 * This route validates the provided donor data (name, birth date, blood type, gender, etc.)
 * before passing it to the donor controller for creation.
 *
 * @function
 * @name POST /
 * @memberof DonorRouter
 * @param {Object} data - The donor data to be validated and created.
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
 * @throws {ValidationError} If any of the required fields are missing or invalid.
 * @returns {Promise<Object>} The created donor object.
 */
router.post(
  '/',
  validate([
    body('name')
      .notEmpty()
      .withMessage('Full name is required')
      .trim()
      .escape()
      .isLength({ min: 5, max: 100 })
      .withMessage('Name must be between 5 and 100 characters'),

    body('birth_date')
      .notEmpty()
      .withMessage('Birth date is required')
      .isISO8601()
      .withMessage('Invalid date format (YYYY-MM-DD)')
      .custom((date) => {
        const birthDate = new Date(date);
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 18);

        if (birthDate > minDate) {
          throw new Error('Donor must be at least 18 years old');
        }
        return true;
      }),

    body('blood_type')
      .notEmpty()
      .withMessage('Blood type is required')
      .isIn(validBloodTypes)
      .withMessage('Invalid blood type'),

    body('gender')
      .notEmpty()
      .withMessage('Gender is required')
      .isIn(validGenders)
      .withMessage('Invalid gender'),

    body('phone')
      .notEmpty()
      .withMessage('Phone number is required')
      .isMobilePhone('any')
      .withMessage('Invalid phone number')
      .customSanitizer((value) => value.replace(/\D/g, '')),

    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email address')
      .normalizeEmail(),

    body('identity_document')
      .notEmpty()
      .withMessage('ID document is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('ID must be between 8 and 20 characters')
      .customSanitizer((value) => value.replace(/\D/g, '')),

    body('address')
      .notEmpty()
      .withMessage('Address is required')
      .isLength({ min: 10, max: 200 })
      .withMessage('Address must be between 10 and 200 characters'),

    body('latitude')
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage('Invalid latitude value'),

    body('longitude')
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage('Invalid longitude value'),

    body('last_donation')
      .optional()
      .isISO8601()
      .withMessage('Invalid date format (YYYY-MM-DD)')
      .custom((date, { _req }) => {
        if (new Date(date) > new Date()) {
          throw new Error('Last donation date cannot be in the future');
        }
        return true;
      }),

    body('donation_frequency')
      .optional()
      .isInt({ min: 0 })
      .withMessage('Donation frequency must be a positive number'),

    body('eligibility_status')
      .optional()
      .isBoolean()
      .withMessage('Eligibility status must be true or false'),

    body('contact_preferences')
      .optional()
      .isArray()
      .withMessage('Contact preferences must be an array')
      .custom((values) => {
        if (values.some((v) => !validContactPreferences.includes(v))) {
          throw new Error('Invalid contact preference');
        }
        return true;
      }),
  ]),
  donorController.create
);

/**
 * Route to retrieve all donors.
 *
 * @function
 * @name GET /
 * @memberof DonorRouter
 * @returns {Promise<Array>} A list of all donors in the system.
 */
router.get('/', donorController.getAll);

/**
 * Route to retrieve a donor by their ID.
 *
 * @function
 * @name GET /:id
 * @memberof DonorRouter
 * @param {string} id - The ID of the donor to retrieve.
 * @returns {Promise<Object>} The donor data for the given ID.
 */
router.get(
  '/:id',
  validate([param('id').isUUID().withMessage('ID must be a valid UUID')]),
  donorController.getById
);

/**
 * Route to retrieve donors by blood type.
 *
 * @function
 * @name GET /blood-type/:bloodType
 * @memberof DonorRouter
 * @param {string} bloodType - The blood type of the donors to retrieve.
 * @returns {Promise<Array>} A list of donors with the specified blood type.
 */
router.get(
  '/blood-type/:bloodType',
  validate([
    param('bloodType')
      .notEmpty()
      .withMessage('Blood type is required')
      .isIn(validBloodTypes)
      .withMessage('Invalid blood type'),
  ]),
  donorController.getByBloodType
);

/**
 * Route to update a donor's details.
 *
 * @function
 * @name PUT /:id
 * @memberof DonorRouter
 * @param {string} id - The ID of the donor to update.
 * @param {Object} data - The donor data to update.
 * @returns {Promise<Object>} The updated donor object.
 */
router.put(
  '/:id',
  validate([
    param('id').isUUID().withMessage('ID must be a valid UUID'),

    body('name')
      .optional()
      .notEmpty()
      .withMessage('Name cannot be empty')
      .trim()
      .escape()
      .isLength({ min: 5, max: 100 })
      .withMessage('Name must be between 5 and 100 characters'),

    body('birth_date')
      .optional()
      .isISO8601()
      .withMessage('Invalid date format (YYYY-MM-DD)'),

    body('blood_type')
      .optional()
      .isIn(validBloodTypes)
      .withMessage('Invalid blood type'),

    body('gender').optional().isIn(validGenders).withMessage('Invalid gender'),

    body('phone')
      .optional()
      .isMobilePhone('any')
      .withMessage('Invalid phone number'),

    body('email').optional().isEmail().withMessage('Invalid email address'),

    body('identity_document')
      .optional()
      .isLength({ min: 8, max: 20 })
      .withMessage('ID must be between 8 and 20 characters'),

    body('address')
      .optional()
      .isLength({ min: 10, max: 200 })
      .withMessage('Address must be between 10 and 200 characters'),
  ]),
  authenticateJWT,
  donorController.update
);

/**
 * Route to delete a donor by their ID.
 *
 * @function
 * @name DELETE /:id
 * @memberof DonorRouter
 * @param {string} id - The ID of the donor to delete.
 * @returns {Promise<void>} A promise indicating the donor has been deleted.
 */
router.delete(
  '/:id',
  validate([param('id').isUUID().withMessage('ID must be a valid UUID')]),
  authenticateJWT,
  donorController.delete
);

module.exports = router;
