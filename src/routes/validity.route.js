const express = require('express');
const router = express.Router();
const controller = require('@controllers/validity.controller');
const { authenticateJWT } = require('../middlewares/authenticate.middleware');
const { validate } = require('../middlewares/validateRequest.middleware');
const {
  validateCreateValidity,
  validateUpdateValidity,
  validateIdParam: validateValidityIdParam,
  validateBatchQuery,
} = require('../validators');

router.post(
  '/',
  authenticateJWT,
  validate(validateCreateValidity),
  controller.createStockValidity
);

router.get('/', validate(validateBatchQuery), controller.getStockValidity);

router.put(
  '/:id',
  authenticateJWT,
  validate(validateUpdateValidity),
  controller.updateStockValidity
);

router.delete(
  '/:id',
  authenticateJWT,
  validate(validateValidityIdParam),
  controller.deleteStockValidity
);

module.exports = router;
