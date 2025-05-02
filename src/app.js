const express = require('express');
const loadMiddlewares = require('@middlewares');
const { loadRoutes } = require('@routes');

const app = express();

loadMiddlewares(app);

loadRoutes(app);

module.exports = app;
