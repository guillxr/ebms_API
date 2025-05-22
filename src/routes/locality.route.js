// Importing express, Router and controller.
const express = require('express');
const router = express.Router();
const localityController = require('@controllers/locality.controller');

router.post('/', localityController.createLocality);

router.get('/', localityController.getAllLocality);

router.put('/:id', localityController.updateLocality);

router.delete('/:id', localityController.deletLocality);

module.exports = router;
