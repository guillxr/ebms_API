const { validationResult } = require('express-validator');

/**
 * @module ValidationMiddleware
 *
 * This module provides middleware to validate incoming requests using the
 * `express-validator` library.
 * It validates the request body and parameters according to the specified
 * rules and handles errors if they occur.
 *
 * @requires module:express-validator - A library for validating and sanitizing
 * request data.
 */

/**
 * A middleware function that runs an array of validation rules and handles errors.
 *
 * This function processes validation rules provided to it, runs the validation
 * checks, and responds with a `400` error if any validation errors occur. If no
 * errors are found, it allows the request to proceed to the next middleware or handler.
 *
 * @function
 * @name validate
 * @param {Array} validations - An array of validation rules to be applied to the request.
 * @returns {Function} An Express middleware function.
 * @throws {Error} Throws validation errors if any validation fails.
 *
 * @example
 * const { validate, body } = require('@middlewares/validateRequest.middleware');
 *
 * app.post('/some-route',
 *   validate([
 *     body('email').isEmail().withMessage('Invalid email format')
 *   ]),
 *   (req, res) => {
 *     // request handler
 *   }
 * );
 */
const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validation rules
    await Promise.all(validations.map((validation) => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next(); // Proceed if no errors
    }

    // Respond with a 400 error and detailed validation messages
    res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  };
};

module.exports = { validate };
