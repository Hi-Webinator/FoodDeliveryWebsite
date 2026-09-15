'use strict';

const AppError = require('../utils/AppError');
const { HTTP_STATUS } = require('../config/constants');

const GENERIC_MESSAGE = 'Something went wrong. Please try again later.';

/** Mongoose schema validation -> a 422 with the same shape as express-validator. */
const fromMongooseValidation = (error) =>
  new AppError(
    'Validation failed.',
    HTTP_STATUS.UNPROCESSABLE_ENTITY,
    Object.values(error.errors).map((field) => ({
      field: field.path,
      message: field.message,
    })),
  );

/** A malformed ObjectId in the URL is a client mistake, not a server fault. */
const fromCastError = (error) =>
  new AppError(`Invalid value for "${error.path}".`, HTTP_STATUS.BAD_REQUEST);

const fromDuplicateKey = (error) =>
  new AppError(
    `Duplicate value for ${Object.keys(error.keyValue ?? {}).join(', ')}.`,
    HTTP_STATUS.BAD_REQUEST,
  );

/** Normalises known library errors into AppError; leaves everything else alone. */
const normalize = (error) => {
  if (error instanceof AppError) return error;
  if (error.name === 'ValidationError' && error.errors) return fromMongooseValidation(error);
  if (error.name === 'CastError') return fromCastError(error);
  if (error.code === 11000) return fromDuplicateKey(error);
  if (error.name === 'JsonWebTokenError') {
    return new AppError('Invalid token.', HTTP_STATUS.UNAUTHORIZED);
  }
  if (error.type === 'entity.too.large') {
    return new AppError('Request body is too large.', HTTP_STATUS.BAD_REQUEST);
  }
  if (error instanceof SyntaxError && 'body' in error) {
    return new AppError('Request body is not valid JSON.', HTTP_STATUS.BAD_REQUEST);
  }
  return error;
};

/** 404 catch-all — mounted after every route so unknown paths land here. */
// TS: `RequestHandler`
const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found.`, HTTP_STATUS.NOT_FOUND));
};

/**
 * Central error handler. Must be the last `app.use`, and must keep all four
 * parameters or Express will not recognise it as an error handler.
 *
 * TS: `ErrorRequestHandler`
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  const error = normalize(err);
  const isProduction = process.env.NODE_ENV === 'production';
  const isOperational = error instanceof AppError && error.isOperational;
  const statusCode = error.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR;

  // Unexpected failures are always logged in full, whatever the environment.
  if (!isOperational) {
    console.error('[error]', err);
  }

  // TS: type this as `ApiErrorResponse`
  const body = {
    success: false,
    message: isOperational || !isProduction ? error.message : GENERIC_MESSAGE,
  };

  if (error.errors?.length) {
    body.errors = error.errors;
  }

  // Stack traces are a disclosure risk, so they never leave a production box.
  if (!isProduction && err.stack) {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
};

module.exports = { errorHandler, notFoundHandler };
