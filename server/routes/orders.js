'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');

const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const catchAsync = require('../middleware/catchAsync');
const validateRequest = require('../middleware/validateRequest');
const adminAuth = require('../middleware/adminAuth');
const AppError = require('../utils/AppError');
const { createOrderRules } = require('../validators/orderValidator');
const { createOrderLimiter } = require('../middleware/rateLimiters');
const { HTTP_STATUS, LIMITS } = require('../config/constants');

const router = express.Router();

/** Cents-precision rounding — floats cannot be trusted to add up to a total. */
const roundMoney = (value) => Math.round(value * 100) / 100;

/** Prices the client sent are advisory only; the database is authoritative. */
const buildPricedItems = async (requestedItems) => {
  const ids = requestedItems.map((item) => item.menuItemId);
  const found = await MenuItem.find({ _id: { $in: ids }, available: true }).lean();
  const byId = new Map(found.map((item) => [String(item._id), item]));

  return requestedItems.map((requested) => {
    const menuItem = byId.get(String(requested.menuItemId));

    if (!menuItem) {
      throw new AppError(
        'One or more items are no longer available.',
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        [{ field: 'items', message: `Menu item ${requested.menuItemId} is unavailable.` }],
      );
    }

    return {
      menuItemId: menuItem._id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: requested.quantity,
    };
  });
};

/** Signs a short-lived token the customer can later use to look their order up. */
const signOrderToken = (orderId) =>
  jwt.sign({ orderId, scope: 'order:read' }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? '2h',
  });

/**
 * POST /api/orders
 * Places an order. Rate limited, fully validated, and re-priced server-side.
 */
// TS: `RequestHandler<unknown, ApiResponse<Order>, CreateOrderPayload>`
router.post(
  '/',
  createOrderLimiter,
  createOrderRules,
  validateRequest,
  catchAsync(async (req, res) => {
    const { items, customerName, customerPhone, deliveryAddress } = req.body;

    const pricedItems = await buildPricedItems(items);
    const totalPrice = roundMoney(
      pricedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    );

    // A mismatch means the menu changed under the customer, or the payload was
    // tampered with. Either way the client must re-confirm the real total.
    if (Math.abs(totalPrice - Number(req.body.totalPrice)) > 0.01) {
      throw new AppError('Order total does not match current menu prices.', HTTP_STATUS.UNPROCESSABLE_ENTITY, [
        { field: 'totalPrice', message: `Expected ${totalPrice.toFixed(2)}.` },
      ]);
    }

    const order = await Order.create({
      items: pricedItems,
      totalPrice,
      customerName,
      customerPhone,
      deliveryAddress,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: 'Order placed successfully.',
      data: order.toJSON(),
      token: signOrderToken(order.id),
    });
  }),
);

/**
 * GET /api/orders
 * Admin-only listing, newest first. Requires the `x-api-key` header.
 */
// TS: `RequestHandler<unknown, ApiResponse<Order[]>, unknown, OrderListQuery>`
router.get(
  '/',
  adminAuth,
  catchAsync(async (req, res) => {
    const limit = Math.min(
      Number(req.query.limit) || LIMITS.ORDER_LIST_DEFAULT,
      LIMITS.ORDER_LIST_MAX,
    );

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  }),
);

module.exports = router;
