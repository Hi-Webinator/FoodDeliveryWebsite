'use strict';

const { validationResult } = require('express-validator');
const { HTTP_STATUS } = require('../config/constants');

/**
 * Terminates the request with a 422 when any express-validator rule in the
 * chain failed. Place it immediately after the rule array on a route.
 *
 * TS: `RequestHandler`
 */
const validateRequest = (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  // TS: type this as `ValidationIssue[]` — { field: string; message: string }
  const errors = result.array().map((error) => ({
    field: error.path ?? error.param,
    message: error.msg,
  }));

  return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).json({
    success: false,
    message: 'Validation failed.',
    errors,
  });
};

module.exports = validateRequest;
