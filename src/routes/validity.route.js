const express = require('express');
const router = express.Router();
const controller = require('@controllers/validity.controller');

router.post('/', controller.createStockValidity);

router.get('/', controller.getStockValidity);

router.put('/:id', controller.updateStockValidity);

router.delete('/:id', controller.deleteStockValidity);

module.exports = router;