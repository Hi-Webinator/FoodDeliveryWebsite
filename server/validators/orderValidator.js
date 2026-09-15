'use strict';

const { body } = require('express-validator');

const { LIMITS, PHONE_PATTERN } = require('../config/constants');

/**
 * Rules for POST /api/orders. Every string is trimmed and escaped so nothing
 * that reaches the database can be replayed into a page as markup.
 *
 * TS: `ValidationChain[]`
 */
const createOrderRules = [
  body('customerName')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .isLength({ max: LIMITS.CUSTOMER_NAME_MAX })
    .withMessage(`Name cannot exceed ${LIMITS.CUSTOMER_NAME_MAX} characters.`)
    .escape(),

  body('customerPhone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required.')
    .matches(PHONE_PATTERN)
    .withMessage('Phone number format is invalid.')
    .escape(),

  body('deliveryAddress')
    .trim()
    .notEmpty()
    .withMessage('Delivery address is required.')
    .isLength({ max: LIMITS.DELIVERY_ADDRESS_MAX })
    .withMessage(`Address cannot exceed ${LIMITS.DELIVERY_ADDRESS_MAX} characters.`)
    .escape(),

  body('items')
    .isArray({ min: 1 })
    .withMessage('An order must contain at least one item.'),

  body('items.*.menuItemId')
    .isMongoId()
    .withMessage('Each item needs a valid menuItemId.'),

  body('items.*.quantity')
    .isInt({ min: LIMITS.ITEM_QUANTITY_MIN, max: LIMITS.ITEM_QUANTITY_MAX })
    .withMessage(`Quantity must be between ${LIMITS.ITEM_QUANTITY_MIN} and ${LIMITS.ITEM_QUANTITY_MAX}.`)
    .toInt(),

  body('totalPrice')
    .isFloat({ min: LIMITS.TOTAL_PRICE_MIN })
    .withMessage('Total price must be a positive amount.')
    .toFloat(),
];

module.exports = { createOrderRules };
