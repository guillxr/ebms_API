const { body, param } = require('express-validator');

const localityBody = [
  body('street').notEmpty().withMessage('street is required'),
  body('neighborhood').notEmpty().withMessage('neighborhood is required'),
  body('zip').notEmpty().withMessage('zip is required'),
  body('city').notEmpty().withMessage('city is required'),
  body('state').notEmpty().withMessage('state is required'),
];

const validateIdParam = [
  param('id').isInt().withMessage('id must be a number'),
];

const validateCreateLocality = [...localityBody];
const validateUpdateLocality = [...validateIdParam, ...localityBody];

module.exports = {
  validateCreateLocality,
  validateUpdateLocality,
  validateIdParam,
};
