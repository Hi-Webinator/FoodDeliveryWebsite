'use strict';

const express = require('express');

const MenuItem = require('../models/MenuItem');
const catchAsync = require('../middleware/catchAsync');
const validateRequest = require('../middleware/validateRequest');
const { categoryParamRules } = require('../validators/menuValidator');
const { HTTP_STATUS } = require('../config/constants');

const router = express.Router();

/**
 * Only available dishes are ever exposed, and always newest first.
 * Documents (not `.lean()`) so the schema toJSON transform runs and the client
 * receives `id` rather than `_id`.
 */
const findAvailable = (filter = {}) =>
  MenuItem.find({ ...filter, available: true }).sort({ createdAt: -1 });

/**
 * GET /api/menu
 * Every available menu item.
 */
router.get(
  '/',
  catchAsync(async (_req, res) => {
    const items = await findAvailable();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: items.length,
      data: items,
    });
  }),
);

/**
 * GET /api/menu/:category
 * Available menu items in one validated category.
 */
router.get(
  '/:category',
  categoryParamRules,
  validateRequest,
  catchAsync(async (req, res) => {
    const items = await findAvailable({ category: req.params.category.toLowerCase() });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: items.length,
      data: items,
    });
  }),
);

module.exports = router;
