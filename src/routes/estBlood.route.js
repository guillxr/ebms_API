const express = require('express');

const estoqueController = require('../controllers/estBlood.controller.js');
const { authenticateJWT } = require('../middlewares/authenticate.middleware');
const { validate } = require('../middlewares/validateRequest.middleware');
const {
  validateCreateStock,
  validateStockIdParam,
  validateUpdateStock,
} = require('../validators');

const router = express.Router();

// Criar novo lote
router.post(
  '/stock',
  authenticateJWT,
  validate(validateCreateStock),
  estoqueController.adicionarLote
);

// Consultar todos os lotes
router.get('/stock', estoqueController.consultarEstoque);

// Atualizar lote (vários campos)
router.put(
  '/stock/:id',
  authenticateJWT,
  validate(validateUpdateStock),
  estoqueController.atualizarLote
);

// Remover lote
router.delete(
  '/stock/:id',
  authenticateJWT,
  validate(validateStockIdParam),
  estoqueController.removerLote
);

module.exports = router;