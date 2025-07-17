const estoqueService = require('../services/estBlood.service.js');

class EstoqueController {
  // Criação de novo lote
  async adicionarLote(req, res) {
    try {
      const lote = await estoqueService.adicionarLote(req.body);
      res.status(201).json(lote);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Listagem do estoque
  async consultarEstoque(req, res) {
    try {
      const estoque = await estoqueService.consultarEstoque();
      res.status(200).json({ res: estoque });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Atualização completa dos campos de um lote
  async atualizarLote(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const loteAtualizado = await estoqueService.atualizarLote(id, data);
      if (!loteAtualizado) {
        return res.status(404).json({ message: 'Lote não encontrado' });
      }

      res.status(200).json(loteAtualizado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Exclusão de lote
  async removerLote(req, res) {
    try {
      const { id } = req.params;
      const loteRemovido = await estoqueService.removerLote(id);
      if (!loteRemovido) {
        return res.status(404).json({ message: 'Lote não encontrado' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new EstoqueController();