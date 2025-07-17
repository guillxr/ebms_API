const { body, param } = require('express-validator');

const validBloodTypes = [
  'A_POSITIVO', 'A_NEGATIVO', 'B_POSITIVO', 'B_NEGATIVO',
  'AB_POSITIVO', 'AB_NEGATIVO', 'O_POSITIVO', 'O_NEGATIVO'
];

const validateCreateStock = [
  body('id').optional().isInt().withMessage('id must be a number'),
  body('lote').notEmpty().withMessage('lote is required'),
  body('blood_type')
    .notEmpty().withMessage('blood_type is required')
    .isIn(validBloodTypes).withMessage('invalid blood type'),
  body('quantidade')
    .notEmpty().withMessage('quantidade is required')
    .isInt({ min: 0 }).withMessage('quantidade must be a number'),
  body('validade')
    .notEmpty().withMessage('validade is required')
    .isISO8601().withMessage('validade must be a valid ISO date'),
  body('status')
    .notEmpty().withMessage('status is required')
    .isString().withMessage('status must be a string'),
];

const validateStockIdParam = [
  param('id').isInt().withMessage('id must be a number'),
];

const validateUpdateStock = [
  ...validateStockIdParam,
  body('quantidade')
    .optional()
    .isInt({ min: 0 }).withMessage('quantidade must be a number'),
  body('validade')
    .optional()
    .isISO8601().withMessage('validade must be a valid ISO date'),
  body('status')
    .optional()
    .isString().withMessage('status must be a string'),
  body('blood_type')
    .optional()
    .isIn(validBloodTypes).withMessage('invalid blood type'),
];

module.exports = {
  validateCreateStock,
  validateStockIdParam,
  validateUpdateStock,
};