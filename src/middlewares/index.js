const helmet = require('helmet');
const compreesion = require('compression');
const cors = require('cors');
const config = require('@config');
const express = require('express');

const { createLimiter } = require('./rateLimits.middleware');
const { debugLogger } = require('./debugLogger.middleware');

const loadMiddlewares = (app) => {
  app.use(helmet());
  app.use(cors(config.corsOptions));

  app.use(compreesion());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(debugLogger);

  app.use(createLimiter);
};

module.exports = loadMiddlewares;
