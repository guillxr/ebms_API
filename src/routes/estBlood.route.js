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

router.post(
  '/stock',
  authenticateJWT,
  validate(validateCreateStock),
  estoqueController.adicionarLote
);
router.get('/stock', estoqueController.consultarEstoque);
router.put(
  '/stock/:id',
  authenticateJWT,
  validate(validateUpdateStock),
  estoqueController.atualizarQuantidade
);
router.delete(
  '/stock/:id',
  authenticateJWT,
  validate(validateStockIdParam),
  estoqueController.removerLote
);

module.exports = router;
