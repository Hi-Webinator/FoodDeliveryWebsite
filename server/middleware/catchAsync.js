'use strict';

/**
 * Wraps an async route handler so a rejected promise reaches Express's error
 * pipeline instead of becoming an unhandled rejection.
 *
 * TS: `<T extends RequestHandler>(fn: T): RequestHandler`
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
