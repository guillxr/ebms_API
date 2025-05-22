const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class StockValidityController {
  async createStockValidity(req, res) {
    try {
      const { batch, quantity, expirationDate, status } = req.body;

      if (batch === undefined || quantity === undefined || expirationDate === undefined) {
        return res.status(400).json({ error: 'All fields must be filled.' });
      }
      
      if (typeof quantity !== 'number' || isNaN(quantity)) {
        return res.status(400).json({ error: 'Quantity must be a valid number.' });
      }

      const parsedExpirationDate = new Date(expirationDate);
      if (isNaN(parsedExpirationDate.getTime())) {
          return res.status(400).json({ error: 'Expiration date must be a valid date.' });
      }

      const validity = await prisma.validity.create({
        data: {
          batch,
          quantity,
          expirationDate: parsedExpirationDate,
          status: status || 'available'
        }
      });
      
      res.status(201).json(validity);
    } catch (error) {
      console.error('Error creating stock validity:', error);
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
      console.error('Error fetching stock validities:', error);
      res.status(500).json({ error: 'Failed to fetch validities', details: error.message });
    }
  }

  async updateStockValidity(req, res) {
    try {
      const { id } = req.params;
      const { batch, quantity, expirationDate, status } = req.body;

      if (batch === undefined || quantity === undefined || expirationDate === undefined || status === undefined) {
        return res.status(400).json({ error: 'All fields must be filled for update.' });
      }

      if (typeof quantity !== 'number' || isNaN(quantity)) {
        return res.status(400).json({ error: 'Quantity must be a valid number.' });
      }

      const parsedExpirationDate = new Date(expirationDate);
      if (isNaN(parsedExpirationDate.getTime())) {
          return res.status(400).json({ error: 'Expiration date must be a valid date.' });
      }

      const existingValidity = await prisma.validity.findUnique({
        where: { id },
      });

      if (!existingValidity) {
        return res.status(404).json({ error: 'Stock validity entry not found.' });
      }
      
      const updatedValidity = await prisma.validity.update({
        where: { id },
        data: {
          batch,
          quantity,
          expirationDate: parsedExpirationDate,
          status
        }
      });
      
      res.status(200).json(updatedValidity);
    } catch (error) {
      console.error('Error updating stock validity:', error);
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Stock validity entry not found to update.', details: error.message });
      }
      res.status(500).json({ error: 'Failed to update validity', details: error.message });
    }
  }

  async deleteStockValidity(req, res) {
    try {
      const { id } = req.params;

      const existingValidity = await prisma.validity.findUnique({
        where: { id },
      });

      if (!existingValidity) {
        return res.status(404).json({ error: 'Stock validity entry not found.' });
      }
      
      await prisma.validity.delete({ where: { id } });
      
      res.json({ message: 'Stock validity entry deleted successfully' });
    } catch (error) {
      console.error('Error deleting stock validity:', error);
      if (error.code === 'P2025') {
         return res.status(404).json({ error: 'Stock validity entry not found to delete.', details: error.message });
      }
      res.status(500).json({ error: 'Failed to delete validity', details: error.message });
    }
  }
}

module.exports = new StockValidityController();
