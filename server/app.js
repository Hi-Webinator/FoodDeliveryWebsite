'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');
const { apiLimiter } = require('./middleware/rateLimiters');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { createRequestLogger } = require('./utils/logger');
const { LIMITS, HTTP_STATUS } = require('./config/constants');

/**
 * Builds the Express app. Kept separate from server.js so the whole stack can
 * be mounted in a test without binding a port.
 *
 * TS: `() => Express`
 */
const createApp = () => {
  const app = express();

  // Behind a proxy (Render/Heroku/nginx) the rate limiter needs the real IP.
  app.set('trust proxy', 1);

  // --- Security -----------------------------------------------------------
  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST'],
    }),
  );

  // --- Parsing ------------------------------------------------------------
  // A hard body cap keeps a single request from exhausting memory.
  app.use(express.json({ limit: LIMITS.JSON_BODY_LIMIT }));
  app.use(express.urlencoded({ extended: true, limit: LIMITS.JSON_BODY_LIMIT }));

  // --- Observability ------------------------------------------------------
  app.use(createRequestLogger(process.env.NODE_ENV));

  // --- Routes -------------------------------------------------------------
  app.get('/health', (_req, res) =>
    res.status(HTTP_STATUS.OK).json({ success: true, message: 'ok', uptime: process.uptime() }),
  );

  app.use('/api', apiLimiter);
  app.use('/api/menu', menuRoutes);
  app.use('/api/orders', orderRoutes);

  // --- Errors -------------------------------------------------------------
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
