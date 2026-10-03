'use strict';

const crypto = require('node:crypto');

const AppError = require('../utils/AppError');
const { HTTP_STATUS } = require('../config/constants');

const API_KEY_HEADER = 'x-api-key';

/** Length-safe constant-time comparison, so we never leak the key by timing. */
const isSameSecret = (a, b) => {
  const bufferA = Buffer.from(String(a));
  const bufferB = Buffer.from(String(b));

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufferA, bufferB);
};

/**
 * Guards admin-only routes with a shared secret sent in `x-api-key`.
 * This is deliberately minimal — swap it for the JWT flow when real auth lands.
 */
const adminAuth = (req, _res, next) => {
  const expected = process.env.API_KEY_ADMIN;

  if (!expected) {
    // Misconfiguration must fail closed, never open.
    return next(new AppError('Admin access is not configured.', HTTP_STATUS.FORBIDDEN));
  }

  const provided = req.get(API_KEY_HEADER);

  if (!provided || !isSameSecret(provided, expected)) {
    return next(new AppError('Invalid or missing API key.', HTTP_STATUS.UNAUTHORIZED));
  }

  return next();
};

module.exports = adminAuth;
