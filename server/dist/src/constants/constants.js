"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorCodes = void 0;
var errorCodes = {
  emailExists: 'email already exists',
  incorrectCredentials: 'Incorrect email or password',
  internalError: 'Internal error, please try again',
  emailNotExists: 'email not exists',
  tokenExpired: 'Token has expired. Please request another',
  passwordNotUpdated: 'Password cannot be updated. Please try once more'
};
exports.errorCodes = errorCodes;