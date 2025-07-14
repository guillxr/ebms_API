// Importing express, Router and controller.
const express = require('express');
const router = express.Router();
const localityController = require('@controllers/locality.controller');
const { authenticateJWT } = require('../middlewares/authenticate.middleware');
const { validate } = require('../middlewares/validateRequest.middleware');
const {
  validateCreateLocality,
  validateUpdateLocality,
  validateIdParam: validateLocalityIdParam,
} = require('../validators');

router.post(
  '/',
  authenticateJWT,
  validate(validateCreateLocality),
  localityController.createLocality
);

router.get('/', localityController.getAllLocality);

router.put(
  '/:id',
  authenticateJWT,
  validate(validateUpdateLocality),
  localityController.updateLocality
);

router.delete(
  '/:id',
  authenticateJWT,
  validate(validateLocalityIdParam),
  localityController.deletLocality
);

module.exports = router;
