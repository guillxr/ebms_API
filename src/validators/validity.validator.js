const { body, param, query } = require('express-validator');

const baseValidityBody = [
  body('batch').notEmpty().withMessage('batch is required'),
  body('quantity')
    .notEmpty().withMessage('quantity is required')
    .isInt({ min: 1 }).withMessage('quantity must be a number'),
  body('expirationDate')
    .notEmpty().withMessage('expirationDate is required')
    .isISO8601().withMessage('expirationDate must be a valid date'),
  body('status').notEmpty().withMessage('status is required'),
];

const validateIdParam = [
  param('id').isUUID().withMessage('id must be a valid UUID'),
];

const validateBatchQuery = [
  query('batch').optional().isString().withMessage('batch must be a string'),
];

const validateCreateValidity = [...baseValidityBody];
const validateUpdateValidity = [
  ...validateIdParam,
  ...baseValidityBody,
];

module.exports = {
  validateCreateValidity,
  validateUpdateValidity,
  validateIdParam,
  validateBatchQuery,
};
