const express = require('express');

const estoqueController = require('../controllers/estBlood.controller.js');

const router = express.Router();

router.post('/stock', estoqueController.adicionarLote);
router.get('/stock', estoqueController.consultarEstoque);
router.put('/stock/:id', estoqueController.atualizarQuantidade);
router.delete('/stock/:id', estoqueController.removerLote);

module.exports = router;
