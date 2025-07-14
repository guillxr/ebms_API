const { body, param } = require('express-validator');

const validStatuses = ['agendado', 'cancelado', 'concluído'];

const validateCreateScheduling = [
  body('usuario_id').notEmpty().withMessage('usuario_id is required'),
  body('data_agendamento')
    .notEmpty().withMessage('data_agendamento is required')
    .isISO8601().withMessage('data_agendamento must be a valid date'),
  body('local').optional().isString(),
  body('status').optional().isIn(validStatuses).withMessage('Invalid status'),
];

const validateSchedulingIdParam = [
  param('id').isUUID().withMessage('Invalid id'),
];

const validateUpdateScheduling = [
  ...validateSchedulingIdParam,
  body('usuario_id').optional(),
  body('data_agendamento').optional().isISO8601().withMessage('data_agendamento must be a valid date'),
  body('local').optional().isString(),
  body('status').optional().isIn(validStatuses).withMessage('Invalid status'),
];

module.exports = {
  validateCreateScheduling,
  validateSchedulingIdParam,
  validateUpdateScheduling,
};
