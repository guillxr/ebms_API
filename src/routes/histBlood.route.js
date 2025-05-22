// Importing express, Router and controller.
const express = require('express');
const router = express.Router();
const histBloodController = require('@controllers/histBlood.controller');

// Creates initial blood type data.
router.post('/create', histBloodController.create);

// Reading route for all blood types.
router.get('/', histBloodController.read);

// Route to reading a desired blood type.
router.get('/:type', histBloodController.readtype);

// Blood Type Upgrade Route.
router.put('/update/:blood', histBloodController.update);

// Blood Type Reversal Route.
router.put('/revert/:bld', histBloodController.revertLast);

// Delete changes and return everything to its initial state.
router.delete('/delete', histBloodController.delete);

// Exporting the router.
module.exports = router;
