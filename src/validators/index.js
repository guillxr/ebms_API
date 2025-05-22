const { loginValidation, createUserValidation } = require('./auth.validator');
const {
  validateCreateDonor,
  validateIdParam,
  validateBloodTypeParam,
  validateUpdateDonor
} = require('./donor.validator');

module.exports = {
  loginValidation,
  createUserValidation,
  validateCreateDonor,
  validateIdParam,
  validateBloodTypeParam,
  validateUpdateDonor
};
