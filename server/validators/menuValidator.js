'use strict';

const { param } = require('express-validator');

const { MENU_CATEGORIES } = require('../config/constants');

/**
 * Rules for GET /api/menu/:category.
 *
 * TS: `ValidationChain[]`
 */
const categoryParamRules = [
  param('category')
    .trim()
    .toLowerCase()
    .isIn(MENU_CATEGORIES)
    .withMessage(`Category must be one of: ${MENU_CATEGORIES.join(', ')}.`),
];

module.exports = { categoryParamRules };
