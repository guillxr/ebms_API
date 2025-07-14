const { body, param } = require('express-validator');

const validBloodTypes = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

const validateTypeParam = [
  param('type')
    .notEmpty().withMessage('Blood type is required')
    .isIn(validBloodTypes).withMessage('Invalid blood type'),
];

const validateBloodParam = [
  param('blood')
    .notEmpty().withMessage('Blood type is required')
    .isIn(validBloodTypes).withMessage('Invalid blood type'),
];

const validateBldParam = [
  param('bld')
    .notEmpty().withMessage('Blood type is required')
    .isIn(validBloodTypes).withMessage('Invalid blood type'),
];

const validateSentBody = [
  body('sent')
    .notEmpty().withMessage('sent is required')
    .isFloat({ min: 0 }).withMessage('sent must be a number'),
];

module.exports = {
  validateTypeParam,
  validateBloodParam,
  validateBldParam,
  validateSentBody,
};
