const express = require('express');
const loadMiddlewares = require('@middlewares');

const app = express();

loadMiddlewares(app);

module.exports = app;
