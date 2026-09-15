'use strict';

const mongoose = require('mongoose');

const { MENU_CATEGORIES, LIMITS } = require('../config/constants');

const URL_PATTERN = /^https?:\/\/.+/i;

// TS: `interface IMenuItem extends Document { ... }` then `new Schema<IMenuItem>({...})`
const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters.'],
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters.'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price cannot be negative.'],
    },
    category: {
      type: String,
      required: [true, 'Category is required.'],
      enum: {
        values: MENU_CATEGORIES,
        message: `Category must be one of: ${MENU_CATEGORIES.join(', ')}.`,
      },
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required.'],
      trim: true,
      validate: {
        validator: (value) => URL_PATTERN.test(value),
        message: 'Image must be a valid http(s) URL.',
      },
    },
    rating: {
      type: Number,
      min: [LIMITS.RATING_MIN, 'Rating cannot be below 0.'],
      max: [LIMITS.RATING_MAX, 'Rating cannot exceed 5.'],
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      // Expose `id` rather than `_id` so the client shape stays flat.
      transform: (_doc, ret) => {
        delete ret._id;
        return ret;
      },
    },
  },
);

// The menu is read by category constantly and written almost never.
menuItemSchema.index({ category: 1, available: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
