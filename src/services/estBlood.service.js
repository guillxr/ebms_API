const Stock = require('../models/estBlood.model.js');

class EstoqueService {
  async adicionarLote(loteData) {
    const lote = new Stock(loteData);
    return await lote.save();
  }

  async consultarEstoque() {
    return await Stock.find();
  }

  async atualizarQuantidade(id, quantidade) {
    return await Stock.findByIdAndUpdate(id, { quantidade }, { new: true });
  }

  async removerLote(id) {
    return await Stock.findByIdAndDelete(id);
  }
}

module.exports = new EstoqueService();
