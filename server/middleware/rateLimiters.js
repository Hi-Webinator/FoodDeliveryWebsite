'use strict';

const rateLimit = require('express-rate-limit');

const { RATE_LIMITS, HTTP_STATUS } = require('../config/constants');

// TS: these are `RateLimitRequestHandler`; the handler is `(req, res) => void`
/** Shared 429 body, so throttled responses match every other error shape. */
const tooManyRequests = (message) => (req, res) =>
  res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({ success: false, message });

/** 100 requests / 15 minutes across the whole /api surface. */
const apiLimiter = rateLimit({
  windowMs: RATE_LIMITS.WINDOW_MS,
  max: RATE_LIMITS.API_MAX,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: tooManyRequests('Too many requests. Please try again in a few minutes.'),
});

/** 10 order submissions / 15 minutes — writes are far more expensive to abuse. */
const createOrderLimiter = rateLimit({
  windowMs: RATE_LIMITS.WINDOW_MS,
  max: RATE_LIMITS.CREATE_ORDER_MAX,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: tooManyRequests('Too many orders placed from this device. Please try again later.'),
});

module.exports = { apiLimiter, createOrderLimiter };
