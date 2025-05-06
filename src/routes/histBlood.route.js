// Importing express, Router and controller.
const express = require('express');
const router = express.Router();
const histBloodController = require('@controllers/histBlood.controller');

// Reading route for all blood types.
router.get('/', histBloodController.read)

// Route to reading a desired blood type.
router.get('/:type', histBloodController.readtype)

// Blood Type Upgrade Route.
router.put('/update/:blood', histBloodController.update)

// Exporting the router.
module.exports = router;