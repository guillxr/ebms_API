const express = require('express');
const router = express.Router();
const schedulingController = require('../controllers/scheduling.controller');

// Criar agendamento
router.post('/', (req, res) => schedulingController.criarAgendamento(req, res));

// Listar todos os agendamentos
router.get('/', (req, res) => schedulingController.listarAgendamentos(req, res));

// Atualizar agendamento por ID
router.put('/:id', (req, res) => schedulingController.atualizarAgendamento(req, res));

// Deletar agendamento por ID
router.delete('/:id', (req, res) => schedulingController.deletarAgendamento(req, res));

module.exports = router;