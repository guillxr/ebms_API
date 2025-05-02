const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const config = require('@config');
const express = require('express');

const { createLimiter } = require('./rateLimits.middleware');
const { debugLogger } = require('./debugLogger.middleware');
const { errorHandler } = require('./errorHandler.middleware');

const loadMiddlewares = (app) => {
  app.use(helmet());
  app.use(cors(config.corsOptions));

  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(createLimiter());
  app.use(errorHandler);
  app.use(debugLogger);
};

module.exports = loadMiddlewares;
