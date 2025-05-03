const { loginValidation } = require('./auth.validator');
const donorValidation = require('./donor.validator');

module.exports = {
  ...loginValidation,
  ...donorValidation,
};
