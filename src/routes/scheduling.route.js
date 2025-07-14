const express = require('express');

const router = express.Router();
const schedulingController = require('../controllers/scheduling.controller');
const { authenticateJWT } = require('../middlewares/authenticate.middleware');
const { validate } = require('../middlewares/validateRequest.middleware');
const {
  validateCreateScheduling,
  validateSchedulingIdParam,
  validateUpdateScheduling,
} = require('../validators');

// Criar agendamento
router.post(
  '/',
  authenticateJWT,
  validate(validateCreateScheduling),
  (req, res) => schedulingController.criarAgendamento(req, res)
);

// Listar todos os agendamentos
router.get('/', (req, res) => schedulingController.listarAgendamentos(req, res));

// Atualizar agendamento por ID
router.put(
  '/:id',
  authenticateJWT,
  validate(validateUpdateScheduling),
  (req, res) => schedulingController.atualizarAgendamento(req, res)
);

// Deletar agendamento por ID
router.delete(
  '/:id',
  authenticateJWT,
  validate(validateSchedulingIdParam),
  (req, res) => schedulingController.deletarAgendamento(req, res)
);

module.exports = router;
