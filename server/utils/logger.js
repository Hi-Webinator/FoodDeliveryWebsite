'use strict';

const morgan = require('morgan');

/**
 * HTTP request logging. `dev` is colourised and concise; `combined` is the
 * Apache format, which is what log shippers expect in production.
 *
 * TS: `(nodeEnv: string) => RequestHandler`
 */
const createRequestLogger = (nodeEnv) => {
  const format = nodeEnv === 'production' ? 'combined' : 'dev';

  return morgan(format, {
    // Health checks would otherwise drown out real traffic.
    skip: (req) => req.originalUrl === '/health',
  });
};

module.exports = { createRequestLogger };
