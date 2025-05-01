const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createLimiter } = require('@middlewares/rateLimits.middleware');
const { debugLogger } = require('@middlewares/debugLogger.middleware');
const compreesion = require('compression');

const app = express();

app.use(debugLogger);
app.use(compreesion());
app.use(helmet());
app.use(cors());
app.use(createLimiter());
app.use(express.json());

module.exports = app;
