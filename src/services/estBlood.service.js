  // Importing prisma.
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  class EstoqueService {
// Criação dos dados
    async adicionarLote(loteData) {
      try {
        prisma.stock.create({
          data: {
            id: loteData.id,
            lote: loteData.lote,
            quantidade: loteData.quantidade,
            validade: loteData.validade,
            status: loteData.status,
          },
        });
        return "Lote criado com sucesso!";
      } catch (error) {
        console.error("Error creating lote:", error);
        throw new Error("Erro ao criar lote");
      }
    }

    // Consulta a losta de estoque diretamente do Banco
    async consultarEstoque() {
      try {
        return await prisma.stock.findMany();
      } catch (error) {
        console.error("Error fetching stock:", error);
        throw new Error("Erro ao consultar estoque");
      }
    }

    // Altera/Atualizar dados
    async atualizarQuantidade(id, quantidade) {
      try {
        return await prisma.stock.update({
          where: { id },
          data: { quantidade },
        });
      } catch (error) {
        console.error("Error updating quantity:", error);
        throw new Error("Erro ao atualizar quantidade");
      }
    }

    // Deletar algum erro ou validade de sangue
    async removerLote(id) {
      try {
        return await prisma.stock.delete({
          where: { id },
        });
      } catch (error) {
        console.error("Error removing lote:", error);
        throw new Error("Erro ao remover lote");
      }
    }
  }

  module.exports = new EstoqueService();
