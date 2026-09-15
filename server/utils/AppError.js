'use strict';

const { HTTP_STATUS } = require('../config/constants');

/**
 * An error we raised deliberately and whose message is safe to send to clients.
 * Anything that is not an AppError is treated as a programming bug and
 * reported generically in production.
 */
// TS: `class AppError extends Error { statusCode: number; errors: ValidationIssue[]; isOperational: true }`
class AppError extends Error {
  constructor(message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = []) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
