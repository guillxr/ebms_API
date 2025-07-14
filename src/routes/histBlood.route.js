// Importing express, Router and controller.
const express = require('express');
const router = express.Router();
const histBloodController = require('@controllers/histBlood.controller');
const { authenticateJWT } = require('../middlewares/authenticate.middleware');
const { validate } = require('../middlewares/validateRequest.middleware');
const {
  validateTypeParam,
  validateBloodParam,
  validateBldParam,
  validateSentBody,
} = require('../validators');

// Creates initial blood type data.
router.post('/create', authenticateJWT, histBloodController.create);

// Reading route for all blood types.
router.get('/', histBloodController.read);

// Route to reading a desired blood type.
router.get('/:type', validate(validateTypeParam), histBloodController.readtype);

// Blood Type Upgrade Route.
router.put(
  '/update/:blood',
  authenticateJWT,
  validate([...validateBloodParam, ...validateSentBody]),
  histBloodController.update
);

// Blood Type Reversal Route.
router.put(
  '/revert/:bld',
  authenticateJWT,
  validate(validateBldParam),
  histBloodController.revertLast
);

// Delete changes and return everything to its initial state.
router.delete('/delete', authenticateJWT, histBloodController.delete);

// Exporting the router.
module.exports = router;
