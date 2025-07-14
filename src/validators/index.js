const { loginValidation, createUserValidation } = require('./auth.validator');
const {
  validateCreateDonor,
  validateIdParam,
  validateBloodTypeParam,
  validateUpdateDonor,
} = require('./donor.validator');

const {
  validateTypeParam,
  validateBloodParam,
  validateBldParam,
  validateSentBody,
} = require('./histBlood.validator');

const {
  validateCreateStock,
  validateStockIdParam,
  validateUpdateStock,
} = require('./estBlood.validator');

const {
  validateCreateScheduling,
  validateSchedulingIdParam,
  validateUpdateScheduling,
} = require('./scheduling.validator');

const {
  validateCreateLocality,
  validateUpdateLocality,
  validateIdParam: validateLocalityIdParam,
} = require('./locality.validator');

const {
  validateCreateValidity,
  validateUpdateValidity,
  validateIdParam: validateValidityIdParam,
  validateBatchQuery,
} = require('./validity.validator');

module.exports = {
  loginValidation,
  createUserValidation,
  validateCreateDonor,
  validateIdParam,
  validateBloodTypeParam,
  validateUpdateDonor,
  validateTypeParam,
  validateBloodParam,
  validateBldParam,
  validateSentBody,
  validateCreateStock,
  validateStockIdParam,
  validateUpdateStock,
  validateCreateScheduling,
  validateSchedulingIdParam,
  validateUpdateScheduling,
  validateCreateLocality,
  validateUpdateLocality,
  validateLocalityIdParam,
  validateCreateValidity,
  validateUpdateValidity,
  validateValidityIdParam,
  validateBatchQuery,
};
