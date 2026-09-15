'use strict';

require('dotenv').config();

const createApp = require('./app');
const { connectDatabase, disconnectDatabase } = require('./config/database');
const { SHUTDOWN_TIMEOUT_MS } = require('./config/constants');

const REQUIRED_ENV = ['MONGODB_URI', 'CLIENT_URL', 'API_KEY_ADMIN', 'JWT_SECRET'];

/** Refuse to boot half-configured — a missing secret must not fail silently. */
const assertEnv = () => {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

const start = async () => {
  assertEnv();

  await connectDatabase(process.env.MONGODB_URI);
  console.log('[db] connected');

  const port = Number(process.env.PORT) || 5000;
  const server = createApp().listen(port, () => {
    console.log(`[server] listening on http://localhost:${port} (${process.env.NODE_ENV})`);
  });

  let shuttingDown = false;

  /** Stop accepting connections, drain in-flight requests, then close the DB. */
  const shutdown = async (signal) => {
    if (shuttingDown) return;
    shuttingDown = true;

    console.log(`[server] ${signal} received, shutting down`);

    // If a request hangs, do not block the platform's stop timeout forever.
    const forceExit = setTimeout(() => {
      console.error('[server] forced shutdown after timeout');
      process.exit(1);
    }, SHUTDOWN_TIMEOUT_MS);
    forceExit.unref();

    server.close(async (closeError) => {
      try {
        await disconnectDatabase();
        console.log('[db] disconnected');
      } catch (error) {
        console.error('[db] failed to disconnect cleanly', error);
      }
      process.exit(closeError ? 1 : 0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  // A rejection nobody handled leaves the process in an unknown state.
  process.on('unhandledRejection', (reason) => {
    console.error('[fatal] unhandled rejection', reason);
    shutdown('unhandledRejection');
  });
};

start().catch((error) => {
  console.error('[fatal] failed to start server:', error.message);
  process.exit(1);
});
