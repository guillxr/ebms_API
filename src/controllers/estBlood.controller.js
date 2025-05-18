const estoqueService = require("../services/estBlood.service.js");

class EstoqueController {
  async adicionarLote(req, res) {
    try {
      const lote = await estoqueService.adicionarLote(req.body);
      res.status(201).json(lote);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async consultarEstoque(req, res) {
    try {
      const estoque = await estoqueService.consultarEstoque();
      res.status(200).json(estoque);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async atualizarQuantidade(req, res) {
    try {
      const { id } = req.params;
      const { quantidade } = req.body;
      const loteAtualizado = await estoqueService.atualizarQuantidade(id, quantidade);
      if (!loteAtualizado) {
        return res.status(404).json({ message: "Lote não encontrado" });
      }
      res.status(200).json(loteAtualizado);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async removerLote(req, res) {
    try {
      const { id } = req.params;
      const loteRemovido = await estoqueService.removerLote(id);
      if (!loteRemovido) {
        return res.status(404).json({ message: "Lote não encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new EstoqueController();
