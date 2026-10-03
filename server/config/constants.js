'use strict';

/** Categories a menu item may belong to. Mirrored in client/src/constants. */
const MENU_CATEGORIES = ['burger', 'pizza', 'sushi', 'drinks', 'dessert'];

/** Lifecycle of an order. */
const ORDER_STATUSES = ['pending', 'confirmed', 'delivering', 'delivered'];

const DEFAULT_ORDER_STATUS = 'pending';

/** Validation bounds, shared between the Mongoose schema and express-validator. */
const LIMITS = {
  CUSTOMER_NAME_MAX: 100,
  DELIVERY_ADDRESS_MAX: 255,
  ITEM_QUANTITY_MIN: 1,
  ITEM_QUANTITY_MAX: 99,
  TOTAL_PRICE_MIN: 0.01,
  RATING_MIN: 0,
  RATING_MAX: 5,
  JSON_BODY_LIMIT: '10kb',
  ORDER_LIST_DEFAULT: 50,
  ORDER_LIST_MAX: 100,
};

/** Rate limiting: 100 requests / 15 min globally, 10 / 15 min for new orders. */
const RATE_LIMITS = {
  WINDOW_MS: 15 * 60 * 1000,
  API_MAX: 100,
  CREATE_ORDER_MAX: 10,
};

/** A loose international phone pattern: optional +, 7-20 digits, spaces/dashes. */
const PHONE_PATTERN = /^\+?[0-9\s\-().]{7,20}$/;

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

const SHUTDOWN_TIMEOUT_MS = 10_000;

module.exports = {
  MENU_CATEGORIES,
  ORDER_STATUSES,
  DEFAULT_ORDER_STATUS,
  LIMITS,
  RATE_LIMITS,
  PHONE_PATTERN,
  HTTP_STATUS,
  SHUTDOWN_TIMEOUT_MS,
};
