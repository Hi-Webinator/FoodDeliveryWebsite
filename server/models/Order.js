'use strict';

const mongoose = require('mongoose');

const { ORDER_STATUSES, DEFAULT_ORDER_STATUS, LIMITS, PHONE_PATTERN } = require('../config/constants');

// TS: `interface IOrderItem { menuItemId: Types.ObjectId; name: string; price: number; quantity: number }`
const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: [true, 'menuItemId is required.'],
    },
    name: {
      type: String,
      required: [true, 'Item name is required.'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Item price is required.'],
      min: [0, 'Item price cannot be negative.'],
    },
    quantity: {
      type: Number,
      required: [true, 'Item quantity is required.'],
      min: [LIMITS.ITEM_QUANTITY_MIN, 'Quantity must be at least 1.'],
      max: [LIMITS.ITEM_QUANTITY_MAX, 'Quantity cannot exceed 99.'],
    },
  },
  { _id: false },
);

// TS: `interface IOrder extends Document { ... }` then `new Schema<IOrder>({...})`
const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: 'An order must contain at least one item.',
      },
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required.'],
      min: [0, 'Total price cannot be negative.'],
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required.'],
      trim: true,
      maxlength: [LIMITS.CUSTOMER_NAME_MAX, 'Name cannot exceed 100 characters.'],
    },
    customerPhone: {
      type: String,
      required: [true, 'Customer phone is required.'],
      trim: true,
      match: [PHONE_PATTERN, 'Phone number format is invalid.'],
    },
    deliveryAddress: {
      type: String,
      required: [true, 'Delivery address is required.'],
      trim: true,
      maxlength: [LIMITS.DELIVERY_ADDRESS_MAX, 'Address cannot exceed 255 characters.'],
    },
    status: {
      type: String,
      enum: {
        values: ORDER_STATUSES,
        message: `Status must be one of: ${ORDER_STATUSES.join(', ')}.`,
      },
      default: DEFAULT_ORDER_STATUS,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  },
);

// The admin list is always "newest first".
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
