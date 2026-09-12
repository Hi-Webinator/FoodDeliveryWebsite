'use strict';

require('dotenv').config();

const MenuItem = require('../models/MenuItem');
const MENU_SEED = require('./menuItems');
const { connectDatabase, disconnectDatabase } = require('../config/database');

/**
 * Replaces the menu collection with the seed set.
 * Run with `npm run seed` from /server.
 */
const seed = async () => {
  await connectDatabase(process.env.MONGODB_URI);
  console.log('[seed] connected');

  const removed = await MenuItem.deleteMany({});
  console.log(`[seed] removed ${removed.deletedCount} existing item(s)`);

  const created = await MenuItem.insertMany(MENU_SEED);
  console.log(`[seed] inserted ${created.length} menu item(s)`);
};

seed()
  .then(async () => {
    await disconnectDatabase();
    console.log('[seed] done');
    process.exit(0);
  })
  .catch(async (error) => {
    console.error('[seed] failed:', error.message);
    await disconnectDatabase();
    process.exit(1);
  });
