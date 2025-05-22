import { body } from 'express-validator';

const loginValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

const createUserValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['DONOR', 'ADMIN']).withMessage('Role must be DONOR or ADMIN'),
];

module.exports = {
  loginValidation,
  createUserValidation,
};