'use strict';

const mongoose = require('mongoose');

/**
 * Opens the single shared Mongoose connection.
 */
const connectDatabase = async (uri) => {
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Copy .env.example to .env and fill it in.');
  }

  // Fail fast instead of buffering queries against a server that is not there.
  mongoose.set('strictQuery', true);

  return mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 });
};

/** Closes the connection during shutdown. Safe to call when already closed. */
const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close(false);
  }
};

module.exports = { connectDatabase, disconnectDatabase };
