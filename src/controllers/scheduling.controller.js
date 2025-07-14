const servicoAgendamento = require('../services/scheduling.service.js');

class SchedulingController {
    
  // Cria um novo agendamento
  async criarAgendamento(req, res) {
    try {
      const agendamento = await servicoAgendamento.criarAgendamento(req.body);
      res.status(201).json(agendamento);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Lista todos os agendamentos
  async listarAgendamentos(req, res) {
    try {
      const agendamentos = await servicoAgendamento.listarAgendamentos();
      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Atualiza um agendamento pelo ID
  async atualizarAgendamento(req, res) {
    try {
      const { id } = req.params;
      const agendamentoAtualizado = await servicoAgendamento.atualizarAgendamento(id, req.body);
      if (!agendamentoAtualizado) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }
      res.status(200).json(agendamentoAtualizado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Deleta um agendamento pelo ID
  async deletarAgendamento(req, res) {
    try {
      const { id } = req.params;
      const agendamentoRemovido = await servicoAgendamento.deletarAgendamento(id);
      if (!agendamentoRemovido) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new SchedulingController();
