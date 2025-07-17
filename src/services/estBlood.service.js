// Importing prisma.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EstoqueService {
  // Criação dos dados
  async adicionarLote(loteData) {
    try {
      const novoLote = await prisma.stock.create({
        data: {
          id: loteData.id,
          lote: loteData.lote,
          blood_type: loteData.blood_type,
          quantidade: loteData.quantidade,
          validade: loteData.validade,
          status: loteData.status,
        },
      });
      return novoLote;
    } catch (error) {
      console.error("Error creating lote:", error);
      throw new Error("Erro ao criar lote");
    }
  }

  // Consulta a lista de estoque diretamente do Banco
  async consultarEstoque() {
    try {
      return await prisma.stock.findMany();
    } catch (error) {
      console.error("Error fetching stock:", error);
      throw new Error("Erro ao consultar estoque");
    }
  }

  // Atualizar lote
  async atualizarLote(id, dadosAtualizados) {
    try {
      return await prisma.stock.update({
        where: { id: Number(id) },
        data: {
          quantidade: dadosAtualizados.quantidade,
          validade: dadosAtualizados.validade,
          status: dadosAtualizados.status,
          blood_type: dadosAtualizados.blood_type,
        },
      });
    } catch (error) {
      console.error("Error updating lote:", error);
      throw new Error("Erro ao atualizar lote");
    }
  }

  // Deletar lote
  async removerLote(id) {
    try {
      return await prisma.stock.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error("Error removing lote:", error);
      throw new Error("Erro ao remover lote");
    }
  }
}

module.exports = new EstoqueService();
