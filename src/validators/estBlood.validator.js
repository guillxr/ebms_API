const { body, param } = require('express-validator');

const validateCreateStock = [
  body('id').optional().isInt().withMessage('id must be a number'),
  body('lote').notEmpty().withMessage('lote is required'),
  body('quantidade')
    .notEmpty().withMessage('quantidade is required')
    .isInt({ min: 0 }).withMessage('quantidade must be a number'),
  body('validade')
    .notEmpty().withMessage('validade is required')
    .isISO8601().withMessage('validade must be a valid date'),
  body('status').optional().isString(),
];

const validateStockIdParam = [
  param('id').isInt().withMessage('id must be a number'),
];

const validateUpdateStock = [
  ...validateStockIdParam,
  body('quantidade')
    .notEmpty().withMessage('quantidade is required')
    .isInt({ min: 0 }).withMessage('quantidade must be a number'),
];

module.exports = {
  validateCreateStock,
  validateStockIdParam,
  validateUpdateStock,
};
