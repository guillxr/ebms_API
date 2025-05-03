const { body } = require('@middlewares/validateRequest.middleware');

const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .withMessage('Username must be a string'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const createAdminValidation = [
  body('credentials')
    .notEmpty()
    .withMessage('Credentials is required')
    .equals(process.env.CREDENTIALS)
    .withMessage('Access credentials denied!'),
];

module.exports = {
  loginValidation,
  createAdminValidation,
};
