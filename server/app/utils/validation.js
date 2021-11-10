import sha256 from 'sha256';
import { check } from 'express-validator';
import passport from 'passport';
import {
  PASSWORD_IS_EMPTY,
  PASSWORD_LENGTH_MUST_BE_MORE_THAN_8,
  USERNAME_IS_EMPTY,
  EMPTY_FULLNAME,
  EMPTY_CATEGORY,
  EMPTY_VALUE,
  EMPTY_DATE,
  EMPTY_TITLE,
  EMPTY_DESC
} from '../constant/index.js';

export const generateHashedPassword = password => sha256(password);
export function generateServerErrorCode(res, code, fullError, msg, location = 'server') {
  const errors = {};
  errors[location] = {
    fullError,
    msg,
  };
  return res.status(code).json({
    code,
    fullError,
    errors,
  });
}
// ================================
// Validation:
// Handle all validation check for the server
// ================================
export const authorizeValidation = passport.authenticate('jwt', { session: false });
export const registerValidation = [
  check('username')
    .exists()
    .withMessage(USERNAME_IS_EMPTY),
  check('password')
    .exists()
    .withMessage(PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
  check('fullname')
    .exists()
    .withMessage(EMPTY_FULLNAME)
];
export const loginValidation = [
  check('username')
    .exists()
    .withMessage(USERNAME_IS_EMPTY),
  check('password')
    .exists()
    .withMessage(PASSWORD_IS_EMPTY)
    .isLength({ min: 8 })
    .withMessage(PASSWORD_LENGTH_MUST_BE_MORE_THAN_8),
];
export const expenseValidation = [
  authorizeValidation,
  check('category')
    .exists()
    .withMessage(EMPTY_CATEGORY),
  check('title')
    .exists()
    .withMessage(EMPTY_TITLE),
  check('date')
    .exists()
    .withMessage(EMPTY_DATE),
  check('value')
    .exists()
    .withMessage(EMPTY_VALUE)
];

export const categoryValidation = [
  authorizeValidation,
  check('title')
    .exists()
    .withMessage(EMPTY_TITLE),
  check('description')
    .exists()
    .withMessage(EMPTY_DESC),
]
