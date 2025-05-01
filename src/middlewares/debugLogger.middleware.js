const { log } = require('@utils/logger');
const config = require('@config');

const debugLogger = (req, res, next) => {
  try {
    if (config.debug) {
      const timestrap = new Date().toISOString();
      const { method, originalUrl, headers, body } = req;

      const logMessage = `[DEBUG] [${timestrap}] ${method} ${originalUrl}`;
      log(logMessage, config.logging);

      if (config.logging === 'verbose') {
        log(`[DEBUG] Headers: ${JSON.stringify(headers)}`, config.logging);
        log(`[DEBUG] body: ${JSON.stringify(body)}`, config.logging);
      }
    }
  } catch (error) {
    console.error('[Logger Error]', error);
  } finally {
    next();
  }
};

module.exports = { debugLogger };
