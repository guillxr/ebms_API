import { body, param } from 'express-validator';

const validGenders = ['Masculino', 'Feminino', 'Outro'];
const validContactPreferences = ['email', 'sms', 'whatsapp', 'call'];
const validBloodTypes = [
  'A_POSITIVO', 'A_NEGATIVO', 'B_POSITIVO', 'B_NEGATIVO',
'AB_POSITIVO', 'AB_NEGATIVO', 'O_POSITIVO', 'O_NEGATIVO'
];

const validateCreateDonor = [
  body('name')
    .notEmpty().withMessage('Full name is required')
    .trim().escape()
    .isLength({ min: 5, max: 100 }).withMessage('Name must be between 5 and 100 characters'),

  body('birth_date')
    .notEmpty().withMessage('Birth date is required')
    .isISO8601().withMessage('Invalid date format (YYYY-MM-DD)')
    .custom((date) => {
      const birthDate = new Date(date);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 18);
      if (birthDate > minDate) {
        throw new Error('Donor must be at least 18 years old');
      }
      return true;
    }),

  body('blood_type')
    .notEmpty().withMessage('Blood type is required')
    .isIn(validBloodTypes).withMessage('Invalid blood type'),

  body('gender')
    .notEmpty().withMessage('Gender is required')
    .isIn(validGenders).withMessage('Invalid gender'),

  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone('any').withMessage('Invalid phone number')
    .customSanitizer((value) => value.replace(/\D/g, '')),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),

  body('identity_document')
    .notEmpty().withMessage('ID document is required')
    .isLength({ min: 8, max: 20 }).withMessage('ID must be between 8 and 20 characters')
    .customSanitizer((value) => value.replace(/\D/g, '')),

  body('address')
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 10, max: 200 }).withMessage('Address must be between 10 and 200 characters'),

  body('latitude')
    .optional()
    .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude value'),

  body('longitude')
    .optional()
    .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude value'),

  body('last_donation')
    .optional()
    .isISO8601().withMessage('Invalid date format (YYYY-MM-DD)')
    .custom((date) => {
      if (new Date(date) > new Date()) {
        throw new Error('Last donation date cannot be in the future');
      }
      return true;
    }),

  body('donation_frequency')
    .optional()
    .isInt({ min: 0 }).withMessage('Donation frequency must be a positive number'),

  body('eligibility_status')
    .optional()
    .isBoolean().withMessage('Eligibility status must be true or false'),

  body('contact_preferences')
    .optional()
    .isArray().withMessage('Contact preferences must be an array')
    .custom((values) => {
      if (values.some((v) => !validContactPreferences.includes(v))) {
        throw new Error('Invalid contact preference');
      }
      return true;
    }),
];

const validateIdParam = [
  param('id').isUUID().withMessage('ID must be a valid UUID'),
];

const validateBloodTypeParam = [
  param('bloodType')
    .notEmpty().withMessage('Blood type is required')
    .isIn(validBloodTypes).withMessage('Invalid blood type'),
];

const validateUpdateDonor = [
  ...validateIdParam,

  body('name')
    .optional()
    .notEmpty().withMessage('Name cannot be empty')
    .trim().escape()
    .isLength({ min: 5, max: 100 }).withMessage('Name must be between 5 and 100 characters'),

  body('birth_date')
    .optional()
    .isISO8601().withMessage('Invalid date format (YYYY-MM-DD)'),

  body('blood_type')
    .optional()
    .isIn(validBloodTypes).withMessage('Invalid blood type'),

  body('gender')
    .optional()
    .isIn(validGenders).withMessage('Invalid gender'),

  body('phone')
    .optional()
    .isMobilePhone('any').withMessage('Invalid phone number'),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email address'),

  body('identity_document')
    .optional()
    .isLength({ min: 8, max: 20 }).withMessage('ID must be between 8 and 20 characters'),

  body('address')
    .optional()
    .isLength({ min: 10, max: 200 }).withMessage('Address must be between 10 and 200 characters'),
];

module.exports = {
  validateCreateDonor,
  validateIdParam,
  validateBloodTypeParam,
  validateUpdateDonor,
};