const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StockValidityController {
  async createStockValidity(req, res) {
    try {
      const { batch, quantity, expirationDate, status } = req.body;
      
      const validity = await prisma.validity.create({
        data: {
          batch,
          quantity,
          expirationDate: new Date(expirationDate),
          status: status || 'available'
        }
      });
      
      res.status(201).json(validity);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create stock validity', details: error.message });
    }
  }

  async getStockValidity(req, res) {
    try {
      const { batch } = req.query;
      
      const validities = await prisma.validity.findMany({
        where: batch ? { batch: { contains: batch, mode: 'insensitive' } } : {}
      });
      
      res.json(validities);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch validities', details: error.message });
    }
  }

  async updateStockValidity(req, res) {
    try {
      const { id } = req.params;
      const { batch, quantity, expirationDate, status } = req.body;
      
      const updatedValidity = await prisma.validity.update({
        where: { id },
        data: {
          batch,
          quantity,
          expirationDate: new Date(expirationDate),
          status
        }
      });
      
      res.status(200).json(updatedValidity);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update validity', details: error.message });
    }
  }

  async deleteStockValidity(req, res) {
    try {
      const { id } = req.params;
      
      await prisma.validity.delete({ where: { id } });
      
      res.json({ message: 'Stock validity entry deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete validity', details: error.message });
    }
  }
}

module.exports = new StockValidityController();